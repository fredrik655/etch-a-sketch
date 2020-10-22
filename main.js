



const gridContainer = document.querySelector('.grid-container');
const root = document.documentElement;
const btn = document.querySelector('.grid-btn');
const rainbowBtn = document.querySelector('.rainbow-btn');

let rainbowOn = false;
let currentGridSize = 1;


// Generates grid boxes from input size and adds mouseover eventlistener 
function createGrids(size)
{
    for(let i = 0; i < size*size; i++){
        currentGridSize = size;
        const div = document.createElement('div');
        div.classList.add('grid-box');
        div.style.backgroundColor = 'white';
        
        // increments opacity and changes color
        div.addEventListener('mouseover', (e) => {
            if(e.target.style.backgroundColor === 'white')
            {
                // checks if rainbow color is enabled
                if(rainbowOn)
                {
                    div.style.backgroundColor = generateRandomColorHex();
                }
                else {
                    div.style.backgroundColor = 'rgb(0, 255, 0)';
                }
            }
            else {
                let rgba = e.target.style.backgroundColor;
                rgba = rgba.split(',');
                rgba = `rgb(${parseFloat(rgba[0].slice(4))- 28.5},${parseFloat(rgba[1].slice(1)) - 28.5},${parseFloat(rgba[2].slice(1,-1)) - 28.5}`;
                e.target.style.backgroundColor = rgba;
            }
        });

        gridContainer.appendChild(div);
    }
    root.style.setProperty('--grid-size', size);
}

function removeAllExistingDivs(){
    while(gridContainer.lastChild){
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

// rgba(0, 0, 0, 0.143)
function generateRandomColorHex(){
    let hexColor = 'rgba(';
    hexColor += random(255) + ',' + random(255) + ',' + random(255) + ', 1)';
    return hexColor;
}

function random(a){
    return (Math.floor(Math.random()*(a+1)));
}

btn.addEventListener('click', () => {
    let entered = false;
    while(!entered){
        let gridSize = prompt('Enter new grid size ""Max 100""');
        if(gridSize <= 100 && gridSize > 0){
            removeAllExistingDivs();
            createGrids(gridSize);
            entered = true;
        }
    }
});

rainbowBtn.addEventListener('click', (e) => {
    rainbowOn = (rainbowOn) ? false : true;
    if(e.target.style.backgroundColor === 'rgb(42, 157, 143)')
    {   
        e.target.style.backgroundColor = '#f4a261';
    }
    else {
        e.target.style.backgroundColor = '#2a9d8f';
    }
    removeAllExistingDivs();
    createGrids(currentGridSize);
});


createGrids(16);





