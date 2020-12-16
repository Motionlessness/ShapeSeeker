const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let button = document.getElementById("beginSeeker");
button.onclick = runGame;

let mouse = {
    x: null,
    y: null
};
 window.addEventListener('mousemove', (e)=> {
    mouse.x = e.x;
    mouse.y = e.y;
 });


function deleteShapes(){
    var removeNodes = document.querySelector('.items').childNodes;
    for(let i = removeNodes.length-1; i >= 0; i--){
        let removeDiv = removeNodes[i];
        removeDiv.parentNode.removeChild(removeDiv); 
    }
}

function createShapes(){
    let shapesDiv = document.querySelector('.items');

    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    
    let color = `rgba(${r} ,${g} ,${b} ,1)`;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvas.style.backgroundColor = color;
    let shape1 = document.createElement("div");
    let shape2 = document.createElement("div");
    let shape3 = document.createElement("div");
    shape1.id = 'fake';
    shape2.id = 'key';
    shape3.id = 'lock';
    shape3.className = 'dropzone';

    shape1.style.position = 'absolute';
    shape1.style.top = `${Math.random()*90}%`;
    shape1.style.left=  `${Math.random()*90}%`;
    shape1.style.width=  `${Math.random()*50}%`;
    shape1.style.height=  `${Math.random()*60}%`;
    shape1.style.backgroundColor = color;
    shape1.style.touchAction = 'none';

    let keyDimensions = {
        width: `${Math.random()*50}%`,
        height:  `${Math.random()*50}%`
    }
    shape2.style.position = 'absolute';
    shape2.style.top = `${Math.random()*90}%`;
    shape2.style.left = `${Math.random()*90}%`;
    shape2.style.width = keyDimensions.width;
    shape2.style.height = keyDimensions.height;
    shape2.style.backgroundColor = color;
    shape2.style.touchAction = 'none';

    shape3.style.position = 'absolute';
    shape3.style.top = `${Math.random()*90}%`;
    shape3.style.left = `${Math.random()*90}%`;
    shape3.style.width = keyDimensions.width;
    shape3.style.height = keyDimensions.height;
    shape3.style.backgroundColor = color;
    shape3.style.touchAction = 'none';   

    shapesDiv.appendChild(shape1);
    shapesDiv.appendChild(shape3);
    shapesDiv.appendChild(shape2);
}

canvas.addEventListener('mousemove', (e) => {
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 5, false);
    ctx.fillStyle = 'rgba(250,250,250,1)';
    ctx.fill();
});

const keyPosition = {
    x: 0,
    y: 0
};
const lockPosition = {
    x: 0,
    y: 0
};
const fakePosition = {
    x: 0,
    y: 0
};
interact('#lock').dropzone({
    accept: '#key',
    overlap: 0.9,
    ondropactivate: (e) => {
        e.target.classList.add('drop-active')
    },
    ondragenter: (e) => {
    var draggableElement = e.relatedTarget
    var dropzoneElement = e.target

    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    },
    ondragleave: (e) => {
        e.target.classList.remove('drop-target')
        e.relatedTarget.classList.remove('can-drop')
    },
    ondrop: (e)=>{
        deleteShapes();
        createShapes();
    },
    ondropdeactivate: (e) => {
        e.target.classList.remove('drop-active')
        e.target.classList.remove('drop-target')
    }
});

interact('#fake').draggable({
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: canvas,
            endOnly: true
        })
    ],
    autoSroll: true,
    listeners: {
        start (event) {
            console.log(event.type, event.target)
        },
        move (event) {
            fakePosition.x += event.dx
            fakePosition.y += event.dy
            
            event.target.style.transform = `translate(${fakePosition.x}px, ${fakePosition.y}px)`
        },
    }
});

interact('#key').draggable({
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: canvas,
            endOnly: true
        })
    ],
    autoSroll: true,
    listeners: {
        start (event) {
            console.log(event.type, event.target)
        },
        move (event) {
            keyPosition.x += event.dx
            keyPosition.y += event.dy
            
            event.target.style.transform = `translate(${keyPosition.x}px, ${keyPosition.y}px)`
        },
    }
});

interact('#lock').draggable({
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: canvas,
            endOnly: true
        })
    ],
    autoSroll: true,
    listeners: {
        start (event) {
            event.target.style.border = 'thick solid rgba(50,50,50,.25)'
        },
        move (event) {
            lockPosition.x += event.dx
            lockPosition.y += event.dy
            
            event.target.style.transform = `translate(${lockPosition.x}px, ${lockPosition.y}px)`
        },
        end (event) {
            event.target.style.border = 'none';
        },
    }
});

function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

function runGame() {
    canvas.style.display = 'block';
    createShapes();
}