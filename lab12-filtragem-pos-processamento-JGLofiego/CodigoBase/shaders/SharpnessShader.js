import { Vector2, Vector3 } from "three";

/**
 * Full-screen textured quad shader
 */

const SharpnessShader = {
  name: "SharpnessShader",

  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
    nitidez: { value: new Vector3(1.0) },
    gray: { value: false },
  },

  vertexShader: /* glsl */ `
  
          varying vec2 vUv;
  
          void main() {
  
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  
          }`,

  fragmentShader: /* glsl */ `
  
          uniform vec2 resolution;
          uniform sampler2D tDiffuse;
          uniform vec3 nitidez;
  
          varying vec2 vUv;
  
          void main() {

              vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);

              mat3 kernel = mat3(1, 1, 1, 1, 1, 1, 1, 1, 1);

              vec3 tx00 = texture2D(tDiffuse, vUv + texel * vec2(-1, -1)).rgb;
              vec3 tx01 = texture2D(tDiffuse, vUv + texel * vec2(-1, 0)).rgb;
              vec3 tx02 = texture2D(tDiffuse, vUv + texel * vec2(-1, 1)).rgb;
              vec3 tx10 = texture2D(tDiffuse, vUv + texel * vec2(0, -1)).rgb;
              vec3 tx11 = texture2D(tDiffuse, vUv + texel * vec2(0, 0)).rgb;
              vec3 tx12 = texture2D(tDiffuse, vUv + texel * vec2(0, 1)).rgb;
              vec3 tx20 = texture2D(tDiffuse, vUv + texel * vec2(1, -1)).rgb;
              vec3 tx21 = texture2D(tDiffuse, vUv + texel * vec2(1, 0)).rgb;
              vec3 tx22 = texture2D(tDiffuse, vUv + texel * vec2(1, 1)).rgb;

              float blurR = 1.0/9.0 * (kernel[0][0] * tx00.r + kernel[0][1] * tx01.r + kernel[0][2] * tx02.r +
                                       kernel[1][0] * tx10.r + kernel[1][1] * tx11.r + kernel[1][2] * tx12.r +
                                       kernel[2][0] * tx20.r + kernel[2][1] * tx21.r + kernel[2][2] * tx22.r);
              
              float blurG = 1.0/9.0 * (kernel[0][0] * tx00.g + kernel[0][1] * tx01.g + kernel[0][2] * tx02.g +
                                       kernel[1][0] * tx10.g + kernel[1][1] * tx11.g + kernel[1][2] * tx12.g +
                                       kernel[2][0] * tx20.g + kernel[2][1] * tx21.g + kernel[2][2] * tx22.g);
              
              float blurB = 1.0/9.0 * (kernel[0][0] * tx00.b + kernel[0][1] * tx01.b + kernel[0][2] * tx02.b +
                                       kernel[1][0] * tx10.b + kernel[1][1] * tx11.b + kernel[1][2] * tx12.b +
                                       kernel[2][0] * tx20.b + kernel[2][1] * tx21.b + kernel[2][2] * tx22.b);
                                         
              vec3 result = vec3(nitidez.r * (tx11.r - blurR), nitidez.g * (tx11.g - blurG), nitidez.b * (tx11.b - blurB));
              
              gl_FragColor = vec4((tx11 +  result), 1.0);
  
  
          }`,
};

export { SharpnessShader };
