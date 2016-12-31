var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var score = 0;
var screenSizeX = 600;
var screenSizeY = 400;
var reset = 450;
var invaderWidth = 20;
var bullet = new Array(), player, playArea, invader = new Array(), spacePressed, aPressed, dPressed, ascii, timeLeft, highScore = 0, globalTime = 0;
var moveSpeed = 6;
var reloadTimer = 50; //reload speed in 10ms

function init()
{
	playArea = new box(0, 0, screenSizeX, screenSizeY, "grey");
	player = new box(0,350,50, 50, "blue");
	setInterval(loop, 10);
	setInterval(globalTimeIncrement, 1000);
	invader[0] = new box((screenSizeX - invaderWidth) * Math.random(), 0, invaderWidth, invaderWidth, "green");//initially spawn 1 invader at random position at top of the screen
	//bullet[0] = new box(0, reset, 10, 10, "black");
}
function loop()
{
	refresh();
	update();
	draw();
}
function update()
{
	//console.log(bullet.length);
	
	document.onkeypress = keyDown;
	document.onkeyup = keyUp;
	
	if(reloadTimer) reloadTimer--;
	
	for(i=0; i < bullet.length;i++)//move every bullet in the play area up 1px per update
	{
		if(recCol(bullet[i], playArea))
		{
			bullet[i].y--;
		}
	}
		
	if(aPressed && player.x > 0)						//move the player at the specified move speed
	{													//
		player.x-=moveSpeed;							//left if 'a' is pressed and not at the leftmost edge
	}													//
	else if(dPressed && player.x + player.width < screenSizeX)	//
	{													//
		player.x+=moveSpeed;							//right if 'd' is pressed and not at the rightmost edge
	}													//
	if(spacePressed)									//
	{													//
		if(reloaded())									//
		{												//
			Shoot();									//
		}
	}

	
	for(i=0; i < invader.length;i++)
	{
		for(j=0; j < bullet.length;j++)
		{
			if(recCol(bullet[j], invader[i])) //if any bullet collides with any invader
			{
				invader[i].x = (screenSizeX - invader[i].width) * Math.random();//reset the invader to random position
				invader[i].y = 0;				   //at the top of the screen
				score++;						   //and add to score
				
				bullet[j].y = reset;			//send the used bullet to a y level out of screen
			}
			if(!recCol(invader[i], playArea))//if any invader exits the bottom of the screen
			{
				invader[i].x = (screenSizeX - invader[i].width) * Math.random();//reset the invader to random position
				invader[i].y = 0					//at the top of the screen
				score--;							//and deduct the score
			}
		}
	}
	
	if(score > highScore)//increment high score if current score exceeds
	{
		highScore = score;
	}
	
}
function draw()
{
	playArea.drawBox(context);
	
	for(i=0; i < invader.length;i++)//draw all the invaders
	{
		invader[i].drawBox(context);
	}
	for(i=0; i < bullet.length;i++)//draw all the bullets
	{
		if (typeof bullet[i] != 'undefined')
		{
			bullet[i].drawBox(context);
		}
	}
	player.drawBox(context);
	document.getElementById("clock").innerHTML = "High Score: " + highScore + "&nbsp&nbsp&nbsp&nbspCurrent score: " + score;//print the high score and current score
}
function refresh()
{
	context.fillStyle = "orange";
	context.fillRect(0, 0, screenSizeX, (screenSizeY + 40)); //add 40px for menu bar at the bottom
	context.rect(0,0,screenSizeX, (screenSizeY + 40));
	context.stroke();
}

function keyDown(event)
{
	ascii = event.keyCode;
	if(ascii == 97)
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
	if(ascii == 65)
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

function globalTimeIncrement()
{
	globalTime++;
	if((globalTime%2) == 0)		//every 2 seconds spawn a new invader
	{
		invader[invader.length] = new box((screenSizeX - invaderWidth) * Math.random(), 0, invaderWidth, invaderWidth, "green");//spawn 1 invader at random position at top of the screen
	}
	
	for(i=0; i < invader.length;i++)
	{
		invader[i].y+=20;
	}
	
}

init();
