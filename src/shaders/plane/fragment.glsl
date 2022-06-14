uniform float uTime;
uniform sampler2D uTexture;
uniform vec3 uColor;

varying float vNoise;
varying vec2 vUv;
varying vec3 vPos;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main()
{
    float shadow = clamp(vPos.z / 0.1, 0.01, 1.1) / 0.5;
    vec2 uv = vUv;
    vec2 repeat = vec2(1.0, 4.0);
    uv = fract(uv * repeat + vec2(0.0, uTime * 0.1));
    
    vec3 color = texture2D(uTexture, uv).rgb;
    if(color.r < 0.05){
        discard;
    }

    // vec3 hsvColor = rgb2hsv(color);
    // color *= vec3(uv, 1.0);
    // color *= vec3(uv.x, uv.y, 1.0);

    gl_FragColor = vec4((color + uColor) * shadow, 1.0);
}