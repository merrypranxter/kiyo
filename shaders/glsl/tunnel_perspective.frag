// Tunnel Perspective
// Z-depth sprite scaling

uniform float iTime;
uniform vec2 iResolution;

#define NUM_OBJECTS 30

float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.01, 0.01, 0.02);

    // Tunnel walls
    for (int i = 0; i < NUM_OBJECTS; i++) {
        float fi = float(i);
        float z = fract(t * 0.3 + fi / float(NUM_OBJECTS));
        float scale = 1.0 / (z * 2.0 + 0.1);

        // Position on tunnel wall
        float angle = fi * 2.4 + t * 0.1;
        float baseRadius = 0.6;
        vec2 pos = vec2(cos(angle), sin(angle)) * baseRadius * scale * 0.3;

        // Bring toward center as they approach
        pos *= z;

        float size = 0.03 * scale * z;
        float dist = length(uv - pos);
        float obj = 1.0 - smoothstep(0.0, size, dist);

        // Alpha by depth
        float alpha = smoothstep(0, 0.1, z) * smoothstep(1.0, 0.8, z);

        // Color by depth
        vec3 color = mix(
            vec3(0.8, 0.4, 0.2),
            vec3(0.2, 0.4, 0.9),
            z
        );

        col += color * obj * alpha * 0.4;
    }

    // Center glow
    float centerDist = length(uv);
    col += vec3(0.1, 0.15, 0.3) * exp(-centerDist * 3.0) * (1.0 + sin(t * 2.0) * 0.3);

    // Vignette
    col *= 1.0 - smoothstep(0.5, 1.5, centerDist);

    gl_FragColor = vec4(col, 1.0);
}