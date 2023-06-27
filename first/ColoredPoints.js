var VSHADER_SOURCE=`
attribute vec4 a_Position;
void main(){
    gl_Position= a_Position;
    gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
precision mediump float;
uniform vec4 u_FragColor;
void main(){
gl_FragColor = u_FragColor;
}`;
function main(){
var canvas = document.getElementById('Canvas2');
if(!canvas){
    console.log("failed to retrieve <canvas> element");
    return;
}
var gl=canvas.getContext('webgl');
//inialize shaders
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
//get the storage location of a_Position
var a_Position = gl.getAttribLocation(gl.program,'a_Position');
//get the storage location of u_FragColor
var u_FragColor= gl.getUniformLocation(gl.program,'u_FragColor');
//clear canvas
canvas.onmousedown = function(ev){ click(ev,gl,canvas,a_Position,u_FragColor) };
gl.clearColor(0.0 , 0.0 , 0.0 , 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

}
//array of points and array for colors
var g_points=[]; //array for mouse press
var g_colors=[]; //array to store color of points
function click(ev,gl,canvas,a_Position,u_FragColor){
    var x=ev.clientX;
    var y=ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x=((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y=(canvas.height/2 - (y - rect.top))/(canvas.height/2);
    //store points
    g_points.push([x,y]);
    //store colors to g_colors array
    if(x >= 0.0 && y >= 0.0){
        g_colors.push([1.0,1.0,0.0,1.0]);
    }
    else if(x < 0.0 && y < 0.0){
        g_colors.push([0.0,1.0,1.0,1.0]);
    }
    else if(x <= 0.0 && y >= 0.0){
        g_colors.push([0.0,1.0,0.0,1.0]);
    }
    else {
        g_colors.push([1.0,0.0,1.0,1.0]);
    }
    //clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len=g_points.length;
    for(var i = 0; i < len ; i++){
        var xy=g_points[i];
        var rgba=g_colors[i];
        //pass the position of the points to a_position
        gl.vertexAttrib3f(a_Position , xy[0] , xy[1] , 0.0);
        //pass the color of the point to u_FragColor 
        gl.uniform4f(u_FragColor , rgba[0] , rgba[1] , rgba[2] , rgba[3]);
        //draw a point
        gl.drawArrays(gl.POINTS , 0 , 1);
    }
}
