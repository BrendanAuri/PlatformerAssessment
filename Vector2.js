//Values of vector and length calculation
var Vector2 = function(x, y){
	this.x = x;
	this.y = y;
	
	//Find the length of the vector
	this.length = Math.sqrt(x*x + y*y)
}

Vector2.prototype.add = function(vect){
	var result = new Vector2(this.x + vect.x, this.y + vect.y);
	
	return result;
}

Vector2.prototype.subtract = function(vect){
	var result = new Vector2(this.x - vect.x, this.y - vect.y);
	
	return result;
}

Vector2.prototype.multiply = function(vect){
	var result = new Vector2(this.x * vect.x, this.y * vect.y);
	
	return result;
}

Vector2.prototype.divide = function(vect){
	var result = new Vector2(this.x / vect.x, this.y / vect.y);
	
	return result;
}

Vector2.prototype.multiplyScalar = function(num){
	var result = new Vector2(this.x * num, this.y * num);
	
	return result;
}

//Normalising the vector
Vector2.prototype.normalize = function(){
	//normalisation is done by dividing the vector values (this.x, this.y) by the length value of the vectpr(this.length).
	var result = (this.x / this.length, this.y / this.length);
	
	return result;
}

Vector2.prototype.set = function(x, y){
		return new Vector2();
}