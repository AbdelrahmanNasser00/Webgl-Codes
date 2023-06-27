var VSHADER_SOURCE = `
   attribute vec4 a_Position; 
   uniform mat4 u_ModelMatrix; 
   void main() { 
     gl_Position = u_ModelMatrix * a_Position; 
  }`;

var FSHADER_SOURCE = `  
   void main() {
   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
   }`;
   var STEP_X=1.0;
   var STEP_Y=3.0;

   var Tx=0.0,Ty=0.0;
function main(){
    var canvas = document.getElementById('Canvas2');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var n = initVertexBuffers(gl);

    var u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');

    var modelMatrix=new Matrix4();


    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var tick = function(){
        changleTranslate();
        draw(gl,n,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick);
    };
    tick();
}
function initVertexBuffers(gl){
    var vertices = new Float32Array([
        -0.2, 0.2, 
        0.2, 0.2, 
        0.2, -0.2, 
        -0.2, -0.2
    ]);
    var n = 4;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}
function draw(gl,n,modelMatrix,u_ModelMatrix){
    modelMatrix.setTranslate(Tx,Ty,0);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN,0,n);
}
var g_last=Date.now();
function changleTranslate(){
    var now=Date.now();
    var elapsed=now-g_last;
    g_last=now;

    Tx=Tx+(STEP_X*elapsed)/1000.0;
    Ty=Ty+(STEP_Y*elapsed)/1000.0;

    if(Tx>0.8||Tx<-0.8){
        STEP_X*=-1;
    }
    if(Ty>0.8||Ty<-0.8){
        STEP_Y*=-1;
    }

}