varying vec2 vUv;
uniform float uTime;

float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

// Random factors for more variation
    float randomFreq1 = .5 + random(modelPosition.xy) * 2.; // Adjust the multiplier for frequency variation
    float randomFreq2 = 0.5 + random(modelPosition.zx) * 2.0;

    float randomAmp1 = random(modelPosition.yz) * 1.0; // Adjust the multiplier for amplitude variation
    float randomAmp2 = random(modelPosition.xz) * 1.0;

    float randomOffset1 = random(modelPosition.zy) * 1. * uTime; // Adjust the multiplier for offset variation
    float randomOffset2 = random(modelPosition.xy) * 1. * uTime;

    // Additional random sine and cosine waves
    float elevation = sin((modelPosition.x * 15.) * randomFreq1 - uTime + randomOffset1) * 0.1 * randomAmp1;
    elevation += cos((modelPosition.y * 12.) - uTime * randomFreq2 + randomOffset2) * 1.2 * 0.1 * randomAmp2;

    modelPosition.z += elevation;

    modelPosition.z += sin(modelPosition.x * 2. - uTime) * 0.1 * randomAmp1;
    modelPosition.z += sin(modelPosition.y * 5. - uTime) * 0.1 * randomAmp2;

    // float elevation = sin((modelPosition.x * 15.) * .8 - uTime) * 0.1;
    // elevation += cos((modelPosition.y * 12.) - uTime * 1.2) * 1.2 * 0.1;

    // modelPosition.z += elevation;

    // modelPosition.z += sin(modelPosition.x * 2. - uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * 5. - uTime) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // varyings
    vUv = uv;
}