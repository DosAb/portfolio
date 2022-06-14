#define M_PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uDistortionFrequency;
uniform float uDistortionStrength;
uniform float uDisplacementFrequency;
uniform float uDisplacementStrength;
uniform float uTimeFrequency;


varying float vPerlinStrength;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vColor;


#pragma glslify: perlin3d = require('../partials/perlin3d.glsl');
#pragma glslify: perlin4d = require('../partials/perlin4d.glsl');


vec4 getDisplacedPosition(vec3 _position)
{
    vec3 displacementPosition = _position;
    displacementPosition += perlin4d(vec4(displacementPosition * uDistortionFrequency, uTime * uTimeFrequency)) * uDistortionStrength;

    float perlinStrength = perlin4d(vec4(displacementPosition * uDisplacementFrequency, uTime * uTimeFrequency)); 

    vec3 displacedPosition = _position;
    displacedPosition += normalize(_position) * perlinStrength * uDisplacementStrength;

    return vec4(displacedPosition, perlinStrength);
}



void main()
{   
    //displacement
    // vec4 displacedPosition = getDisplacedPosition(position);
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition.xyz, 1.0);


    vec4 displacedPosition = getDisplacedPosition(position);
    // vec4 viewPosition = viewMatrix * vec4(displacedPosition.xyz, 1.0);
    // gl_Position = projectionMatrix * viewPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition.xyz, 1.0);
    vPerlinStrength = displacedPosition.a;
    vNormal = normal;
    vUv = uv;


}