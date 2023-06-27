var VSHADER_SOURCE=`
attribute vec4 a_Position;
void main(){
    gl_Position=a_Position;
    gl_PointSize=10.0;
;
}`;
var FSHADER_SOURCE=`
precision mediump float;
uniform float u_Width;
uniform float u_Height;
void main(){
    gl_FragColor=vec4(gl_FragCoord.x/u_Width,0.0,gl_FragCoord.y/u_Height,1.0);
}`;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl =getWebGLContext(canvas);

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    var n = initVertexBuffers(gl);

    gl.clearColor(0.0,0.0,0.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);
}
function initVertexBuffers(gl){
    var vertices= new Float32Array([
        0.0, 0.5,
       -0.5, -0.5,
        0.5, -0.5,
    ]);
    var n= 3;

    var vertexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var u_Width=gl.getUniformLocation(gl.program,'u_Width');
    var u_Height=gl.getUniformLocation(gl.program,'u_Height');
    gl.uniform1f(u_Width,gl.drawingBufferWidth);
    gl.uniform1f(u_Height,gl.drawingBufferHeight);

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
}
