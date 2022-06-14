uniform float uTime;
uniform sampler2D uTexture;


varying vec2 vUv;
varying float vPerlin;
varying vec3 vPos;
void main()
{
  float perlin = vPerlin + 0.5;
  perlin *= 2.0;

  vec2 centeredUv = vUv - 0.5;
  float distanceToCenter = length(centeredUv);


  vec2 repeat = vec2(1.0, 1.0);
  vec2 uv = vUv;
  // uv.x += sin(uv.y / 10.0);
  // uv.xy = -uv.x
  uv = fract(uv * repeat + vec2( uTime * 0.04, 1.0));
  
  vec3 color = texture2D(uTexture, uv).rgb;
  if(color.r < 0.5){
    discard;
  }

  // color *= vec3(uv.x, uv.y, 1.0);

  gl_FragColor = vec4(vec3(perlin) * color, 1.0);
  // gl_FragColor = vec4(1.0 -(vec3(perlin) *color), 1.0);

}