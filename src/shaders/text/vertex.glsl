#define M_PI 3.1415926535897932384626433832795

uniform float uTime;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPos;
varying float vPerlin;

// #pragma glslify: perlin2d = require('../partials/perlin2d.glsl');
#pragma glslify: perlin3d = require('../partials/perlin3d.glsl');
#pragma glslify: perlin4d = require('../partials/perlin4d.glsl');
#pragma glslify: rotateY = require('../partials/rotateY.glsl');


void main()
{   
    float t = uTime;
    float perlin = perlin3d(vec3(position.xy  * 0.5, uTime * 0.5)) * 0.5;

    vec3 newPosition = position;
    newPosition += normal * perlin;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    
    vNormal = normal;
    vPos = newPosition;
    vUv = uv;
    vPerlin = perlin;
}