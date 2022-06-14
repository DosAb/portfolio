uniform float uTime;
uniform float uTimeFrequency;
uniform float uDistortionFrequency;
uniform float uDistortionStrength;

varying float vNoise;
varying vec2 vUv;
varying vec3 vPos;

#pragma glslify: perlin = require('../partials/perlin3d.glsl)

void main()
{
    float noise = perlin(vec3(position.xy * uDistortionFrequency, uTime * uTimeFrequency)) * uDistortionStrength;
    vec3 newPos = position;
    newPos += normal * noise;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    vNoise = noise;
    vUv = uv;
    vPos = newPos;
}