// Alternate Torus Flip
// Inside-out surface

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265
#define TAU 6.2831853

float snoise(vec2 v) {
    return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02);

    // Torus projection
    float majorR = 0.4;
    float minorR = 0.15;

    // Multiple views of the torus
    for (int view = 0; view < 2; view++) {
        float flip = float(view) * PI;

        for (float ua = 0.0; ua < TAU; ua += 0.05) {
            for (float va = 0.0; va < TAU; va += 0.1) {
                // Torus parametric
                float x = (majorR + minorR * cos(va + flip)) * cos(ua);
                float y = (majorR + minorR * cos(va + flip)) * sin(ua);
                float z = minorR * sin(va + flip);

                // Rotate
                float ry = t * 0.3;
                float x2 = x * cos(ry) + z * sin(ry);
                float z2 = -x * sin(ry) + z * cos(ry);

                // Perspective
                float p = 1.0 / (z2 + 2.0);
                vec2 pos = vec2(x2, y) * p * 0.5;

                float dist = length(uv - pos);
                float point = 1.0 - smoothstep(0.0, 0.006, dist);

                // Different color for flipped
                vec3 color = (view == 0) 
                    ? vec3(0.3, 0.6, 0.9)
                    : vec3(0.9, 0.3, 0.5);

                col += color * point * 0.15;
            }
        }
    }

    gl_FragColor = vec4(col, 1.0);
}