varying float vElevation;
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

void main() {
    float mixStrength = (vElevation + 0.2) * 1.0;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);
}