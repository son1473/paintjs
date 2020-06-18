const canvas = document.getElementById("jsCanvas");

let painting = false;

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;
}
// onMouseMove를 통한 x y 값을 얻기 위해서는 client값과 offset값이 있다.
// 캔버스에서 그리는 좌표는 offset 좌표이고
// client 좌표는 전체 스크린에서 좌표를 나타낸다.

function onMouseDown(event){
	painting = true; 
	/*클릭시 그리기 시작*/
}

function onMouseUp(event){
	painting = false;
	// 마우스 클릭을 때면 그리기 중지
}

function onMouseLeave(event){
	painting = false;
	// 마우스가 캔버스를 벗어나기 시작하면 그리기 중지
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", onMouseDown);
	canvas.addEventListener("mouseup", onMouseUp);
	cnavas.addEventListener("mouseleave", onMouseLeave);
}