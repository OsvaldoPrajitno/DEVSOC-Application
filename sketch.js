let sprite, floor, sisyphus;
let slope1, slope2;
let canvas;
let bar = 0;

function preload() {
	const startPosY = windowHeight * 0.64;
	const startPosX = windowWidth / 2;

	sprite = new Sprite(startPosX + 49, startPosY);
	sprite.img = '/assets/Boulder.png'
	sprite.d = 98;
	sprite.bounciness = 0.2;
	sprite.rotationDrag = 0.5;
	sprite.mass = 6;
	sprite.debug = false;

	//ani = loadAni('/Sisyphus.png', {frameSize: [32, 32], frame: 8});

	sisyphus = new Sprite(startPosX-35, startPosY, 64, 64, 'd');
	
	sisyphus.spriteSheet = '/assets/SisyphusNew.png'
	sisyphus.anis.frameDelay = 4;
	sisyphus.friction = 0.2;
	sisyphus.debug = false;
	
	sisyphus.addAnis({
		walk: {row: 0, frames: 8},
	})

	floor = new Sprite(windowWidth/2, windowHeight*0.85, windowWidth/3, windowHeight/3);
	floor.collider = 'static';
	floor.color = 'black';
	floor.debug = false;

	const wid = round(floor.h * Math.sqrt(3));
	const offset = round(floor.w/2);
	
	floor.addCollider(-floor.w*0.8, 0, [[0, floor.h/2], [-offset - wid, 0], 
	[wid, -floor.h], [offset, 0], [0, floor.h/2]]);

	floor.addCollider(600, floor.h*0.9, [[0, -floor.h], [wid*2, -floor.h*2], 
	[0, floor.h*6], [-wid*2, 0], [0, -floor.h*3]])

	///////////////////////////////
	///  TODO: WRAP AROUND  ///////
	///////////////////////////////
	
}

function setup() {
	canvas = new Canvas(windowWidth, windowHeight);
	world.gravity.y = 15;

	console.log(windowWidth, windowHeight)
}

function draw() {
	background('#b66d27');
	
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
		//sisyphus.friction = 0.2;
		sisyphus.bearing = sisyphus.rotation;
		//sisyphus.vel.y = 0.3;
		sisyphus.applyForce(500);
	}

	if (round(sisyphus.x) <= round(sisyphus.previousPosition.x)) {
		sisyphus.ani.stop();
	} else {
		sisyphus.ani.play();
	}

	//camera.x = sisyphus.x;
	//camera.y = sisyphus.y - 100;

	floor.debug = mouse.pressing();

}
