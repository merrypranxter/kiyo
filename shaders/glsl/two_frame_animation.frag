// Two Frame Animation
// Flip between 2 states

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // Two-frame: hard cut every 0.25 seconds
    bool frameA = mod(floor(iTime * 4.0), 2.0) < 0.5;

    vec3 col;

    if (frameA) {
        // State A: Blue circles
        col = vec3(0.05, 0.05, 0.2);
        for (int i = 0; i < 5; i++) {
            float fi = float(i);
            vec2 pos = vec2(
                cos(fi * 1.5) * 0.3,
                sin(fi * 1.2) * 0.3
            );
            float dist = length(uv - pos);
            float c = 1.0 - smoothstep(0.0, 0.1, dist);
            col += vec3(0.2, 0.4, 1.0) * c * 0.5;
        }
    } else {
        // State B: Red grid
        col = vec3(0.2, 0.02, 0.02);
        float grid = abs(fract(uv.x * 8.0) - 0.5) + abs(fract(uv.y * 8.0) - 0.5);
        float gridLine = 1.0 - smoothstep(0.0, 0.05, grid - 0.45);
        col += vec3(1.0, 0.2, 0.1) * gridLine * 0.3;

        // Different positions entirely
        for (int i = 0; i < 3; i++) {
            float fi = float(i);
            vec2 pos = vec2(
                sin(fi * 2.0) * 0.5,
                cos(fi * 1.8) * 0.4
            );
            float dist = length(uv - pos);
            float sq = max(abs(uv.x - pos.x), abs(uv.y - pos.y));
            float s = 1.0 - smoothstep(0.0, 0.08, sq);
            col += vec3(1.0, 0.5, 0.1) * s * 0.4;
        }
    }

    // No interpolation - hard cut
    gl_FragColor = vec4(col, 1.0);
}

// Note: The cut is instantaneous at the shader level.
// In OF, you'd use two completely different draw functions.