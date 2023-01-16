const container = document.getElementsByClassName("container")[0];
const pixels = document.getElementById("pixels");
const selectPixels = document.getElementById("selectPixels");
const colorInput = document.getElementById("colorInput");

const eng_btn = document.getElementById("eng_btn");
const mm_btn = document.getElementById("mm_btn");

const downloadBtn = document.querySelector("#downloadBtn");

const pixelVals = document.querySelectorAll(".pixelVal");
const colorModeBtn = document.getElementById("colorModeBtn");
const rainBowModeBtn = document.getElementById("rainBowModeBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

const btns = document.querySelectorAll(".btn");




const DEFAULT_PIXEL = 16;
const DEFAULT_PIXEL_WIDTH = 400 / 16;
const DEFAULT_PIXEL_HEIGHT = 400 / 16;


let mode = "color";
let color = "#000000";
let mouseDown = false;



let languages = [{
        mode1: "Color Mode",
        mode2: "RainBow Mode",
        eraser: "Eraser",
        clear: "clear",
        tabName: "Yay Swal",
        download : "Download"
    },
    {
        mode1: "အရောင်ခြယ်(တစ်ရောင်)",
        mode2: "ရောင်စုံခြယ်(ကျပန်း)",
        eraser: "ခဲဖျက်",
        clear: "အသစ်ပြန်ဆွဲမယ်",
        tabName: "ရေးဆွဲ",
        download : "သိမ်းဆည်းမယ်"
    }
];


container.onmousedown = () => {
    mouseDown = true;
}

container.onmouseup = () => {
    mouseDown = false;
}

colorInput.onchange = () => {
    color = colorInput.value;
}


window.onload = () => {
    let totalPixels = DEFAULT_PIXEL * DEFAULT_PIXEL;
    createPixels(totalPixels, DEFAULT_PIXEL_WIDTH, DEFAULT_PIXEL_HEIGHT, DEFAULT_PIXEL);
}

mm_btn.onclick = () => {
    mm_btn.style.fontWeight = "bold";
    eng_btn.style.fontWeight = "normal";
    mm_btn.style.color = "black";
    document.body.style.fontSize = "12px";
    downloadBtn.style.fontSize = "12px";
    changeLanguage(languages[1]);
}

eng_btn.onclick = () => {
    mm_btn.style.fontWeight = "normal";
    eng_btn.style.fontWeight = "bold";
    document.body.style.fontSize = "15px";
    mm_btn.style.color = "black";
    downloadBtn.style.fontSize = "15px";
    changeLanguage(languages[0]);
}


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
    createPixels(DEFAULT_PIXEL_WIDTH * DEFAULT_PIXEL_HEIGHT, DEFAULT_PIXEL_WIDTH, DEFAULT_PIXEL_HEIGHT, DEFAULT_PIXEL);
}


pixels.onchange = () => {
    let pixel = parseInt(pixels.value);
    let totalPixels = pixel * pixel;
    let pixelWidth = 400 / pixel;
    let pixelHeight = 400 / pixel;
    container.innerHTML = "";
    createPixels(totalPixels, pixelWidth, pixelHeight, pixel);
};

function btnStyleChange(ele, ele_index) {
    ele.classList.add("selectedBox");
    for (let index = 0; index < btns.length; index++) {
        if (index !== ele_index) {
            btns[index].classList.remove("selectedBox");
        }
    }
}

function createPixels(totalPixels, pixelWidth, pixelHeight, pixel) {

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


function changeLanguage(language) {
    colorModeBtn.innerText = language.mode1;
    rainBowModeBtn.innerText = language.mode2;
    eraserBtn.innerText = language.eraser;
    clearBtn.innerText = language.clear;
    downloadBtn.innerText = language.download;
    document.title = language.tabName;
}


downloadBtn.onclick = () => {
    html2canvas(container).then(function (canvas) {
        dataUrl = canvas.toDataURL();

        // // Style your image here
        // savedImg.style.width = '400px';
        // savedImg.style.height = '400px';

        // After you are done styling it, append it to the BODY element
        let savedImgLink = document.createElement('a');
        savedImgLink.href = dataUrl;
        savedImgLink.download = "output.png";
        document.body.appendChild(savedImgLink);
        savedImgLink.click();
        document.body.removeChild(savedImgLink);
    });
}