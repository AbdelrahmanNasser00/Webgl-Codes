var VSHADER_SOURCE=`
attribute vec4 a_Position;
void main(){
    gl_Position=a_Position;
    gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
    gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);
}`;
function main(){
    var canvas=document.getElementById('Canvas2');
    var gl =getWebGLContext(canvas);

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');

    gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);

    gl.clearColor(0.0,0.0,0.0,1.0);
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,1);
}