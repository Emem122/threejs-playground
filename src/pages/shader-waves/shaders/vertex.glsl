uniform float uTime;

varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * 1.0 + uTime * 0.5) * sin(modelPosition.y * 0.6 + uTime * 0.2) * cos(modelPosition.z * 0.8 + uTime * 0.6);

    modelPosition.y += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // varyings
    vElevation = elevation;
}