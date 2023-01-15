const container = document.getElementsByClassName("container")[0];
const pixels = document.getElementById("pixels");
const selectPixels = document.getElementById("selectPixels");
const colorInput = document.getElementById("colorInput");



let pixelVals = document.querySelectorAll(".pixelVal");
let colorModeBtn = document.getElementById("colorModeBtn");
let rainBowModeBtn = document.getElementById("rainBowModeBtn");
let eraserBtn = document.getElementById("eraserBtn");
let clearBtn = document.getElementById("clearBtn");

let btns = document.querySelectorAll(".btn");



let default_pixel = 16;
let default_pixel_width = 400 / 16;
let default_pixel_height = 400 / 16;
let mode = "color";
let color = "#000000";

let mouseDown = false;


container.onmousedown = () => {
    mouseDown = true;
}

container.onmouseup = () => {
    mouseDown = false;
}


window.onload = () => {
    let totalPixels = default_pixel * default_pixel;


    createPixels(totalPixels, default_pixel_width, default_pixel_height,default_pixel);
}


pixels.onchange = () => {
    let pixel = parseInt(pixels.value);
    let totalPixels = pixel * pixel;
    let pixelWidth = 400 / pixel;
    let pixelHeight = 400 / pixel;

    container.style.gridTemplateColumns = `repeat(${pixels.value} ,1fr)`;
    container.style.gridTemplateRows = `repeat(${pixels.value} ,1fr)`;
    container.innerHTML = "";
    createPixels(totalPixels, pixelWidth, pixelHeight,pixel);
};





colorModeBtn.onclick = () => {
    mode = "color";
    btnStyleChange(colorModeBtn, 0);
}


rainBowModeBtn.onclick = () => {
    mode = "rainbow";
    btnStyleChange(rainBowModeBtn, 1);
}

eraserBtn.onclick = () => {
    mode = "eraser";
    btnStyleChange(eraserBtn, 2);
}

clearBtn.onclick = () => {
    container.innerHTML = "";
    pixels.value = 16;
    createPixels(default_pixel_width * default_pixel_height, default_pixel_width, default_pixel_height,default_pixel);
}



function btnStyleChange(ele, ele_index) {
    ele.classList.add("selectedBox");
    for (let index = 0; index < btns.length; index++) {
        if (index !== ele_index) {
            btns[index].classList.remove("selectedBox");
        }
    }
}


colorInput.onchange = () => {
    color = colorInput.value;
    console.log(color);
}



function createPixels(totalPixels, pixelWidth, pixelHeight,pixel) {

    pixelVals[0].innerText = pixel;
    pixelVals[1].innerText = pixel;

    container.style.gridTemplateColumns = `repeat(${pixel} ,1fr)`;
    container.style.gridTemplateRows = `repeat(${pixel} ,1fr)`;



    for (let index = 1; index <= totalPixels; index++) {

        let pixelBox = document.createElement("div");
        pixelBox.style.width = pixelWidth;
        pixelBox.style.width = pixelHeight;

        pixelBox.addEventListener('mouseover', () => {
            if (mouseDown) {
                let color = setMode(mode);
                pixelBox.setAttribute('style', `background-color: ${color};`);
            }
        });

        pixelBox.addEventListener('mousedown', () => {
            if (!mouseDown) {
                let color = setMode(mode);
                pixelBox.setAttribute('style', `background-color: ${color};`);
            }
        });

        container.appendChild(pixelBox);
    }
}




function setMode(mode) {
    let bgColor;
    if (mode === "color") {
        bgColor = color;
    } else if (mode === "rainbow") {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        bgColor = `rgb(${red},${green},${blue})`;
    } else if (mode === "eraser") {
        bgColor = "rgb(233, 232, 232)";
    }
    return bgColor;
}