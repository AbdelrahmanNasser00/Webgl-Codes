var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = u_ModelMatrix * a_Position;
    v_Color=a_Color;
}`;
var FSHADER_SOURCE=`
precision mediump float;
varing vec4 v_Color;
void main(){
    gl_FragColor=v_Color;
}`;
var STEP_X=1.0;
var Tx=0.0;

var STEP_Y=1.0;
var Ty=0.0;
function main(){
    var canvas=document.getElementById('Canvas2');

    var gl=canvas.getContext('webgl');

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    
    var n=initVertexBuffers(gl);

    var u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');

    var modelMatrix=new Matrix4();

    gl.clearColor(0.0,0.0,0.0,1.0);

    var tick = function(){
        animate();
        draw(gl,n,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick,canvas);
    }
    tick();
    

   
}
function initVertexBuffers(gl){
    var vertices= new Float32Array([
        -0.2, 0.2, 1.0,  0.0,  0.0, 
        0.2, 0.2, 0.0,  1.0,  0.0,
        0.2, -0.2, 0.0,  0.0,  1.0,
        -0.2, -0.2, 1.0,  0.0,  0.0,
        -0.2, 0.2, 1.0,  0.0,  0.0,
        0.2, 0.2, 0.0,  1.0,  0.0,
        0.2, -0.2, 0.0,  0.0,  1.0,
        -0.2, -0.2, 1.0,  0.0,  0.0 ]);
    n=8;
    var vertexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    var FSIZE=vertexBuffer.BYTES_PER_ELEMENT;

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

    return n;
}
function draw(gl, n, modelMatrix ,u_ModelMatrix){
    gl.clear(gl.COLOR_BUFFER_BIT);

    modelMatrix.setTranslate(Tx,0,0);    
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    
    modelMatrix.setTranslate(0,Ty,0);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_FAN,4,4);

    
}

var g_last=Date.now();
function animate(){
    var now=Date.now();
    var elapsed=now - g_last;
    g_last=now;

    Tx = Tx + (STEP_X * elapsed) / 1000.0;
    if(Tx>0.8||Tx<-0.8){
        STEP_X*=-1;
    }
    Ty = Ty + (STEP_Y * elapsed) / 1000.0;
    if(Ty>0.8||Ty<-0.8){
        STEP_Y*=-1;
    }

}
