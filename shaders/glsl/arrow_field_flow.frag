// Arrow Field Flow
// Arrows rotate toward targets

uniform float iTime;
uniform vec2 iResolution;

#define GRID_SIZE 10

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.03);

    // Moving targets
    vec2 target1 = vec2(cos(t * 0.5) * 0.5, sin(t * 0.3) * 0.3);
    vec2 target2 = vec2(sin(t * 0.4) * 0.4, cos(t * 0.6) * 0.4);

    // Grid spacing
    float spacing = 0.2;

    for (int x = -6; x <= 6; x++) {
        for (int y = -5; y <= 5; y++) {
            vec2 arrowPos = vec2(float(x), float(y)) * spacing;

            // Skip if off screen
            if (length(arrowPos) > 1.5) continue;

            // Direction to targets (weighted)
            vec2 to1 = target1 - arrowPos;
            vec2 to2 = target2 - arrowPos;

            float w1 = 1.0 / (length(to1) + 0.1);
            float w2 = 1.0 / (length(to2) + 0.1);

            vec2 dir = normalize(to1 * w1 + to2 * w2);

            // Local coords relative to arrow
            vec2 local = uv - arrowPos;
            vec2 localRot = vec2(
                local.x * dir.x + local.y * dir.y,
                -local.x * dir.y + local.y * dir.x
            );

            // Arrow shape
            float shaft = 1.0 - smoothstep(0.0, 0.015, abs(localRot.y));
            shaft *= step(0.0, localRot.x) * step(localRot.x, 0.06);

            float head = 1.0 - smoothstep(0.0, 0.02, 
                max(abs(localRot.x - 0.07), abs(localRot.y)) - 0.01 + abs(localRot.x - 0.07) * 0.5);
            head *= step(0.05, localRot.x) * step(localRot.x, 0.09);

            float arrow = max(shaft, head);

            // Color by strength
            float strength = length(dir);
            vec3 color = mix(
                vec3(0.2, 0.4, 0.6),
                vec3(0.6, 0.8, 1.0),
                strength
            );

            col += color * arrow * 0.3;
        }
    }

    gl_FragColor = vec4(col, 1.0);
}