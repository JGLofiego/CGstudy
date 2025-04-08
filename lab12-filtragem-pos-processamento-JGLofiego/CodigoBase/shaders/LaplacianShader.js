import { Vector2, Vector3 } from "three";

/**
 * Full-screen textured quad shader
 */

const LaplacianShader = {
  name: "LaplacianShader",

  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
    gray: { value: false },
    color: { value: new Vector3(true, true, true) },
    apply: { value: false },
    strength: { value: 0.0 },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform float strength;
    uniform vec2 resolution;
    uniform bvec3 color;
    uniform bool gray, apply;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

            const mat3 kernel = mat3(1, 1, 1, 1, -8, 1, 1, 1, 1);

            vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);

            vec3 tx00 = texture2D(tDiffuse, vUv + texel * vec2(-1, -1)).rgb;
            vec3 tx01 = texture2D(tDiffuse, vUv + texel * vec2(-1, 0)).rgb;
            vec3 tx02 = texture2D(tDiffuse, vUv + texel * vec2(-1, 1)).rgb;
            vec3 tx10 = texture2D(tDiffuse, vUv + texel * vec2(0, -1)).rgb;
            vec3 tx11 = texture2D(tDiffuse, vUv + texel * vec2(0, 0)).rgb;
            vec3 tx12 = texture2D(tDiffuse, vUv + texel * vec2(0, 1)).rgb;
            vec3 tx20 = texture2D(tDiffuse, vUv + texel * vec2(1, -1)).rgb;
            vec3 tx21 = texture2D(tDiffuse, vUv + texel * vec2(1, 0)).rgb;
            vec3 tx22 = texture2D(tDiffuse, vUv + texel * vec2(1, 1)).rgb;

            vec3 result;

            result.r = kernel[0][0] * tx00.r + kernel[0][1] * tx01.r + kernel[0][2] * tx02.r +
                       kernel[1][0] * tx10.r + kernel[1][1] * tx11.r + kernel[1][2] * tx12.r +
                       kernel[2][0] * tx20.r + kernel[2][1] * tx21.r + kernel[2][2] * tx22.r;
            
            result.g = kernel[0][0] * tx00.g + kernel[0][1] * tx01.g + kernel[0][2] * tx02.g +
                       kernel[1][0] * tx10.g + kernel[1][1] * tx11.g + kernel[1][2] * tx12.g +
                       kernel[2][0] * tx20.g + kernel[2][1] * tx21.g + kernel[2][2] * tx22.g;

            result.b = kernel[0][0] * tx00.b + kernel[0][1] * tx01.b + kernel[0][2] * tx02.b +
                       kernel[1][0] * tx10.b + kernel[1][1] * tx11.b + kernel[1][2] * tx12.b +
                       kernel[2][0] * tx20.b + kernel[2][1] * tx21.b + kernel[2][2] * tx22.b;

            if(!color.r || result.r < 0.0){
                result.r = 0.0;
            }
            
            if(!color.g || result.g < 0.0){
                result.g = 0.0;
            }
            
            if(!color.b || result.b < 0.0){
                result.b = 0.0;
            }

            vec3 colorFinal;

            if(gray){
              float sum = 0.0;
              float num = 0.0;
              if(color.r){
                sum += result.r;
                num += 1.0;
              }
              if(color.g){
                sum += result.g;
                num += 1.0;
              }
              if(color.b){
                sum += result.b;
                num += 1.0;
              }

              if(num == 0.0){
                colorFinal = vec3(sum);
              } else {
                colorFinal = vec3(sum / num);
              }
              
            } else {
			        colorFinal = result;
            }

            if(apply){
  				    gl_FragColor = vec4(tx11 + strength * colorFinal, 1.0);
			      } else {
  				    gl_FragColor = vec4(colorFinal, 1.0);
			      }

		}`,
};

export { LaplacianShader };
