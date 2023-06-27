var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform mat4 u_xformMatrix;
void main(){
    gl_Position = u_xformMatrix * a_Position;
    gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
}`;
var Sx=1.0,Sy=1.5,Sz=1.0;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl =getWebGLContext(canvas);

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var n = initVertexBuffers(gl);

    var xformMatrix=new Float32Array([
        Sx, 0.0, 0.0, 0.0,
        0.0, Sy, 0.0, 0.0,
        0.0, 0.0, Sz, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
    var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');

    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix)

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
