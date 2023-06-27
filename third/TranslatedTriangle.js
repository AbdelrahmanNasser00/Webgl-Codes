var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform vec4 u_Translation;
void main(){
    gl_Position=a_Position + u_Translation;
    gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
}`;
var Tx=0.5,Ty=0.5,Tz=0.0;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl =getWebGLContext(canvas);

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var n = initVertexBuffers(gl);

    var u_Translation=gl.getUniformLocation(gl.program,'u_Translation');

    gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);

    gl.clearColor(0.0,0.0,0.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);
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
