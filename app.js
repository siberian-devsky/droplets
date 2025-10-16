const mainWindow = document.getElementById("mainWindow");
const droplets = document.querySelectorAll(".droplet");

const mainWindowCoords = mainWindow.getBoundingClientRect();
const dropletHeight = 45;

function createDrop() {
   // just the divs
    const droplet = document.createElement("div");
    const head = document.createElement("div");

    const tails = [];
    const randomTailLength = Math.floor(Math.random() * 10) + 3 // 3-12

    for (let i = 0; i <= randomTailLength; i++) {
        const tail = document.createElement("div");
        tail.className = "tail";
        tails.push(tail);
    }

    // add classes
    droplet.className = "droplet";
    head.className = "head";

    // assemble
    tails.forEach( tail => droplet.appendChild(tail));
    droplet.appendChild(head);
    
    // random position inside the mainWindow
    const width = mainWindow.clientWidth - 10;
    const xPos = Math.floor(Math.random() * width)
    
    // starting line
    droplet.style.left = `${xPos}px`;
    droplet.style.transform = "translateY(-125px)";
    droplet.style.position = "absolute";
    
    // attach to DOM
    mainWindow.appendChild(droplet)

    requestAnimationFrame( () => {
        droplet.style.transition = `transform ${getRandomFallRate()}s linear`;

        // finish line
        droplet.style.transform = `translateY(${mainWindowCoords.bottom + dropletHeight}px)`;
    })
    
    // kill it when out of frame
    droplet.addEventListener("transitionend", () => droplet.remove)
}

function fallDown() {
    setInterval(() => {
        createDrop();
    }, 100);
}

function getRandomFallRate() {
      return (Math.random() * 5 + 2).toFixed(2); // 1s–4s
}

document.addEventListener("DOMContentLoaded", fallDown);