var Vector2 = function(x, y)
{
	this.x = x;
	this.y = y;
	
	this.length = Math.sqrt(x*x + y*y)
}

Vector2.prototype.add(vect)
{
	var result = new Vector2(this.x + vect.x, this.y + vect.y);
	
	return result;
}

Vector2.prototype.subtract(vect)
{
	var result = new Vector2(this.x - vect.x, this.y - vect.y);
	
	return result;
}

Vector2.prototype.multiply(vect)
{
	var result = new Vector2(this.x * vect.x, this.y * vect.y);
	
	return result;
}

Vector2.prototype.divide(vect)
{
	var result = new Vector2(this.x / vect.x, this.y / vect.y);
	
	return result;
}

Vector2.prototype.multiplyScalar(num)
{
	var result = new Vector2(this.x * num, this.y * num);
	
	return result;
}

//Normalising the vector
Vector2.prototype.normalize()
{
	//normalisation is done by dividing the vector values (this.x, this.y) by the single length value(this.length)
	var result = (this.x / this.length, this.y / this.length);
	
	return result;
}