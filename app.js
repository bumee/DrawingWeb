const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";

// ctx.fillRect(50,50,100,200); // rect함수와 fill 함수를 동시에 해준 것! -> shortcut function이라고 한다.

// ctx.rect(500,500,100,100);
// ctx.stroke();

// // ctx.fill() 하면 stroke만 했던 모든 사각형을 칠해줌! 후에 다시 rect 해봤자, 그건 화면에 안 나타날 거임!

// ctx.fillStyle = "red";
// // -> ctx.fill() 하면, 모든 사각형들이 red가 된다! 동일한 context이기 때문이다. 

// setTimeout(() => {
//     ctx.fill();
// }, 5000); // 5초 뒤에 빨간색으로 변하게 되는 것. 이게 setTimeout의 효과!

// // 경로가 ctx로 겹치는 상황은 어떻게 해결할 수 있을까? 
// // -> 바로 ctx.beginPath() 를 사용하면 된다! 그렇게 되면 이전 경로와 다른 새로운 경로를 알아서 설정해준다!





// // ** --------- 이제 short cut function을 쓰지 않고 직사각형을 만들어보자 ! ------------ **

// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke();
// // ctx.rect는 요 과정을 축약해놓은 함수이다!



// // ------------- 집을 그려봅시다! ----------- //
// ctx.fillRect(200,200,50,200);
// ctx.fillRect(400,200,50,200);
// ctx.lineWidth = 2;
// ctx.strokeRect(300,300,50,100);
// ctx.fillRect(200,200,200,20);
// ctx.moveTo(200,200);
// ctx.lineTo(325,100);
// ctx.lineTo(450,200);
// ctx.fill();
// // 기가 막히게 그렸다 그죠!?


// // ------- 사람을 그려봅시다! --------- //
// ctx.fillRect(210 - 40,200 - 20,15,100);
// ctx.fillRect(350 - 40,200 - 20,15,100);
// ctx.fillRect(260 - 40,200 - 20,60,200);

// ctx.arc(250,100,50,0,2*Math.PI);
// ctx.fill()

// // 무언가의 색을 바꾸기 위해서는!! beginPath 해야하는지 아닌지 반드시 생각해주자 !
// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10,80,8,Math.PI,2*Math.PI);
// ctx.arc(220 + 10,80,8,Math.PI,2*Math.PI);
// ctx.fill()
// // 귀여운 사람 등장 ! 

// // --------- onClick 구현 ------------ //

// ctx.lineWidth = 2;

// const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a"
// ]

// function onClick (event){
//     ctx.moveTo(0,0);
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     // 랜덤하게 뽑아서 색을 선택한다!
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     // 선을 만든 후 반드시 stroke를 해야 한다!
//     ctx.stroke();
//     ctx.beginPath();
// }

// // canvas.addEventListener("click", onClick)
// // -> click 대신 mousemove로 움직이면서 그림을 그릴 수도 있다!

// canvas.addEventListener("mousemove",onClick);
// // 기가 막히게 구현 완료 !


// --------- 마우스 떼기 전까지만 그려주는 거 구현 해보기 ! ------- 
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
// HTMLCollection 타입을 배열로 변환시켜주는 것이다!
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
ctx.lineWidth = lineWidth.value;
ctx.strokeStyle = color.value;

ctx.moveTo(200,200);

let isPainting = false;
let isFilling = false;
function onMove(event){
    if (isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMousedown(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ChnageStrokeAndFillColor(event.target.value);
}

function ChnageStrokeAndFillColor(ttyp){
    ctx.strokeStyle = ttyp;
    ctx.fillStyle = ttyp;
}

function onModeClick(){
    if (isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onColorClick(event){
    console.dir(event.target.dataset.color);
    // console 창에 "객체" 형태로 데이터셋을 리턴해준다!
    // -> 그 곳에서 dataset이라는 키 값은 value로, 우리가 html에서 언급한 data-color의 color를 가지게 된다!
    // -> 우리가 html에서 data-potato로 저장했다면, dataset에는 Potato라는 이름의 
    ChnageStrokeAndFillColor(event.target.dataset.color);
    // 선택한 색으로 선을 그리거나 fill을 할 수 있도록 도와주는 것이다!
}

function onCanvasClick(){
    if (isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    console.dir(event.target);
    // 여기서 마찬가지로 객체니까, 키 값이 files 인 것을 찾아보면 어떤 jpg인지 알 수는 있으나, 어디까지나 자바스크립트 세계에 머물고 있는 것 뿐이다.
    // 우리 목표는, 이 사진을 URL을 이용해서 볼 수 있게 하는 것이다.
    // 다시 말해, 이미지는 브라우저의 메모리에 있고, 난 그 브라우저가 그 메모리 부분의 URL을 주었으면 하는 것.
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    // 자, 여기서 콘솔에 등장하게 되는 url은 실제 세계에 존재하지 않는 url이다. 단지 브라우저를 위한 url일 뿐임을 알아야 한다!
    // 오로지 크롬에게 접근 권한이 있는 상태이기 때문에, 다른 브라우저에서는 해당 url 접속이 되지 않는다.
    const image = new Image()
    image.src = url;
    // 이것은 html에서, <img src = "" />와 동일한 기능을 수행한다.
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
    // 이것은 canvas에 addEventListener를 추가한 방식과 동일하게, 사용되는 문법의 일종일 뿐이다.
    // 즉, image.addEventListener("onload", ~~) 와 동일하다는 뜻.
}

function onDoubleClick(event){
    ctx.save();
    // save 함수는 현재 ctx의 상태, 색상, 스타일 등 모든 것을 저장한다.
    const text = textInput.value;
    if (text !== null){
        ctx.lineWidth = 1;
        ctx.font = "48px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
    // 다시 저장되었던 것을 불러오는 작업!
    // -> save와 restore 사이에 무슨 짓을 하더라도, 그 것들은 저장이 되지 않는다.
}

function onSaveClick(){
    const url = canvas.toDataURL();
    // toDataURL 이라는 멋진 내장 메소드가 있다! 
    const a = document.createElement("a");
    // html에서 <a href = "" download ~ > 태그를 써서 다운로드 작동시키는 것처럼, 그것을 고대로~ 사용하는 것이다.
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
    // 말 그대로 a 태그를 클릭하는 것이 된다!
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown", onMousedown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
// 캔버스 바깥으로 마우스가 나갔을때! 도 체크를 해주어야 한다.

// 요번엔 굵기를 조절하는 버튼의 값이 바뀌었다는 것을 실시간으로 체크해줄 수 있는 경우를 구현할 것이다.
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);