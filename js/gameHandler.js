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
	
	
	if (!CanvasSupport()) {
		return; // Just give up
	} else {
		canvasRef = document.getElementById('canvas');
		
		winH = window.innerHeight;
		winW = window.innerWidth;
		canvasRef.height = winH;
		canvasRef.width  = winW;
		
		context = canvasRef.getContext('2d');
		
		var playerCount = 8;
		var playerNames = new Array('Jeff', 'Wes', 'Tiffany', 'Brent', 'Lamp', 										'Shoe', 'Bed', 'Pillow');
		drawPlayers( playerCount, playerNames );
		
	}
	
	
	var minPlayers = 2;
	function checkForPlayers() {
		
	}
	function addPlayer( player ) {
	
	}
	function drawPlayers( count, names ) {
		boxWidth = winH / ( ( count * 2 ) + 1);
		for( var i = 0; i < count; i ++ ) {
			var boxY = boxWidth + ( i * 2 * boxWidth );
			var boxX = 10;
			context.fillStyle = 'white';
			context.fillRect(boxX,boxY,boxWidth,boxWidth);
			var nameX = boxX + ( boxWidth / 2 );
			var nameY = boxY + ( boxWidth / 2 );
			context.fillStyle = 'red';
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.font = '20px _sans'; // use 20 pixel sans serif font
			context.fillText(names[i],nameX,nameY); // write text
		}
	}
	function switchMode( newMode ) {
		switch( newMode ) {
			case "waiting":
			
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