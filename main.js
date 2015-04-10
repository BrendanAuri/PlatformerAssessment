var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_IDLE_RIGHT = 3;
var ANIM_JUMP_RIGHT = 4;
var ANIM_WALK_RIGHT = 5;

var ANIM_MAX = 6;

// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var timer = 0;

// load an image to draw
//var chuckNorris = document.createElement("img");
//chuckNorris.src = "hero.png";

//ADDED THESE LINES
var keyboard = new Keyboard();
var player = new Player();
var enemy = new Enemy();

var music = new Howl(
{
	urls: ["spor-blueroom.mp3"],
	loop: true,
	buffer: true,
	volume: 0.5
} );
music.play();
var sfx = new Howl(
{
	urls: ["fireEffect.ogg"],
	buffer: true,
	volume: 1,
	onend: function() 
	{
		isSfxPlaying = false;
	}
} );

canvas.width = 960;
canvas.height = MAP.th * TILE;

var cells = [];

function initializeCollision()
{
	for (var layerIdx = 0 ; layerIdx < LAYER_COUNT ; layerIdx++)
	{
		cells[layerIdx] = [];
		var idx = 0;
		
		for (var y = 0 ; y < level1.layers[layerIdx].height ; y++)
		{
			cells[layerIdx][y] = [];
			
			for (var x = 0 ; x < level1.layers[layerIdx].width ; x++)
			{
				if(level1.layers[layerIdx].data[idx] != 0)
				{
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1; 
				}
				else if(cells[layerIdx][y][x] != 1) 
				{
					cells[layerIdx][y][x] = 0;
				}
				idx++
			}
		}
	}
}


function tileToPixel(tile_coord)
{
	return tile_coord * TILE;
}

function pixelToTile(pixel)
{
	return Math.floor(pixel / TILE);
}

function cellAtTileCoord(layer, tx, ty)
{
	if (tx < 0 || tx > MAP.tw || ty < 0)
	{
		return 1;
	}
	
	if (ty >= MAP.th)
	{
		return 0;
	}
	return cells[layer][ty][tx];
}

function cellAtPixelCoord(layer, x, y)
{
	var tx = pixelToTile(x);
	var ty = pixelToTile(y);
	
	return cellAtTileCoord(layer, tx, ty);
}

function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);

	var xScroll = player.position.x - canvas.width/2;
	
	var deltaTime = getDeltaTime();
	
	
	//context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);
	
	//Draw player
		
	if(xScroll < 0)
		xScroll = 0;
	if(xScroll >= MAP.tw * TILE - canvas.width)
		xScroll = MAP.tw * TILE - canvas.width;
	
	drawMap(xScroll, 0);
	
	player.update(deltaTime);
	player.draw(xScroll, 0);
	
	enemy.update(deltaTime);
	enemy.draw(xScroll, 0);
	
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
	

	if(document.getElementById("FPS").checked == true)
	{
		// draw the FPS
		context.fillStyle = "#f00";
		context.font="bold 30px Verdana";
		context.fillText("FPS: " + fps, 220, 55, 1000);
	}
	context.fillStyle = "#f00";
	context.font="bold 30px Verdana";
	context.fillText(Math.round(timer += deltaTime), 14, 100, 1000);
	
	var UI = new ui();
	
	//Lives & stuff	
	for(var i = 0 ; i < player.lifeCount ; i++)
	{
		context.drawImage(player.lifeImage, 22 + (i * 36), 33, 26, 22);
	}
}

initializeCollision();

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
