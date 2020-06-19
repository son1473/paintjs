const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const DEFAULT_LINEWIDTH = 2.5;
const DEFAULT_COLOR = "#2C2C2C";
const CANVAS_SIZE = 700;
// pixel manipulate를 위해 캔버스의 width height 설정.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// context 설정
ctx.fillStyle= "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = DEFAULT_LINEWIDTH; /*선이 넓이(굵기).*/
ctx.strokeStyle = "DEFAULT_COLOR"; /*우리가 그릴 색 선*/
ctx.fillStyle = "DEFAULT_COLOR";

let painting = false;
let filling = false;

function stopPainting(){
	painting = false;
}

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;

	if(!painting){
		ctx.beginPath(); /*path 만들기*/
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y); /*계속 이어지게 하는 역할*/
		ctx.stroke();
	}
/**
 * onMouseMove를 통한 x y 값을 얻기 위해서는 client값과 offset값이 있다.
 * 캔버스에서 그리는 좌표는 offset 좌표이고
 * client 좌표는 전체 스크린에서 좌표를 나타낸다.
 */	
}

function onMouseDown(event){
	/*클릭시 그리기 시작*/
	painting = true; 
}

function handleColorClick(event){
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event){
	const size = event.target.valueAsNumber;
	ctx.lineWidth = size;
}

function handleModeClick(){
	if(filling === true){
		filling = false;
		mode.innerText = "Fill";
		/*그리기*/
	} else {
		filling = true;
		mode.innerText = "Paint";
		/*채우기*/
	}
}

function handleCanvasClick(){
	if(filling){
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function handleContextMenu(event){
	event.preventDefault();
}

function handleSaveClick(){
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS[🎨]";
	link.click();
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting); /*마우스가 캔버스를 벗어나기 시작하면 그리기 중지*/
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
	range.addEventListener("input", handleRangeChange);
}

if(mode){
	mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
	saveBtn.addEventListener("click", handleSaveClick);
}