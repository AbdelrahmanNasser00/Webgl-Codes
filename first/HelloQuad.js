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
    var canvas = document.getElementById('Canvas2');

    var gl=canvas.getContext('webgl');

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var n = initVertexBuffers(gl);
    
    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);

}
function initVertexBuffers(gl){
    var vertces = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);
    n = 4;
    //create buffer
    var vertexBuffer=gl.createBuffer();
    //bind
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //data
    gl.bufferData(gl.ARRAY_BUFFER, vertces, gl.STATIC_DRAW);

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');

    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}