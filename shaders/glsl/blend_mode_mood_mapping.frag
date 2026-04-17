// Blend Mode Mood Mapping
// ADD=ethereal, SUBTRACT=aggressive

uniform float iTime;
uniform vec2 iResolution;

float circle(vec2 uv, vec2 pos, float r) {
    return 1.0 - smoothstep(r * 0.9, r, length(uv - pos));
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02);

    // Ethereal mode (ADD simulation)
    vec3 ethereal = vec3(0.0);
    for (int i = 0; i < 8; i++) {
        float fi = float(i);
        vec2 pos = vec2(
            cos(t * 0.5 + fi * 1.3) * 0.4,
            sin(t * 0.3 + fi * 1.1) * 0.3
        );
        float c = circle(uv, pos, 0.08 + fi * 0.01);
        vec3 color = vec3(0.2 + fi * 0.05, 0.5, 0.8);
        ethereal += color * c * 0.3; // ADD accumulation
    }

    // Aggressive mode (SUBTRACT simulation)
    vec3 aggressive = vec3(1.0); // Start white
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec2 pos = vec2(
            cos(t * 1.2 + fi * 2.1) * 0.3,
            sin(t * 0.8 + fi * 1.7) * 0.3
        );
        float c = circle(uv, pos, 0.1);
        aggressive -= vec3(0.3, 0.1, 0.05) * c * 0.5; // SUBTRACT
    }

    // Mix between modes
    float modeMix = sin(t * 0.2) * 0.5 + 0.5;

    // When in ethereal mode, glow
    // When in aggressive mode, dark cuts
    col = mix(ethereal, aggressive * 0.3, modeMix);
    col += vec3(0.5, 0.2, 0.1) * modeMix * 0.2; // warm tint in aggressive

    gl_FragColor = vec4(col, 1.0);
}