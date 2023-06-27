var VSHADER_SOURCE=`
attribute vec4 a_Position;
void main(){
    gl_Position=a_Position;
    gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
}`;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl =getWebGLContext(canvas);

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');

    canvas.onmousedown = function(ev) {click(ev,gl,canvas,a_Position)};
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    
}
var g_Points=[];
function click(ev,gl,canvas,a_Position){
    var x =ev.clientX;
    var y= ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left)- canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y-rect.top))/(canvas.height/2);

    g_Points.push([x,y]);//g_Points.push(y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_Points.length;

    for(var i = 0; i < len; i++){
        var xy = g_Points[i];
        gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);

        gl.drawArrays(gl.POINTS,0,1);
    }
}