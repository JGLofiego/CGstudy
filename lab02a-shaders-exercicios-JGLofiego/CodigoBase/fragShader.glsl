#ifdef GL_ES
    precision mediump float;
#endif

varying vec2 vXY;

uniform float uTime;
uniform bvec3 equation;
uniform vec2 uDim;

void main () {

  float distX, distY, distance;
  
  distX = vXY.x;
  distY = vXY.y;
  if(equation[0]){
    distance = sqrt(pow(distX, 2.0) + pow(distY, 2.0));
  } else if(equation[1]){
    distance = abs(distX) + abs(distY);
  } else {
    distance = max(abs(distX), abs(distY));
  }

  float opposite = (distance - 1.0) * -1.0;

  if(opposite < 0.6){
    gl_FragColor = vec4(0.0, 0.0, ((opposite - 0.2)* 3.0) * cos(uTime * 2.0) * 2.0, 1.0);
  } else {
    gl_FragColor = vec4((opposite - 0.6) * cos(uTime * 2.0) * 2.0, 0.0, 0.0, 1.0);
  }
  

  }