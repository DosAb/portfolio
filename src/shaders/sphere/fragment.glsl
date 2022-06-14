uniform float uTime;
uniform vec3 uPhase;
varying vec2 vUv;
varying float vDistortion;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}       

void main()
{
    float distort = vDistortion * 6.0;
    distort += 0.4;

    //palette
    vec3 brightness = vec3(0.4, 0.4, 0.4);
    vec3 contrast = vec3(0.4, 0.4, 0.4);
    vec3 oscilation = vec3(1.0, 1.0, 1.0);
    vec3 phase = uPhase;

    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
    // if(color.r < 0.1){
    //     discard;
    // }

    gl_FragColor = vec4(color, 1.0);

}