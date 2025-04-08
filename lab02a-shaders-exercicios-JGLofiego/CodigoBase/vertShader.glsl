
uniform float uTime;

varying vec2 vXY;

void main() {	

  vXY = position.xy;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}