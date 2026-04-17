// Circle Packing Growth
// Grow until collision

uniform float iTime;
uniform vec2 iResolution;

#define NUM_CIRCLES 15

float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.03);

    // Pre-computed circle positions (would grow in real app)
    vec2 positions[NUM_CIRCLES];
    float radii[NUM_CIRCLES];

    for (int i = 0; i < NUM_CIRCLES; i++) {
        float fi = float(i);
        positions[i] = vec2(
            (hash(fi * 3.7) - 0.5) * 1.6,
            (hash(fi * 7.1) - 0.5) * 1.2
        );
        // Grow over time then stop
        float targetR = 0.05 + hash(fi + 50.0) * 0.08;
        radii[i] = min(targetR, t * 0.05 + hash(fi) * 0.02);

        // Collision check (simplified)
        for (int j = 0; j < i; j++) {
            float d = length(positions[i] - positions[j]);
            float minD = radii[i] + radii[j];
            if (d < minD && d > 0.001) {
                radii[i] = min(radii[i], d - radii[j]);
            }
        }
    }

    // Draw circles
    for (int i = 0; i < NUM_CIRCLES; i++) {
        float dist = length(uv - positions[i]);
        float r = radii[i];

        // Filled circle
        float circle = 1.0 - smoothstep(r - 0.005, r, dist);

        // Outline
        float outline = smoothstep(r - 0.008, r - 0.005, dist) 
                      * (1.0 - smoothstep(r, r + 0.003, dist));

        vec3 color = mix(
            vec3(0.2, 0.5, 0.8),
            vec3(0.8, 0.4, 0.3),
            hash(float(i) + 100.0)
        );

        col += color * circle * 0.25;
        col += vec3(0.6, 0.8, 1.0) * outline * 0.5;
    }

    gl_FragColor = vec4(col, 1.0);
}