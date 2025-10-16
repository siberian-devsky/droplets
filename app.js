const mainWindow = document.getElementById("mainWindow");
const droplets = document.querySelectorAll(".droplet");

const mainWindowCoords = mainWindow.getBoundingClientRect();
const dropletHeight = 45;

function createDroplet() {
   // just the divs
    const droplet = document.createElement("div");
    const tail = document.createElement("div");
    const head = document.createElement("div");

    const tailSegments = [];
    const randomTailLength = Math.floor(Math.random() * 10) + 3 // 3-12

    for (let i = 0; i <= randomTailLength; i++) {
        const tSegment = document.createElement("div");
        tSegment.className = "tSegment";
        tailSegments.push(tSegment);
    }

    // add classes
    droplet.className = "droplet";
    tail.className = "tail";
    head.className = "head";

    // assemble
    tailSegments.forEach( segment => tail.appendChild(segment));
    droplet.appendChild(tail);
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
        const transitionProps = getTransitionProps(tailSegments.length);

        // grab transit values
        const fallRate = transitionProps.fallRate;
        const timingFunc = transitionProps.timingFunc;

        // apply them
        droplet.style.transition = `transform ${fallRate}s ${timingFunc}`;
        
        // calculate wag terminationt time
        const duration = 150;
        const iterCount = Math.floor((fallRate * 1000) / duration);
        
        // apply them
        tail.style.animation = `wag ${duration}ms ease-in-out ${iterCount} alternate`;

        // finish line
        droplet.style.transform = `translateY(${mainWindowCoords.bottom + dropletHeight}px)`;
    })
    
    // kill droplet node after fall
    tail.addEventListener("animationend", () => droplet.remove())
}

function fallDown() {
    setInterval(() => {
        createDroplet();
    }, 300);
}

function getTransitionProps(tailLength) {
    const transition = {
        fallRate: ((Math.random() * 5) + 2).toFixed(2), // 1s–4s
        timingFunc: tailLength % 2 === 0 ? "ease" : "linear"
    }

    if (typeof transition.fallRate === Number
        && typeof timingFunc === "ease" || "linear"
    ) {
        return transition
    } else {
        return {
            fallRate: 3,
            timingFunc: "ease"
        }
    }
}

// document.addEventListener("DOMContentLoaded", fallDown);
mainWindow.addEventListener("click", fallDown);