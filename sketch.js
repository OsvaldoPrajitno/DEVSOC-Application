let sprite, floor, sisyphus;
let slope1, slope2;
let canvas;
let bar = 0;
let initHeight;

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
	
	//floor.addCollider(-floor.width * 1.628, floor.height * 0.812, [2000, -30],);
	floor.addCollider(-floor.w*1.02, floor.h*0.17, [[0, floor.h], [-800, 0], 
	[800, -floor.h]]);

	floor.addCollider(floor.w, floor.h/4, [[0, -floor.h/2], [windowWidth/2, -floor.h], 
	[0, floor.h*3], [-windowWidth/2, 0], [0, -floor.h*1.5]])

	
}

function setup() {
	canvas = new Canvas(windowWidth, windowHeight);
	world.gravity.y = 15;
	initHeight = round(sisyphus.y)

	console.log(windowWidth, windowHeight)
}

function draw() {
	background('#b66d27');
	
	text(initHeight - round(sisyphus.y), 50, 50);

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
