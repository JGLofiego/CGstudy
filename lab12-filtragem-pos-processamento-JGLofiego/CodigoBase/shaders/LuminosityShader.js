import { Vector3 } from "three";
/**
 * Full-screen textured quad shader
 */

const LuminosityShader = {
  name: "LuminosityShader",

  uniforms: {
    tDiffuse: { value: null },
    gray: { value: true },
    gamma: { value: new Vector3(1.0, 1.0, 1.0) },
  },

  vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

  fragmentShader: /* glsl */ `

		uniform bool oneChannel;
		uniform vec3 gamma;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

  			float r, g, b;

			vec4 texel = texture2D( tDiffuse, vUv );

			r = pow(texel.x, gamma.r);
			g = pow(texel.y, gamma.g);
			b = pow(texel.z, gamma.b);
			
			gl_FragColor = vec4( r, g, b, 1.0 );

		}`,
};

export { LuminosityShader };
