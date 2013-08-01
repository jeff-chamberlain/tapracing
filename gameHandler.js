	window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	//hideAddressBar(window);
	CanvasApp();
}

// Check for canvas support
function CanvasSupport() {
	return Modernizr.canvas;
}

function CanvasApp() {
	
	// Get canvas context
	var canvasRef;
	var context = null;
	var winW;
	var winH;
	
	var gameMode = "waiting"; // waiting, ready, running, finished
	var currentMenu = null;
	var winningCount = 200;
	var countdownVal = '';
	var timeout;
	var interval;
	
	var socket;
	
	if (!CanvasSupport()) {
		return; // Just give up
	} else {
		canvasRef = document.getElementById('canvas');
		
		winH = window.innerHeight;
		winW = window.innerWidth;
		canvasRef.height = winH;
		canvasRef.width  = winW;
		
		context = canvasRef.getContext('2d');
		
		var playerCounts = new xHashTable( null );
		var playerNames = new xHashTable( null );
		var playerNum = 0;
		
		//initializeSocket();
		//interval = setInterval( draw, 33 );
	}
	
	function initializeSocket( var scriptSocket ) {
		
		socket = scriptSocket;
		/*
		socket = io.connect('http://localhost:5000/game');//http://thawing-stream-1812.herokuapp.com/game');

		socket.on('msg', function(msg) {
			var event = msg.event,
            playerid = msg.playerid,
            name = null;
            if( msg.hasOwnProperty('name') ) {
			    name = msg.name;
            }
        
			switch(event) {
				case 'join':
					addPlayer( playerid, name );
					break;
				case 'leave':
					losePlayer( playerid );
					break;
				case 'tap':
					playerTap( playerid );
					break;
			}
		});*/
	}
	function addPlayer( id, name ) {
		playerNum ++;
		playerNames.setItem( id, name );
		playerCounts.setItem( id, 0 );
	}
	function losePlayer( id ) {
		playerNum --;
		playerCounts.removeItem( id );
		playerNames.removeItem( id );
	}
	function playerTap( id ) {
		var newCount = playerCounts.getItem( id ) + 1;
		playerCounts.setItem( id, newCount );
	}
	function startGame() {
		console.log( 'starting the game!' );
	}
	function drawCountDown() {
		context.clearRect( winW/4, winH/4, winW/2, winH/2 );
		var countdownText = 'Starting game in...'
		var textX = winW / 2;
		var textY = winH / 2;
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = '50px _sans'; // use 20 pixel sans serif font
		context.fillText(countdownText,textX,textY); // write text
		context.font = '75px _sans'; // use 20 pixel sans serif font
		context.fillText(countdownVal,textX,textY + 75); // write text
		if( countdownVal == '' ) {
			countdownVal = 3;
			timeout = setTimeout( countDown, 1000 );
		}
		else {
			countdownVal --;
			if( countdownVal > 0 ) {
				timeout = setTimeout( countDown, 1000 );
			}
			else {
				startGame();
			}
		}
		
	}
	function drawBackground() {
		context.clearRect(0,0,winW,winH);
		context.fillStyle = 'black';
		context.fillRect(0,0,winW,winH);
	}
	function drawPlayers() {
		
		boxWidth = winH / ( ( count * 2 ) + 1);
		for( var i = 0; i < playerCount; i ++ ) {
			var boxY = boxWidth + ( i * 2 * boxWidth );
			var boxX = 10;
			context.fillStyle = 'white';
			context.fillRect(boxX,boxY,boxWidth,boxWidth);
			var nameX = boxX + ( boxWidth / 2 );
			var nameY = boxY - 20;
			context.fillStyle = 'red';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.font = '20px _sans'; // use 20 pixel sans serif font
			context.fillText(names[i],nameX,nameY); // write text
		}
	}
	function draw() {
		drawBackground();
		switch( gameMode ) {
			case "waiting":
			drawPlayers();
			break;
			case "ready":
			
			break;
			case "running":
			
			break;
			case "finished":
			
			break;
		}
	}
}