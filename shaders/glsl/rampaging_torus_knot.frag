// Rampaging Torus Knot
// Chaotic torus parameters

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265
#define TAU 6.2831853

float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.01, 0.03);

    // Chaotic parameters
    float theta = t * 0.3;
    float p = 2.0 + sin(theta * 0.5) * 1.5 + cos(theta * 0.3) * 0.5;
    float q = 3.0 + cos(theta * 0.3) * 1.0;

    // Draw the knot as points
    for (float ta = 0.0; ta < TAU * 3.0; ta += 0.02) {
        float r = cos(q * ta) + 2.0;
        float x = r * cos(p * ta);
        float y = r * sin(p * ta);
        float z = -sin(q * ta);

        // Project to 2D with rotation
        float rotY = t * 0.2;
        float x2 = x * cos(rotY) + z * sin(rotY);
        float z2 = -x * sin(rotY) + z * cos(rotY);

        // Perspective
        float persp = 1.0 / (z2 * 0.3 + 3.0);
        vec2 pos = vec2(x2, y) * persp * 0.25;

        float dist = length(uv - pos);
        float point = 1.0 - smoothstep(0.0, 0.008, dist);

        // Color by parameter
        float hue = ta / (TAU * 3.0);
        vec3 color = mix(
            vec3(0.9, 0.2, 0.4),
            vec3(0.2, 0.4, 0.9),
            sin(hue * PI) * 0.5 + 0.5
        );

        col += color * point * 0.3;
    }

    // Glow from center
    col += vec3(0.1, 0.05, 0.1) * exp(-length(uv) * 2.0) * 0.2;

    gl_FragColor = vec4(col, 1.0);
}