var mouse = {x:0, y:0};


function box(x,y,width,height, color, vx, vy)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.vx = vx;
	this.vy = vy;
	this.color = color;
	
	this.drawBox = function(context)
	{
		context.fillStyle = color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

function progressBar(maxWidth, height, healthPct, BG, hLevel)
{
	this.maxWidth = maxWidth;
	this.healthPct = healthPct;
	
	this.BG = new box(10, (screenSizeY + 10), maxWidth, height, "black");
	this.hLevel = new box(10, (screenSizeY + 10), maxWidth, height, "red");
}

function reloaded()
{
	if(reloadTimer == 0)
	{
		reloadTimer = 10;
		return true;
	}
	else return false;
}

function keyDown(event)
{
	ascii = event.keyCode;
	if(ascii == 119)
	{
		wPressed = true;
	}
	else if(ascii == 115)
	{
		sPressed = true;
	}
	else if(ascii == 97)
	{
		aPressed = true;
	}
	else if(ascii == 100)
	{
		dPressed = true;
	}
	else if(ascii == 32)
	{
		spacePressed = true;
	}
	
}
//			~~~~~~~~~~~no idea why keyDown is uppercase ASCII and keyUp is lowercase ASCII~~~~~~~~~~~~~
function keyUp(event)
{
	ascii = event.keyCode;
	if(ascii == 87)
	{
		wPressed = false;
	}
	else if(ascii == 83)
	{
		sPressed = false;
	}
	else if(ascii == 65)
	{
		aPressed = false;
	}
	else if(ascii == 68)
	{
		dPressed = false;
	}
	else if(ascii == 32)
	{
		spacePressed = false;
	}
}

function recCol(r1,r2) 
{ 	
	return !(r2.x>(r1.x+r1.width)|| 
	(r2.x+r2.width)<(r1.x)|| 
	(r2.y)>(r1.y+r1.height)|| 
	(r2.y+r2.height)<r1.y); 			  
}

function distance(r1, r2)
{
	return(Math.sqrt( (r1.x - r2.x)*(r1.x - r2.x) + (r1.y - r2.y)*(r1.y - r2.y) ));
}

function mouseDown()
{
	mouse.x = event.offsetX;
	mouse.y = event.offsetY;
	
	if(reloaded())									//
		{												//
			Shoot();									//
		}
}

function Shoot()
{
	bullet[bullet.length] = new box( (player.x + (player.width/2) - 10) , (player.y + (player.width/2) - 10), 10, 10, "white"); //spawn a new bullet
	
	var activeBullet = bullet.pop();
	bullet.push(activeBullet);
	
	activeBullet.vx = (activeBullet.x - mouse.x)/distance(activeBullet, mouse);
	activeBullet.vy = (activeBullet.y - mouse.y)/distance(activeBullet, mouse);
}																								//from the center of the player

