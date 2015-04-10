var ui = function ui()
{
	this.image = document.createElement("img");
	this.image.src = "livesbox.png";
	
	context.drawImage(this.image, 7, 7);
}
