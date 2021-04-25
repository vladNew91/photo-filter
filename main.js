//set to active button class "btn-active"
const btns = document.querySelectorAll(".btn");

btns.forEach(el => {
    //set to all buttons listener "click"
    el.addEventListener("click", () => {
        //delete to all buttons class "btn-active"
        btns.forEach(btn => btn.classList.remove("btn-active"));
        //set to clicked button class "btn-active"
        el.classList.add("btn-active");
    });

});

//fullscreen
const btnFullscreen = document.querySelector('.fullscreen');

btnFullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
});

//change value of outputs
const img = document.querySelector('.image');
const inputs = document.querySelectorAll('input[type=range]');
const outputs = document.querySelectorAll('output[name=result]');

inputs.forEach((input,i) => {
    input.oninput = () => {
        //set value of input to output
        outputs[i].textContent = input.value;
    };
});

//use filters to image
inputs.forEach((input,i) => {
    //set to all inputs listener "click"
    input.addEventListener("input", () => {
        //get data-sizing of input
        const suffix = input.dataset.sizing;
        //set to image new filter when we change some value of inputs
        img.style.setProperty(`--${input.name}`, outputs[i].value + suffix);
    });
});

//button reset
const btnReset = document.querySelector(".btn-reset");
//add to "button reset" listener "click"
btnReset.addEventListener("click", () => {
    outputs.forEach((output,i) => {
        //set to all outputs and inputs dafault value
        inputs[i].value = inputs[i].defaultValue;
        output.value = inputs[i].value;
    });
    //reset image to default styles
    img.style = "";
});

//button "next picture"
const btnNext = document.querySelector(".btn-next");
const images = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg',
    '08.jpg',
    '09.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg'
];
let i = 0;
let path = "https://raw.githubusercontent.com/rolling-scopes-school/" + 
    "stage1-tasks/assets/images/";
//get current hour
const now = new Date().getHours();
//set times 0f day
let timesOfDay = 
    now >= 0 && now <= 5 ? "night" : 
    now >= 6 && now <= 11 ? "morning" : 
    now >= 12 && now <= 17 ? "day" : 
    now >= 18 && now <= 23 ? "evening" : false;

const imgAdress = () => {
    //set adress to image
    img.src = path + `${timesOfDay}` + "/" + `${images[i]}`;
    i++;
    //disable button "next picture" for 1s
    btnNext.disabled = true;
    setTimeout(() => btnNext.disabled = false , 1000);
};
//add to button "next picture" listener "click"
btnNext.addEventListener("click", () => {
    //loop pictures by circle
    if (i < images.length) imgAdress();
    else {
        i = 0;
        imgAdress();
    };
});

//load picture
const btnLoad = document.querySelector(".btn-load--input");
//add to button "load picture" listener "change"
btnLoad.addEventListener('change', (e) => {
  //choose one file
  const file = btnLoad.files[0];
  const reader = new FileReader();
  //load file
  reader.onload = () => {
    img.src = reader.result;
  }
  reader.readAsDataURL(file);
  e.target.value = "";
});

//button "save picture"
const btnSave = document.querySelector(".btn-save");
const canvas = document.querySelector('canvas');

btnSave.addEventListener("click", function(e) {
    //get value of current filters on image
    const blur = document.querySelector("input[name=blur]").value;
    const invert = document.querySelector("input[name=invert]").value;
    const sepia = document.querySelector("input[name=sepia]").value;
    const saturate = document.querySelector("input[name=saturate]").value;
    const hue = document.querySelector("input[name=hue]").value;
    //create new canvas image constructor
    const imageCanvas = new Image();
    //give new canvas image attributes
    imageCanvas.setAttribute('crossOrigin', 'anonymous');
    //give new canvas image address
    imageCanvas.src = img.src;
    imageCanvas.onload = function() {
        //the inner canvas size is equal to the image size
        canvas.width = imageCanvas.width;
        canvas.height = imageCanvas.height;
        //drawing context
        const ctx = canvas.getContext("2d");
        //index to blur filter
        let index = img.naturalHeight/img.height;
        //use filtres to canvas image
        ctx.filter = "blur(" + (blur * index) + "px)";
        ctx.filter += "invert(" + invert + "%)";
        ctx.filter += "sepia(" + sepia + "%)";
        ctx.filter += "saturate(" + saturate + "%)";
        ctx.filter += "hue-rotate(" + hue + "deg)";
        //displayed canvas image
        ctx.drawImage(imageCanvas, 0, 0);
        //create link
        let a = document.createElement("a");
        //name of download canvas image
        a.download = "image.png";
        //create a temporary link href on which we will place 
        //the canvas's data url, then click and delete
        a.href = canvas.toDataURL();
        a.click();
        a.delete;
    };
});
