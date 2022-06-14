#define M_PI 3.1415926535897932384626433832795

uniform float uTime;
uniform float uSpeed;


varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPos;


void main()
{   
    float t = uTime;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vNormal = normal;
    vPos = position;
    vUv = uv;
}