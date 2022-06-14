#define M_PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

varying vec3 vNormal;
varying vec2 vUv;
varying float vDistortion;


#pragma glslify: perlin3d = require('../partials/perlin3d.glsl');
#pragma glslify: perlin4d = require('../partials/perlin4d.glsl');
#pragma glslify: rotateY = require('../partials/rotateY.glsl');



void main()
{   
    float t = uTime;
    float distortion = perlin4d(vec4(position * uNoiseDensity, t * uSpeed)) * uNoiseStrength;

    vec3 pos = position + (normal * distortion);
    float angle = cos(uv.y * uFrequency + t * 0.5) * uAmplitude;
    pos = rotateY(pos, angle);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vDistortion = distortion;
    vNormal = normal;
    vUv = uv;
}