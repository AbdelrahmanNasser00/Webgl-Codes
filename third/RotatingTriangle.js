var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main(){
    gl_Position = u_ModelMatrix * a_Position;
    gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
}`;
var ANGLE_STEP=45.0;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl =getWebGLContext(canvas);

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var n = initVertexBuffers(gl);
 
    var ModelMatrix=new Matrix4();

    var u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');
    
    gl.clearColor(0.0,0.0,0.0,1.0);

    var currentAngle=0.0;
    
    var tick = function(){
        currentAngle=animate(currentAngle);
        draw(gl,n,currentAngle,ModelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick);
    }
    tick();
   
}
function initVertexBuffers(gl){
    var vertices= new Float32Array([
        0.0, 0.5, -0.5,-0.5, 0.5,-0.5
    ]);
    var n= 3;

    var vertexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}
function draw(gl,n,currentAngle,ModelMatrix,u_ModelMatrix){
    ModelMatrix.setRotate(currentAngle,0,0,1);
    ModelMatrix.translate(0.35,0,0);
    gl.uniformMatrix4fv(u_ModelMatrix,false,ModelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}
var g_last=Date.now();
function animate(angle){
    var now = Date.now();
    var elapsed=now-g_last;
    g_last=now;

    var newAngle=angle+(ANGLE_STEP*elapsed)/1000;
    return newAngle%=360;
}

