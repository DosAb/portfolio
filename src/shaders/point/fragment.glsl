uniform sampler2D uTexture;
varying vec3 vColor;
varying vec2 vUv;
void main()
{
    vec2 uv = vUv;
    vec4 color = vec4(vColor, 1.0);
    vec4 texture = vec4(texture2D(uTexture, uv));
    gl_FragColor = texture * color;

}