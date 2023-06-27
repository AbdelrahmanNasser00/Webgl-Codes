var VSHADER_SOURCE=`
void main(){
gl_Position=vec4(0.0,0.0,0.0,1.0);
gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
gl_FragColor=vec4(1.0,0.0,0.0,1.0);  //color of point
}`;

function main(){
    var canvas = document.getElementById('webgl');
    if(!canvas){
        console.log("Failed to retrieve the <canvas> element");
        return;
    }
    var gl=canvas.getContext('webgl');
    
    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    
    gl.clearColor(0.5,0.9,0.5,1.0);  //canvas color
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,1);    
}