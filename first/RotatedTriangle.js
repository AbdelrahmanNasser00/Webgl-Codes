//x'=x cosb-y sinb
//y'=x sinb+ y cosb
var VSHADER_SOURCE=`
attribute vec4 a_Position;
uniform vec2 u_CosBSinB;
void main(){
    gl_Position.x = a_Position.x * u_CosBSinB.x - a_Position.y * u_CosBSinB.y;
    gl_Position.y = a_Position.x * u_CosBSinB.y + a_Position.y * u_CosBSinB.x;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}`;

var ANGLE = 160.0;//Rotation angle

function main(){
    var canvas=document.getElementById('Canvas2');

    var gl = canvas.getContext('webgl');

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    var n = initVertexBuffers(gl);

    var radian = Math.PI * ANGLE/180.0; //convert to radian

    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);

    /*var u_CosB = gl.getUniformLocation(gl.program,'u_CosB');
    var u_SinB = gl.getUniformLocation(gl.program,'u_SinB');

    gl.uniform1f(u_CosB,cosB);
    gl.uniform1f(u_SinB,sinB);
*/
    var u_CosBSinB=gl.getUniformLocation(gl.program,'u_CosBSinB');
    gl.uniform2f(u_CosBSinB,cosB,sinB);

    gl.clearColor(0.0,0.0,0.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);
}
function initVertexBuffers(gl){
    var vertces=new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    n = 3;
    var vertexBuffer=gl.createBuffer();
    //bind buffer
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //data
    gl.bufferData(gl.ARRAY_BUFFER,vertces,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');

    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}