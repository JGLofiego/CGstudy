#ifdef GL_ES
    precision mediump float;
#endif

varying vec2 vXY;

uniform float uTime;
uniform vec2 uDim;

void main () {

  gl_FragColor = vec4((vXY.x * 2.0 + vXY.y * 3.0), 0.7, 0.2, 1.0);;

  }