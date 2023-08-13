var canvas;
var context;
var keyPressed = {};
var score = 0;
var movingSpeed = 5;
var lives = 3;
var dead;
var shoe1Sprite;
var mainbagSprite;
var shoe2Sprite;
var shoe3Sprite;
var bagSprite;
var bkgSprite;
var music;
var ding;
var error;
var highScore = localStorage.getItem('highscore') || 0;

var bag = {
	posX: 200,
	posY: 370,
	disWidth: 100,
	disHeight: 130,
};

var mainbag = {
	posX: 150,
	posY: -25,
	disWidth: 80,
	disHeight: 80,
};

var shoe1 = {
	posX: 330,
	posY: -25,
	disWidth: 80,
	disHeight: 40,
}

var shoe2 = {
	posX: 260,
	posY: -25,
	disWidth: 80,
	disHeight: 40,
}

var shoe3 = {
	posX: 80,
	posY: -25,
	disWidth: 80,
	disHeight: 40,
}

window.onload = init;

function init(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    var x = canvas.width / 2;
	var y = canvas.height / 2;
    context.font = "20px Montserrat";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('In this game, you need to avoid catching any shoes',x,200);
    context.fillText('Catch the BAG only', x,222);
    context.fillText('Use the arrow keys to move the bag.', x, 276);
    context.fillText('Click anywhere to start.', x, 320);
    canvas.addEventListener('mousedown', chooseDifficulty, false);
    shoe1Sprite = document.getElementById('shoe1');
    mainbagSprite = document.getElementById('mainbag');
    shoe2Sprite = document.getElementById('shoe2');
    shoe3Sprite = document.getElementById('shoe3');
    bagSprite = document.getElementById('bag');
    bkgSprite = document.getElementById('background');
    error = document.getElementById('error');
    window.onkeydown = keydown;
    window.onkeyup = keyup;
}

function chooseDifficulty(){
	context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
	$('.btnEasy').css('display', 'inline-block');
	$('.btnHard').css('display', 'inline-block');
	context.font = "30px Montserrat";
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText('Choose a difficulty below.',250,250);
}

function drawEasy(){
	$('.btnEasy').css('display', 'none');
	$('.btnHard').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if(!dead){
    	context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite,bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(mainbagSprite,mainbag.posX, mainbag.posY, mainbag.disWidth, mainbag.disHeight);
		context.drawImage(shoe1Sprite,shoe1.posX, shoe1.posY, shoe1.disWidth, shoe1.disHeight);
		context.font = "17px Montserrat";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 40, 20);
	    context.fillText('Lives: ' + lives, 40, 37);

	    mainbag.posY = mainbag.posY + movingSpeed;
	    shoe1.posY = shoe1.posY + movingSpeed;

		if(keyPressed[39]) {
			console.log('sfsdf')
			bag.posX = bag.posX + movingSpeed;
	    }
	    if(keyPressed[37]){
	        bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawEasy);
	}
}

function drawHard(){
	$('.btnEasy').css('display', 'none');
	$('.btnHard').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if(!dead){
    	context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite,bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(mainbagSprite,mainbag.posX, mainbag.posY, mainbag.disWidth, mainbag.disHeight);
		context.drawImage(shoe1Sprite,shoe1.posX, shoe1.posY, shoe1.disWidth, shoe1.disHeight);
		context.drawImage(shoe2Sprite,shoe2.posX, shoe2.posY, shoe2.disWidth, shoe2.disHeight);
		context.drawImage(shoe3Sprite,shoe3.posX, shoe3.posY, shoe3.disWidth, shoe3.disHeight);
		context.font = "17px Montserrat";
	    context.fillStyle = 'red';
	    context.fillText('Score: ' + score, 40, 20);
	    context.fillText('Lives: ' + lives, 40, 37);

	    mainbag.posY = mainbag.posY + movingSpeed;
	    shoe1.posY = shoe1.posY + movingSpeed;
	    shoe2.posY = shoe2.posY + movingSpeed;
	    shoe3.posY	= shoe3.posY + movingSpeed;

		if(keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
	    }
	    if(keyPressed[37]){
	        bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawHard);
	}
}

function checkCollision(){
	if(bag.posX+bag.disWidth == canvas.width){
		bag.posX = bag.posX-5;
	}
	if(bag.posX == 0){
		bag.posX = bag.posX+5;
	}
	if(mainbag.posY+mainbag.disHeight == bag.posY && bag.posX < mainbag.posX+mainbag.disWidth && mainbag.posX< bag.posX+bag.disWidth){
		var randVegX = Math.floor((Math.random() * 440) + 1);
		mainbag.posX = randVegX;
		mainbag.posY = -25;
    	score++;
    	
    }
    if(mainbag.posY+mainbag.disHeight == canvas.height){
		var randVegX = Math.floor((Math.random() * 440) + 1);
		mainbag.posX = randVegX;
		mainbag.posY = -25;
		lives--;
		if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(shoe1.posY+shoe1.disHeight == bag.posY && bag.posX < shoe1.posX && shoe1.posX+shoe1.disWidth< bag.posX+bag.disWidth){
		var randCanX = Math.floor((Math.random() * 440) + 1);
		shoe1.posX = randCanX;
		shoe1.posY = -25;
    	lives--;
    	if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(shoe1.posY+shoe1.disHeight == canvas.height){
		var randCanX = Math.floor((Math.random() * 440) + 1);
		shoe1.posX = randCanX;
		shoe1.posY = -25;
    }

    if(shoe2.posY+shoe2.disHeight == bag.posY && bag.posX < shoe2.posX && shoe2.posX+shoe2.disWidth< bag.posX+bag.disWidth){
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		shoe2.posX = randCanX2;
		shoe2.posY = -25;
    	lives--;
    	if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(shoe2.posY+shoe2.disHeight == canvas.height){
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		shoe2.posX = randCanX2;
		shoe2.posY = -25;
    }

    if(shoe3.posY+shoe3.disHeight == bag.posY && bag.posX < shoe3.posX && shoe3.posX+shoe3.disWidth< bag.posX+bag.disWidth){
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		shoe3.posX = randCanX3;
		shoe3.posY = -35;
    	lives--;
    	if(lives == -1){
			dead = true;
			gameOver();
		}
    }
    if(shoe3.posY+shoe3.disHeight == canvas.height){
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		shoe3.posX = randCanX3;
		shoe3.posY = -25;
    }
}


function gameOver(){
	var x = canvas.width / 2;
	var y = canvas.height / 2;
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.font = "40px Montserrat";
    context.fillStyle = 'red';
    context.fillText('GAME OVER', x,200);
    context.fillStyle = 'black';
    context.fillText('Final Score: ' + score, x,250);
    if(score > highScore){
    	highScore = score;
    	localStorage.setItem('highscore', highScore);
    	context.fillText('High Score: ' + highScore, x,300);
    	alert("New High Score!");
    }
    else{
    	context.fillText('High Score: ' + highScore, x,300);
    }
    $('.btnAgain').css('display', 'inline-block');
}

function replay(){
	location.reload();
}

function keydown(e) {
    keyPressed[e.keyCode] = true;
}

function keyup(e) {
    keyPressed[e.keyCode] = false;
}


// let currMoleTile;
// let currPlantTile;
// let score = 0;
// let gameOver = false;

// function startGame() {
//     setGame();
// }

// function setGame() {
//     $('.button-div').hide();
//     //set up the grid in html
//     for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
//         //<div id="0-8"></div>
//         let tile = document.createElement("div");
//         tile.id = i.toString();
//         tile.addEventListener("click", selectTile);
//         document.getElementById("canvas").appendChild(tile);
//     }
//     setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
//     setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
// }

// function getRandomTile() {
//     //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
//     let num = Math.floor(Math.random() * 9);
//     return num.toString();
// }

// function setMole() {
//     if (gameOver) {
//         return;
//     }
//     if (currMoleTile) {
//         currMoleTile.innerHTML = "";
//     }
//     let mole = document.createElement("img");
//     mole.src = "./images/black-bag.png";

//     let num = getRandomTile();
//     if (currPlantTile && currPlantTile.id == num) {
//         return;
//     }
//     currMoleTile = document.getElementById(num);
//     currMoleTile.appendChild(mole);
// }

// function setPlant() {
//     if (gameOver) {
//         return;
//     }
//     if (currPlantTile) {
//         currPlantTile.innerHTML = "";
//     }
//     let plant = document.createElement("img");
//     plant.src = "./images/false.png";

//     let num = getRandomTile();
//     if (currMoleTile && currMoleTile.id == num) {
//         return;
//     }
//     currPlantTile = document.getElementById(num);
//     currPlantTile.appendChild(plant);
// }

// function selectTile() {
//     if (gameOver) {
//         return;
//     }
//     if (this == currMoleTile) {
//         score += 10;
//         document.getElementById("score").innerText = score.toString(); //update score html
//     }
//     else if (this == currPlantTile) {
//         document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
//         gameOver = true;
//     }
// }