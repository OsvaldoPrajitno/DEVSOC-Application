let boulder, floor, sisyphus;
let slope1, slope2;
let canvas;
let bar = 0;

function preload() {
	const startPosY = windowHeight * 0.64;
	const startPosX = windowWidth / 2;

	boulder = new Sprite(startPosX + 49, startPosY);
	boulder.img = '/assets/Boulder.png'
	boulder.d = 98;
	boulder.bounciness = 0.2;
	boulder.rotationDrag = 0.5;
	boulder.mass = 8;
	boulder.debug = false;

	//ani = loadAni('/Sisyphus.png', {frameSize: [32, 32], frame: 8});

	sisyphus = new Sprite(startPosX-35, startPosY, 64, 64, 'd');
	
	sisyphus.spriteSheet = '/assets/SisyphusNew.png'
	sisyphus.anis.frameDelay = 12;
	sisyphus.friction = 0.2;
	sisyphus.debug = false;
	
	sisyphus.addAnis({
		walk: {row: 0, frames: 8},
	})

	floor = new Sprite(windowWidth/2, windowHeight*0.85, windowWidth*0.345, windowHeight/3);
	floor.collider = 'static';
	floor.color = 'black';
	floor.debug = false;

	const wid = round(floor.h * (Math.sqrt(3) * 2));
	const offset = round(floor.w/2);
	
	floor.addCollider(-floor.w * 0.9, 0, [[0, floor.h/2], [-offset - wid, 0], 
	[wid, -floor.h], [offset, 0], [0, floor.h/2]]);

	floor.addCollider(floor.w, floor.h * 0.3, [[0, -floor.h/2], [wid, -floor.h], 
	[0, floor.h*3], [-wid, 0], [0, -floor.h*3/2]])
	
}

function setup() {
	canvas = new Canvas(windowWidth, windowHeight);
	world.gravity.y = 15;

	frameRate(60);
}

function draw() {
	background('#b66d27');

	text(sisyphus.x, 50, 50);
	
	while (bar > 0) {
		bar = bar - 1;
	}

	console.log(frameCount);

	if (kb.presses('space')) {
		bar+= 100;
	}
	
	if (sisyphus.rotation < -35) {
		sisyphus.rotate(45, 4)
	} else if (sisyphus.rotation > 20) {
		sisyphus.rotate(-50, 4)
	}

	if (bar > 0) {
		sisyphus.bearing = sisyphus.rotation;
		if (sisyphus.rotation === 0) {
			sisyphus.applyForce(80);
		} else {
			sisyphus.applyForce(1000);
		}
	}

	if (round(sisyphus.x) <= round(sisyphus.previousPosition.x)) {
		sisyphus.ani.stop();
	} else {
		sisyphus.ani.play();
	}

	if (sisyphus.x > windowWidth + sisyphus.hw) {
		sisyphus.x = -32 - boulder.d;
		sisyphus.y = windowHeight*0.75;
		boulder. x = - boulder.r;
		boulder.y = sisyphus.y;
	}

	if (boulder.x < -boulder.r) {
		sisyphus.x = windowWidth + sisyphus.hw;
		sisyphus.y = windowHeight * 0.5;
		boulder.x = sisyphus.x + boulder.d;
		boulder.y = sisyphus.y;
	}

	floor.debug = mouse.pressing();

}
