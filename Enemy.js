var Enemy = function()
{
	this.image = document.createElement("img");
	this.image.src = "likelike.png";
	
	this.position = new Vector2(400, 200);
	this.velocity = new Vector2(0, 0);
	this.direction = RIGHT;
};

Enemy.prototype.update = function(deltaTime)
{
	var acceleration = new Vector2(0,0);
	var enemyAccel = 4000;
	var enemyDrag = 12;
	
	if (this.direction == RIGHT)
	{
		acceleration.x = enemyAccel;
	}
	else
	{
		acceleration.y = -enemyAccel;
	}
	
	var dragX = this.velocity.x * enemyDrag;
	acceleration.x -= dragX;
	this.velocity = this.velocity.add(acceleration.multiplyScalar(deltaTime));
	this.position = this.position.add(this.velocity.multiplyScalar(deltaTime));
	
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	
	var nx = this.position.x % TILE;
	var ny = this.position.y % TILE;
	
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cell_right = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var cell_down = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var cell_diag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	
	if(this.direction == RIGHT)
	{
		if(!cell && (cell_right && nx))
		{
			this.direction = LEFT;
		}
		if(cell_down && (!cell_diag && nx))
		{
			this.direction = LEFT;
		}
	}
	else
	{
		if(cell && (!cell_right && nx))
		{
			this.direction = RIGHT;
		}
		if(!cell_down && (cell_diag && nx))
		{
			this.direction = RIGHT;
		}
	}
}

Enemy.prototype.draw = function(offSetX, offSetY)
{
	context.drawImage(this.image, this.position.x - offSetX, this.position.y - offSetY);

}