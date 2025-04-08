import { Vector2, Vector3 } from "three";

/**
 * Sobel Edge Detection (see https://youtu.be/uihBwtPIBxM)
 *
 * As mentioned in the video the Sobel operator expects a grayscale image as input.
 *
 */

const SobelShader = {
  name: "SobelShader",

  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
    gray: { value: false },
    both: { value: true },
    x_component: { value: false },
    y_component: { value: false },
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

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		uniform bvec3 color;
		uniform bool both, x_component, y_component, gray, apply;
		uniform float strength;
		varying vec2 vUv;

		void main() {

			vec2 texel = vec2( 1.0 / resolution.x, 1.0 / resolution.y );

			const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 ); // x direction kernel
			const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 ); // y direction kernel

			vec3 tx0y0 = texture2D( tDiffuse, vUv + texel * vec2( -1, -1 ) ).rgb;
			vec3 tx0y1 = texture2D( tDiffuse, vUv + texel * vec2( -1,  0 ) ).rgb;
			vec3 tx0y2 = texture2D( tDiffuse, vUv + texel * vec2( -1,  1 ) ).rgb;

			vec3 tx1y0 = texture2D( tDiffuse, vUv + texel * vec2(  0, -1 ) ).rgb;
			vec3 tx1y1 = texture2D( tDiffuse, vUv + texel * vec2(  0,  0 ) ).rgb;
			vec3 tx1y2 = texture2D( tDiffuse, vUv + texel * vec2(  0,  1 ) ).rgb;

			vec3 tx2y0 = texture2D( tDiffuse, vUv + texel * vec2(  1, -1 ) ).rgb;
			vec3 tx2y1 = texture2D( tDiffuse, vUv + texel * vec2(  1,  0 ) ).rgb;
			vec3 tx2y2 = texture2D( tDiffuse, vUv + texel * vec2(  1,  1 ) ).rgb;

		// gradient value in x direction

  			vec3 valueGx;

			valueGx.r = Gx[0][0] * tx0y0.r + Gx[1][0] * tx1y0.r + Gx[2][0] * tx2y0.r +
						Gx[0][1] * tx0y1.r + Gx[1][1] * tx1y1.r + Gx[2][1] * tx2y1.r +
						Gx[0][2] * tx0y2.r + Gx[1][2] * tx1y2.r + Gx[2][2] * tx2y2.r;

			valueGx.g = Gx[0][0] * tx0y0.g + Gx[1][0] * tx1y0.g + Gx[2][0] * tx2y0.g +
						Gx[0][1] * tx0y1.g + Gx[1][1] * tx1y1.g + Gx[2][1] * tx2y1.g +
						Gx[0][2] * tx0y2.g + Gx[1][2] * tx1y2.g + Gx[2][2] * tx2y2.g;
			
			valueGx.b = Gx[0][0] * tx0y0.b + Gx[1][0] * tx1y0.b + Gx[2][0] * tx2y0.b +
						Gx[0][1] * tx0y1.b + Gx[1][1] * tx1y1.b + Gx[2][1] * tx2y1.b +
						Gx[0][2] * tx0y2.b + Gx[1][2] * tx1y2.b + Gx[2][2] * tx2y2.b;

		// gradient value in y direction

  			vec3 valueGy;

			valueGy.r = Gy[0][0] * tx0y0.r + Gy[1][0] * tx1y0.r + Gy[2][0] * tx2y0.r +
						Gy[0][1] * tx0y1.r + Gy[1][1] * tx1y1.r + Gy[2][1] * tx2y1.r +
						Gy[0][2] * tx0y2.r + Gy[1][2] * tx1y2.r + Gy[2][2] * tx2y2.r;

			valueGy.g = Gy[0][0] * tx0y0.g + Gy[1][0] * tx1y0.g + Gy[2][0] * tx2y0.g +
						Gy[0][1] * tx0y1.g + Gy[1][1] * tx1y1.g + Gy[2][1] * tx2y1.g +
						Gy[0][2] * tx0y2.g + Gy[1][2] * tx1y2.g + Gy[2][2] * tx2y2.g;
			
			valueGy.b = Gy[0][0] * tx0y0.b + Gy[1][0] * tx1y0.b + Gy[2][0] * tx2y0.b +
						Gy[0][1] * tx0y1.b + Gy[1][1] * tx1y1.b + Gy[2][1] * tx2y1.b +
						Gy[0][2] * tx0y2.b + Gy[1][2] * tx1y2.b + Gy[2][2] * tx2y2.b;

		// magnitute of the total gradient

  			float r, g, b;

			if(both){
  				r = sqrt( ( valueGx.r * valueGx.r ) + ( valueGy.r * valueGy.r ) );
				g = sqrt( ( valueGx.g * valueGx.g ) + ( valueGy.g * valueGy.g ) );
				b = sqrt( ( valueGx.b * valueGx.b ) + ( valueGy.b * valueGy.b ) );
			} else if(x_component){
  				r = sqrt(valueGx.r * valueGx.r);
				g = sqrt(valueGx.g * valueGx.g);
				b = sqrt(valueGx.b * valueGx.b);
			} else if(y_component){
  				r = sqrt(valueGy.r * valueGy.r);
				g = sqrt(valueGy.g * valueGy.g);
				b = sqrt(valueGy.b * valueGy.b);
			}

			if(!color.r){
				r = 0.0;
			}

			if(!color.g){
				g = 0.0;
			}

			if(!color.b){
				b = 0.0;
			}

			vec3 colorFinal;

			if(gray){
              float sum = 0.0;
              float num = 0.0;
              if(color.r){
                sum += r;
                num += 1.0;
              }
              if(color.g){
                sum += g;
                num += 1.0;
              }
              if(color.b){
                sum += b;
                num += 1.0;
              }

			  vec3 bwResult;

              if(num == 0.0){
                colorFinal = vec3(sum);
              } else {
                colorFinal = vec3(sum / num);
              }
              
            } else {
  				colorFinal = vec3( r, g, b );
            }

			if(apply){
  				gl_FragColor = vec4(tx1y1 + strength * colorFinal, 1.0);
			} else {
  				gl_FragColor = vec4(colorFinal, 1.0);
			}

		}`,
};

export { SobelShader };
