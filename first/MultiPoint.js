var VSHADER_SOURCE=`
attribute vec4 a_Position;
void main(){
gl_Position=a_Position;
gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}`;

function main(){
    var canvas=document.getElementById('Canvas2');

    var gl = canvas.getContext('webgl');

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    //write the positions of vertices to vertex shader
    var n = initVertexBuffers(gl);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP,0,n);
}
function initVertexBuffers(gl){
    var vertices = new Float32Array([0.0,0.5, -0.5,-0.5, 0.5,-0.5]);
    var n = 3; //number of vertices
    //create buffer
    var vertexBuffer = gl.createBuffer();
    //bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //write data into the buffer
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');

    //assign the buffer object to a_Position 
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    //enable  the assignment to a_Position
    gl.enableVertexAttribArray(a_Position);

    return n;
}