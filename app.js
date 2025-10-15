const mainWindow = document.getElementById("mainWindow");
const droplets = document.querySelectorAll(".droplet");

const mainWindowCoords = mainWindow.getBoundingClientRect();
const dropletHeight = 45;

function createDrop() {
   // just the divs
    const droplet = document.createElement("div");
    const head = document.createElement("div");

    const tails = [];
    const randomTailLength = Math.floor(Math.random() * 10) //max 10

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

    //random position inside the mainWindow
    const width = mainWindow.clientWidth - 10;
    const xPos = Math.floor(Math.random() * width)

    droplet.style.left = `${xPos}px`;
    droplet.style.transform = "translateY(-25px)";
    droplet.style.position = "absolute";

    // ship it
    mainWindow.appendChild(droplet)
    requestAnimationFrame( () => {
        mainWindow.clientHeight + 40
        droplet.style.transition = `transform ${getRandomFallRate()}s linear`;
        droplet.style.transform = `translateY(${mainWindowCoords.bottom + dropletHeight}px)`;
    })
    
    // kill it when out of frame
    setTimeout(
        droplet.addEventListener("transitionend", () => {
            droplet.remove()
    }), 5000)
}

function fallDown() {
    console.log("falling");
    setInterval(() => {
        createDrop();
    }, 1000);
}

function getRandomFallRate() {
      return (Math.random() * 3 + 1).toFixed(2); // 1s–4s
}

mainWindow.addEventListener("click", fallDown);