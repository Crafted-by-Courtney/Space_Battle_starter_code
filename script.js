// Common Spacecraft object with shared properties
const Spacecraft = {
    hull: 0,
    firepower: 0,
    accuracy: 0,
    attack(target) {
    // Calculate if the attack hits based on accuracy
    if (Math.random() <= this.accuracy) {
      console.log("Attack successful!");
      target.hull -= this.firepower;
      console.log(`Target hull remaining: ${target.hull}`);
      if (target.hull <= 0) {
        console.log("Target ship destroyed!");
      }
    } else {
      console.log("Attack missed!");
    }
  }
    
  };
  
  // Create USSAssembly object based on the Spacecraft
  const USSAssembly = Object.create(Spacecraft);
  USSAssembly.hull = 20;
  USSAssembly.firepower = 5;
  USSAssembly.accuracy = 0.7;
  
  // Function to generate a random number between min and max (inclusive)
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Function to create an alien ship based on the Spacecraft with random properties
  function createAlienShip() {
    const alienShip = Object.create(Spacecraft);
    alienShip.hull = Math.floor(getRandomNumber(3, 7));
    alienShip.firepower = Math.floor(getRandomNumber(2, 5));
    alienShip.accuracy = getRandomNumber(0.6, 0.81).toFixed(2);
    return alienShip;
  }
  
  // Create an array to store the alien ships
  const alienShips = [];
  
  // Generate six alien ships with random properties
  for (let i = 1; i <= 6; i++) {
    alienShips.push(createAlienShip());
  }
  
  // Output USSAssembly and the array of alien ships
  console.log("USSAssembly:", USSAssembly);
  console.log("Alien Ships:", alienShips);

  // Example of attacking an alien ship and being attacked by an alien ship
const randomAlienShipIndex = Math.floor(Math.random() * alienShips.length);
const randomAlienShip = alienShips[randomAlienShipIndex];

console.log("USSAssembly attacks Alien Ship!");
USSAssembly.attack(randomAlienShip);

console.log("Alien Ship attacks USSAssembly!");
randomAlienShip.attack(USSAssembly);

    //Function to check if all alien ships are destroyed
function areAllAlienShipsDestroyed() {
  return alienShips.every((alienShip) => alienShip.hull <= 0);
}

// Example of USSAssembly attacking the alien ships one by one
for (const alienShip of alienShips) {
    if (alienShip.hull > 0) {
      console.log("USSAssembly attacks Alien Ship!");
      USSAssembly.attack(alienShip);
  
      if (alienShip.hull > 0) {
        console.log("Alien Ship attacks USSAssembly!");
        alienShip.attack(USSAssembly);
      }
  
      if (USSAssembly.hull <= 0) {
        console.log("USSAssembly destroyed! Game over.");
        break;
      }

      if (areAllAlienShipsDestroyed()) {
        console.log("All alien ships destroyed! You win!");
        break;
      }
    }
  }
  

// Function to ask the player if they want to attack the next ship or retreat
function askForAction() {
    const action = prompt("Do you want to [a]ttack the next ship or [r]etreat?").toLowerCase();
    return action === "a";
  }
  
  // Example of USSAssembly attacking the alien ships with the option to retreat
  let currentAlienShipIndex = 0;
  
  while (currentAlienShipIndex < alienShips.length) {
    const currentAlienShip = alienShips[currentAlienShipIndex];
  
    if (currentAlienShip.hull > 0) {
      console.log("USSAssembly attacks Alien Ship!");
      USSAssembly.attack(currentAlienShip);
  
      if (currentAlienShip.hull <= 0) {
        console.log("Alien Ship destroyed!");
  
        if (areAllAlienShipsDestroyed()) {
          console.log("All alien ships destroyed! You win!");
          break;
        }
  
        const continueAttacking = askForAction();
        if (!continueAttacking) {
          console.log("You retreated! Game over.");
          break;
        }
      }
  
      if (USSAssembly.hull <= 0) {
        console.log("USSAssembly destroyed! Game over.");
        break;
      }
  
      if (currentAlienShip.hull > 0) {
        console.log("Alien Ship attacks USSAssembly!");
        currentAlienShip.attack(USSAssembly);
      }
  
      if (USSAssembly.hull <= 0) {
        console.log("USSAssembly destroyed! Game over.");
        break;
      }
    }
  
    currentAlienShipIndex++;
  }
  