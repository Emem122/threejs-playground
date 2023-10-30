varying vec2 vUv;
uniform float uTime;

void main() {

    gl_FragColor = vec4(vec3(vUv.x), 1.0);
}