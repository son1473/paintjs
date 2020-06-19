const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');

const DEFAULT_LINEWIDTH = 2.5;
const DEFAULT_COLOR = "#2C2C2C";

// pixel manipulate를 위해 캔버스의 width height 설정.
canvas.width = 700;
canvas.height = 700;

// context 설정
ctx.lineWidth = DEFAULT_LINEWIDTH; /*선이 넓이(굵기).*/
ctx.strokeStyle = "DEFAULT_COLOR"; /*우리가 그릴 색 선*/

let painting = false;

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
}

function handleRangeChange(event){
	const size = event.target.valueAsNumber;
	ctx.lineWidth = size;
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting); /*마우스가 캔버스를 벗어나기 시작하면 그리기 중지*/
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
	range.addEventListener("input", handleRangeChange);
}