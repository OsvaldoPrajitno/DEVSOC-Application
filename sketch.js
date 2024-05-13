let sprite, floor, sisyphus;
let flat;
let canvas;
let bar = 0;
let threshold;

function preload() {

	sprite = new Sprite(windowWidth/2, 390);
	sprite.img = '/assets/Boulder.png'
	sprite.d = 98;
	sprite.bounciness = 0.2
	sprite.rotationDrag = 2;
	sprite.debug = false;

	//ani = loadAni('/Sisyphus.png', {frameSize: [32, 32], frame: 8});

	sisyphus = new Sprite(100, windowHeight-230, 64, 64, 'd');
	
	sisyphus.spriteSheet = '/assets/SisyphusNew.png'
	sisyphus.anis.frameDelay = 20;
	sisyphus.friction = 0.5;
	sisyphus.debug = true;
	
	sisyphus.addAnis({
		walk: {row: 0, frames: 8},
	})

	floor = new Sprite([[0, windowHeight-120], [150, windowHeight-120], [1200, -40]]);
	floor.collider = 'static';

	flat = new Sprite(camera.x - 32, sisyphus.y - 32, 10, 10, 'kinematic');
}

function setup() {
	canvas = new Canvas(windowWidth, windowHeight);
	world.gravity.y = 10;
}

function draw() {
	background('#b66d27');
	text((windowHeight- 153 - round(sisyphus.y)), 50, 50);

	while (bar > -0.01) {
		bar -= 0.001
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
		sisyphus.applyForce(1000);
	}

	if (kb.presses('a')) {
		sisyphus.vel.x = 0;
		sisyphus.vel.y = 0;
		bar--;
	}

	camera.x = sisyphus.x;
	camera.y = sisyphus.y;

	flat.height = bar;
	flat.x = camera.x - 120;
	flat.y = camera.y - 80;

}
