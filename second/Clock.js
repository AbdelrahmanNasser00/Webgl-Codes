var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main(){
    gl_Position=u_ModelMatrix * a_Position;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}`;
var stepSec=-200;
var stepMin=stepSec/60.0;
var stepHour=stepMin/60.0;

var ANGLE_SEC=0.0;
var ANGLE_MIN=0.0;
var ANGLE_HOUR=0.0;

function main(){
    var canvas = document.getElementById('Canvas2');
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var n = initVertexBuffers(gl);

    var modelMatrix=new Matrix4();
    var u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var tick=function(){
        animate();
        draw(gl,n,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick,canvas);
    }
    tick();
}
function initVertexBuffers(gl){
    var vertices=new Float32Array([
        0.0, 0.0, 
        0.0, 0.2, 
        0.0, 0.0, 
        0.0, 0.4,
        0.0, 0.0, 
        0.0, 0.6,
    ])
    n=6;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
}
function draw(gl,n,modelMatrix,u_ModelMatrix){
    gl.clear(gl.COLOR_BUFFER_BIT);
    //hours
    modelMatrix.setRotate(ANGLE_HOUR,0,0,1);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.drawArrays(gl.LINES,0,2);
    //minutes
    modelMatrix.setRotate(ANGLE_MIN,0,0,1);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.drawArrays(gl.LINES,2,2);
    //seconds
    modelMatrix.setRotate(ANGLE_SEC,0,0,1);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.drawArrays(gl.LINES,4,2);

}
var g_last=Date.now();
function animate(){
    var now = Date.now();
    var elapsed = now - g_last;
    g_last=now;

    ANGLE_HOUR=ANGLE_HOUR+(stepHour*elapsed)/1000.0;
    ANGLE_MIN=ANGLE_MIN+(stepMin*elapsed)/1000.0;
    ANGLE_SEC=ANGLE_SEC+(stepSec*elapsed)/1000.0;

}