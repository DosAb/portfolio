uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;
varying float vDistortion;
void main()
{
    float perlin = vDistortion + 0.5;
    perlin *= 1.5;

    vec2 uv = vUv;
    vec2 repeat = -vec2(60.0, 30.0);
    // uv.x -= sin(uv.y / 1.0);
    // uv = fract(uv * repeat + vec2(0.0, uTime * 0.5));

    uv = fract(uv * repeat - vec2( uTime * 2.5, 0.0));
    
    vec3 color = texture2D(uTexture, uv).rgb;
    if(color.r < 0.5){
        discard;
    }
    // color *= vec3(uv, 1.0);
    // color *= vec3(uv.x, uv.y, 1.0);

    gl_FragColor = vec4(color * vec3(perlin), 1.0);

}