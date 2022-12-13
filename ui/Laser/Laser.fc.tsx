import React from "react";
// ...
// canvas draw function
// ...
const Laser = () => {
	const canvasRef: any = React.useRef(null);
	const retinaResize = (
		canvas: HTMLCanvasElement,
		ctx: any,
		canvasWidth: number,
		canvasHeight: number
	) => {
		if (window.devicePixelRatio > 1) {
			canvas.width = canvasWidth * window.devicePixelRatio;
			canvas.height = canvasHeight * window.devicePixelRatio;
			canvas.setAttribute(
				"style",
				`width:${canvasWidth}px;height:${canvasHeight}px`
			);
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		}
	};
	const getDevicePixels = (size: number) => {
		if (window.devicePixelRatio > 1) {
			return size * window.devicePixelRatio;
		} else {
			return size;
		}
	};
	React.useEffect(() => {
		let isIncreasing = true;
		const canvas = canvasRef.current;
		if (canvas) {
			let ctx = canvas.getContext("2d");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			retinaResize(canvas, ctx, canvas.width, canvas.height);
			let counter = 0;
			setInterval(function() {
				let n = Math.floor(Math.random() * 10);
				if (n % 2 === 0) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
				}
				ctx.beginPath();
				ctx.moveTo(counter * n, 0);
				ctx.lineTo(
					getDevicePixels(canvas.width),
					getDevicePixels(canvas.height)
				); // dont touch
				ctx.lineWidth = 1;
				ctx.closePath();
				ctx.strokeStyle = "#ff39a1";
				ctx.shadowColor = "#ff39a1";
				// set initial blur of 3px
				ctx.shadowBlur = 8;
				ctx.stroke();
				if (counter === 100) {
					isIncreasing = false;
				} else if (counter === 0) {
					isIncreasing = true;
				}
				counter = isIncreasing ? counter + 1 : counter - 1;
			}, 200);
		}
	});
	return (
		<canvas
			ref={canvasRef}
			width={window.innerWidth}
			height={window.innerHeight}
		/>
	);
};
export default Laser;
