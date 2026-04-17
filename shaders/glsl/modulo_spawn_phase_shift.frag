// Modulo Spawn Phase Shift
// Rhythmic particle birth with alternating colors

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265
#define TAU 6.2831853

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.03);

    // Ripple rings with modulo spawn
    for (int i = 0; i < 8; i++) {
        float fi = float(i);
        float phase = mod(t * 3.0 + fi * 0.5, 4.0);
        float radius = phase * 0.15;
        float alpha = 1.0 - phase / 4.0;

        float d = abs(length(uv) - radius);
        float ring = 1.0 - smoothstep(0.0, 0.008, d);

        // Even/odd color alternation
        vec3 color = (i % 2 == 0) 
            ? vec3(0.3, 0.8, 1.0)  // cyan
            : vec3(1.0, 0.3, 0.6); // magenta

        col += color * ring * alpha * 0.5;
    }

    // Central glow
    float centerDist = length(uv);
    col += vec3(0.1, 0.3, 0.5) * exp(-centerDist * 3.0) * 0.3;

    gl_FragColor = vec4(col, 1.0);
}