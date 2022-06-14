uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vUv;
varying vec3 vPos;
void main()
{

  float shadow = clamp(vPos.z / 1.0, 0.0, 1.0);

    vec2 uv = vUv;
    vec2 repeat = -vec2(12.0, 3.0);
    // uv.x -= sin(uv.y / 8.0);
    // uv = fract(uv * repeat + vec2(0.0, uTime * 0.5));

    uv = fract(uv * repeat - vec2( uTime * 0.5, 0.0));
    
    vec3 color = texture2D(uTexture, uv).rgb;
    
    // color *= vec3(uv.x, uv.y, 1.0);

    gl_FragColor = vec4(color * shadow, 1.0);

}