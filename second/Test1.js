var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main(){
    gl_Position=u_ModelMatrix * a_Position;
}`;
var FSHADER_SOURCE=`
precision mediump float;
uniform float u_Width;
uniform float u_Height;
void main(){
    gl_FragColor=vec4(gl_FragCoord.x/u_Width,0.0,gl_FragCoord.y/u_Height,1.0);
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
    canvas.onmousedown=function(ev){click(ev,gl,modelMatrix,u_ModelMatrix)}
    
    

   
}
function click(ev,gl,modelMatrix,u_ModelMatrix){
   
        animate();
        draw(gl,n,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(click,canvas);
    
   
}

function initVertexBuffers(gl){
    var vertices1= new Float32Array([
        -0.2, 0.2, 
        0.2, 0.2, 
        0.2, -0.2, 
        -0.2, -0.2, 
        -0.2, 0.2, 
        0.2, 0.2, 
        0.2, -0.2, 
        -0.2, -0.2]);
    n=8;
    var vertexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices1,gl.STATIC_DRAW);
    var a_Position=gl.getAttribLocation(gl.program,'a_Position');

    var u_Width=gl.getUniformLocation(gl.program,'u_Width');
    var u_Height = gl.getUniformLocation(gl.program, 'u_Height');
    gl.uniform1f(u_Width, gl.drawingBufferWidth);
    gl.uniform1f(u_Height, gl.drawingBufferHeight);
  
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
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

