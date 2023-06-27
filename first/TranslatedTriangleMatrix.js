var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform mat4 u_xformMatrix;
void main(){
    gl_Position= u_xformMatrix * a_Position;
    
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}`;
var Tx=0.5,Ty=0.5,Tz=0.0;

function main(){
    var canvas=document.getElementById('Canvas2');

    var gl=canvas.getContext('webgl');

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    var n = initVertexBuffers(gl);

    var xformMatrix = new Float32Array([
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0,  0.0, 1.0, 0.0,
        Tx,  Ty, Tz, 1.0
    ]);

    var u_xformMatrix =gl.getUniformLocation(gl.program,'u_xformMatrix');

    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix);

    gl.clearColor(0.0,0.0,0.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);

}
function initVertexBuffers(gl){
    var vertices=new Float32Array([0.0, 0.5,   -0.5, -0.5,   0.5, -0.5]);
    n = 3;
    //create buffer
    var vertexBuffer=gl.createBuffer();
    if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
    //bind
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //data
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    //a_Position
    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
      }

    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}