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
//add to button "next picture" listener "click"
btnNext.addEventListener("click", () => {
    console.log("imege " + (i+1));
    //get current hour
    const now = new Date().getHours();
    //get times 0f day
    let timesOfDay = 
        now >= 0 && now <= 5 ? "night" : 
        now >= 6 && now <= 11 ? "morning" : 
        now >= 12 && now <= 17 ? "day" : 
        now >= 18 && now <= 23 ? "evening" : false;
    //loop pictures by circle
    if (i < images.length) {
        //set adress to image
        img.src = 
            "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks" +
            "/assets/images/" + `${timesOfDay}` + "/" + `${images[i]}`;
        i++;
        //disable button "next picture" for 1s
        btnNext.disabled = true;
        setTimeout(() => btnNext.disabled = false , 1000);
    } else i = 0;
});

//load picture
const btnLoad = document.querySelector(".btn-load--input");
const imageContainer = document.querySelector(".img-container");
//add to button "load picture" listener "change"
btnLoad.addEventListener('change', (e) => {
  //choose file
  const file = btnLoad.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
  }
  reader.readAsDataURL(file);
  e.target.value = "";
});

//button "save picture"
const btnSave = document.querySelector(".btn-save");
