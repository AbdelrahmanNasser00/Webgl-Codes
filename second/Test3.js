var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform float a_PointSize;
void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
}`;
var FSHADER_SOURCE=`
precision mediump float;
uniform vec4 PointColor;
void main(){
    gl_FragColor=PointColor;
}`;
function main(){
    var canvas=document.getElementById('Canvas2');

    var gl=canvas.getContext('webgl');

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    var a_PointSize=gl.getUniformLocation(gl.program,'a_PointSize');
    var PointColor=gl.getUniformLocation(gl.program,'PointColor');

    canvas.onmousedown=function(ev){click(ev,gl,canvas,a_Position,a_PointSize,PointColor)};
    
    
}
var points=[];
var colors=[];
function click(ev,gl,canvas,a_Position,a_PointSize,PointColor){
    var x=ev.clientX;
    var y=ev.clientY;
    var rect=ev.target.getBoundingClientRect();

    x = ((x-rect.left)-canvas.height/2)/(canvas.height/2);
    y = (canvas.width/2-(y-rect.top))/(canvas.width/2);

    points.push([x,y]);

    colors.push([0.0, 1.0, 0.0, 1.0]);
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len=points.length;
    var tempSize=10.0;
    for(var i = 0 ; i < len ; i++){

        var xy=points[i];
        
        
        tempSize+=(i/5);
        
        gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
        
        gl.uniform1f(a_PointSize, tempSize);
        
        //gl.uniform4f(PointColor,rgba[0],rgba[1],rgpa[2],rgpa[3]);
        gl.uniform4f(PointColor, colors[0], colors[1], colors[2], colors[3]);

        gl.drawArrays(gl.POINTS,0,1);
    }
}