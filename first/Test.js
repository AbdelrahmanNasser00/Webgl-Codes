var VSHADER_SOURCE=`
attribute vec4 a_Position;
void main(){
gl_Position=a_Position;
gl_PointSize=10.0;
}`;
var FSHADER_SOURCE=`
void main(){
gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}`;

function main(){
var canvas=document.getElementById('Canvas2');
if(!canvas){
    console.log("can't retrieve <canvas> element");
    return;
}
var gl = canvas.getContext('webgl');

initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

var a_Position = gl.getAttribLocation(gl.program,'a_Position');

gl.clearColor(0.0,0.0,0.0,1.0);

gl.clear(gl.COLOR_BUFFER_BIT);
canvas.onmousedown=function(ev){click(ev,gl,canvas,a_Position)};

}

var g_points=[];
function click(ev,gl,canvas,a_Position){

var x=0.8;var y=0.8;

for(var i=0;i<9;i++){
    g_points.push([x,y]);
    x-=0.2; y-=0.2;
}
x = -0.8; y = 0.8;
for(var i = 9 ; i < 18 ; i++){
    g_points.push([x,y]);
    y-=0.2; x+=0.2;
}

gl.clear(gl.COLOR_BUFFER_BIT);

for(var i=0;i<18;i++){
    var xy=g_points[i];
    gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
    gl.drawArrays(gl.POINTS,0,1);
    
}

}
/* var g_points = [];
    function click(ev , gl , canvas , a_Position){
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        x= ((x-rect.left)-canvas.height/2)/(canvas.height/2);
        y= (canvas.width/2-(y-rect.top))/(canvas.width/2);

        g_points.push([x,y]);

        gl.clear(gl.COLOR_BUFFER_BIT);

        var len=g_points.length;
        for(var i = 0; i < len; i++){
            var xy = g_points[i];
            gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
            gl.drawArrays(gl.POINTS,0,1);
        }
    }
    */