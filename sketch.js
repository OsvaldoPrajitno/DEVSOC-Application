let sprite, floor, sisyphus;
let slope1, slope2;
let canvas;
let bar = 0;

function preload() {
	const startPosY = windowHeight * 0.7;
	const startPosX = windowWidth / 2;

	sprite = new Sprite(startPosX + 49, startPosY);
	sprite.img = '/assets/Boulder.png'
	sprite.d = 98;
	sprite.bounciness = 0.2;
	sprite.rotationDrag = 1;
	sprite.mass = 4;
	sprite.debug = false;

	//ani = loadAni('/Sisyphus.png', {frameSize: [32, 32], frame: 8});

	sisyphus = new Sprite(startPosX-25, startPosY + 3, 64, 64, 'd');
	
	sisyphus.spriteSheet = '/assets/SisyphusNew.png'
	sisyphus.anis.frameDelay = 4;
	sisyphus.friction = 0.5;
	sisyphus.debug = false;
	
	sisyphus.addAnis({
		walk: {row: 0, frames: 8},
	})

	floor = new Sprite(windowWidth/2, windowHeight*0.85, windowWidth*0.3, windowHeight * 0.3);
	floor.collider = 'static';
	floor.color = 'black';
	floor.debug = true;
	
	slope1 = new Sprite(floor.x + (floor.w * 2.4) - (windowHeight *0.1), 
	(floor.y) + (floor.h * 0.38) + (windowHeight *0.005), windowWidth, windowHeight, 's');
	if (windowWidth < 700) slope1.w = 700;
	if (windowWidth > 4000) slope1.w = 4000;
	slope1.color = 'black';
	slope1.rotation = 60;
	slope1.debug = true;

	slope2 = new Sprite(floor.x - (floor.w * 1.11), 
	floor.y, (windowHeight * 0.2), (windowWidth * 0.45), 's');
	if (windowWidth < 700) slope2.w = 700;
	if (windowHeight > 2500) {
		slope2.w = 2500;
		slope2.h = 2500;
	}
	slope2.color = 'black';
	slope2.rotation = 60;
	slope2.debug = true;

}

function setup() {
	canvas = new Canvas(windowWidth, windowHeight);
	world.gravity.y = 10;

	console.log(windowWidth, windowHeight)
}

function draw() {
	background('#b66d27');
	text((windowHeight- 153 - round(sisyphus.y)), 50, 50);

	while (bar > -0.01) {
		bar -= 0.0001
	}


	if (kb.presses('space')) {
		bar+= 100;
	}
	
	if (sisyphus.rotation < -35) {
		console.log(sisyphus.rotation)
		sisyphus.rotate(45, 4)
	} else if (sisyphus.rotation > 20) {
		console.log(sisyphus.rotation)
		sisyphus.rotate(-50, 4)
	}

	if (bar > 0) {
		sisyphus.friction = 0.5;
		sisyphus.bearing = -10;
		sisyphus.vel.y = 0.3;
		sisyphus.applyForce(500);
	}

	if (round(sisyphus.x) <= round(sisyphus.previousPosition.x)) {
		sisyphus.ani.stop();
	} else {
		sisyphus.ani.play();
	}

	//camera.x = sisyphus.x;
	//camera.y = sisyphus.y - 100;

	

}
