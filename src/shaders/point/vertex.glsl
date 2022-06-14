attribute float size;
attribute vec3 color;
attribute float fade;

varying vec2 vUv;
varying vec3 vColor;
void main()
{   
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size;
    vUv = uv;
}