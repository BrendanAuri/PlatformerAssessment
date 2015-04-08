var LAYER_COUNT = 5;
var MAP = {tw : 20, th : 15};
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var LAYER_BACKGOUND = 0;
var LAYER_LADDERS = 1;
var LAYER_ROPE = 2;
var LAYER_DOOR = 3;
var LAYER_PLATFORMS = 4;

var tileset = document.createElement("img");
tileset.src = "tileset.png";

function drawMap(){
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
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);

				}
				idx++;
			}
		}
	}
};

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
	
	if ( ty >= MAP.th)
	{
		return 0;
	}
	return cells[layer][tx][ty];
}

function cellAtPixelCoord(layer, x, y)
{
	var tx = pixelToTile(x);
	var ty = pixelToTile(y);
	
	return cellAtTileCoord(layer, tx, ty);
}