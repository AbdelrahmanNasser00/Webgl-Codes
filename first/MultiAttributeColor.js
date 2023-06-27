var VSHADER_SOURCE=`
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
gl_Position=a_Position;
gl_PointSize=10.0;
v_Color=a_Color;
}`;
var FSHADER_SOURCE=`
precision mediump float;
varying vec4 v_Color;
void main(){
gl_FragColor=v_Color;
}`;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl=canvas.getContext('webgl');
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var n=initVertexBuffers(gl);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS,0,n);
}
function initVertexBuffers(gl){
    var verticesColor=new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0,
    ])
    n=3;
    var vertexColorBuffer=gl.createBuffer();
    //first buffer
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesColor,gl.STATIC_DRAW);
    var a_Position=gl.getAttribLocation(gl.program,'a_Position');

    var FSIZE=verticesColor.BYTES_PER_ELEMENT;
    
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*5,0);
    gl.enableVertexAttribArray(a_Position);
    //second buffer
    
    var a_Color=gl.getAttribLocation(gl.program,'a_Color');
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*5,FSIZE*2);
    gl.enableVertexAttribArray(a_Color);

    return n;

}