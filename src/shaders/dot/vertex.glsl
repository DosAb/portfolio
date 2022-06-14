attribute float size;
uniform float uTime;
varying vec2 vUv;
varying float vDistortion;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl');
#pragma glslify: rotateY = require('../partials/rotateY.glsl');
#pragma glslify: noise3d = require('../partials/noise3d.glsl');

void main()
{   
    float t = uTime;
    float distortion = noise3d(vec3(position.xy * 5.5, t * 0.1)) * 0.4;
    // float secondDistortion = noise3d(vec3(position.xy * 3.0, t * 0.2 )) * 0.3;
    // distortion += secondDistortion;
    vec3 pos = position + (normal * distortion);
    // float angle = cos(uv.y * 2.0 + uTime * 0.5) * 0.2;
    // pos = rotateY(pos, angle);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size;
    vDistortion = distortion;
    vUv = uv;
}