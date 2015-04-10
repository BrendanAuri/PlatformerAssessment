var LAYER_COUNT = 3;
var MAP = {tw : 60, th : 15};
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var LAYER_BACKGOUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;

var tileset = document.createElement("img");
tileset.src = "tileset.png";

function drawMap(offSetX, offSetY){
	for (var layerIdx = 0 ; layerIdx < LAYER_COUNT ; layerIdx++)
	{
		var idx = 0;
		for(var y = 0; y < level1.layers[layerIdx].height; y++)
		{
			for(var x = 0; x < level1.layers[layerIdx].width; x++)
			{
				if(level1.layers[layerIdx].data[idx] != 0)
				{
					var tileIndex = level1.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE - offSetX , (y-1)*TILE - offSetY, TILESET_TILE, TILESET_TILE);

				}
				idx++;
			}
		}
	}
};
