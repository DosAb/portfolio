varying vec3 vNormal;
varying vec2 vUv;
varying float vPerlinStrength;

uniform vec3 uOscilation;
uniform float uTime;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}    

void main()
{

    // gl_FragColor = vec4(vColor, 1.0);
    float temp = vPerlinStrength + 0.8;
    temp *= 0.5;
    // vec3 brightness = vec3(1.0,0.4,0.00);
    // vec3 contrast = vec3(0.4,0.8,0.0);
    // vec3 oscilation = vec3(0.5,0.3,0.9);
    // vec3 phase = vec3(0.9,0.6,0.9);
    vec3 brightness = vec3(0.1,0.0,0.4);
    vec3 contrast = vec3(0.3,0.0,0.5);
    vec3 oscilation = uOscilation;
    vec3 phase = vec3(0.3,0.0,0.0);

    vec3 color = cosPalette(temp, brightness, contrast, oscilation, phase);

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(vec3(color.b, color.b, color.b), 1.0);
}