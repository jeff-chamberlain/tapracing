function xTime() {
	var d = new Date();
	return( d.getTime() );
}
function xLerp( var v0, var v1, var t ) {
	return( v0*(1-t) + v1*t );
}