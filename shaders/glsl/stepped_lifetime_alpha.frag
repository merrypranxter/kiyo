// Stepped Lifetime Alpha
// Binary-then-linear fade curve

uniform float iTime;
uniform vec2 iResolution;

#define NUM_PARTICLES 20

float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.03);

    for (int i = 0; i < NUM_PARTICLES; i++) {
        float fi = float(i);
        float spawnTime = fi * 0.3;
        float age = mod(t - spawnTime, 6.0);
        float life = age / 6.0;

        // Stepped alpha: full for first half, then steep drop
        float alpha;
        if (life < 0.5) {
            alpha = 1.0;
        } else {
            alpha = 1.0 - smoothstep(0.5, 1.0, life);
        }

        // Position
        float angle = fi * 2.4 + age * 0.5;
        float radius = 0.2 + fi * 0.03;
        vec2 pos = vec2(cos(angle) * radius, sin(angle * 0.7) * radius * 0.6);

        // Size grows then holds
        float size = 0.02 + life * 0.01;

        float dist = length(uv - pos);
        float particle = 1.0 - smoothstep(0.0, size, dist);

        // Visual indicator of step
        vec3 color = (life < 0.5) 
            ? vec3(0.8, 0.9, 1.0)  // Full phase: bright
            : vec3(0.3, 0.5, 0.8); // Fade phase: dim

        col += color * particle * alpha * 0.6;
    }

    // Step boundary visualization
    col += vec3(0.1, 0.2, 0.3) * exp(-length(uv) * 2.0) * 0.1;

    gl_FragColor = vec4(col, 1.0);
}