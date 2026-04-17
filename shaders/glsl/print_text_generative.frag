// Generative Text
// Text as geometry source

uniform float iTime;
uniform vec2 iResolution;

// Simple digit patterns
float digit(vec2 uv, int n) {
    uv = uv * 2.0 - 1.0;
    float d = 1.0;

    if (n == 0) {
        d = abs(length(uv) - 0.7) - 0.3;
    } else if (n == 1) {
        d = abs(uv.x) - 0.15;
        d = min(d, uv.y + 0.7);
    } else if (n == 2) {
        d = min(abs(uv.y - 0.5), min(abs(uv.y), abs(uv.y + 0.5)));
        d = min(d, abs(uv.x) - 0.5);
    }
    // Simplified - just use boxes for demo
    float box = max(abs(uv.x) - 0.4, abs(uv.y) - 0.6);
    return box;
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02);

    // "PRINT" letter forms using blocks
    vec2 p = uv;
    p.x += 0.6;

    // P
    float letterP = max(abs(p.x) - 0.08, abs(p.y) - 0.15);
    letterP = min(letterP, length(vec2(p.x - 0.05, p.y - 0.05)) - 0.08);
    letterP = min(letterP, abs(p.x + 0.02));

    // R
    vec2 pR = p - vec2(0.25, 0);
    float letterR = max(abs(pR.x) - 0.08, abs(pR.y) - 0.15);
    letterR = min(letterR, length(vec2(pR.x - 0.05, pR.y - 0.05)) - 0.08);
    letterR = min(letterR, abs(pR.x - pR.y * 0.5) - 0.04);

    // Deform the letters
    p.y += sin(p.x * 8.0 + t * 2.0) * 0.05;

    // Outline glow
    float textDist = min(letterP, letterR);
    float glow = 1.0 - smoothstep(0.0, 0.05, textDist);
    col += vec3(0.9, 0.3, 0.1) * glow * 0.5;

    // Particles from text edges
    for (int i = 0; i < 30; i++) {
        float fi = float(i);
        float px = -0.5 + hash(fi) * 1.2;
        float py = -0.2 + hash(fi + 100.0) * 0.4;

        // Particles flow upward
        py += mod(t * 0.2 + fi * 0.05, 0.8);

        vec2 pPos = vec2(px, py);
        float dist = length(uv - pPos);
        float particle = 1.0 - smoothstep(0.0, 0.01, dist);

        col += vec3(1.0, 0.6, 0.2) * particle * 0.3;
    }

    gl_FragColor = vec4(col, 1.0);
}

// In OF: use ofTrueTypeFont::getStringAsPath() then manipulate the outline vertices