// Proximity Threshold Connection
// Lines spawn when points get close - no persistent graph

uniform float iTime;
uniform vec2 iResolution;

#define NUM_POINTS 12

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    vec2 aspect = vec2(iResolution.x / iResolution.y, 1.0);
    uv = uv * 2.0 - 1.0;
    uv *= aspect;

    float t = iTime;
    vec3 col = vec3(0.05);

    // Generate moving points
    vec2 points[NUM_POINTS];
    for (int i = 0; i < NUM_POINTS; i++) {
        float fi = float(i);
        float angle = t * 0.3 + fi * 2.4;
        float radius = 0.3 + 0.2 * sin(fi * 1.7);
        points[i] = vec2(
            cos(angle) * radius + sin(t * 0.7 + fi) * 0.15,
            sin(angle * 0.8 + fi) * radius + cos(t * 0.5) * 0.1
        );
    }

    // Draw connections based on proximity
    for (int i = 0; i < NUM_POINTS; i++) {
        for (int j = i + 1; j < NUM_POINTS; j++) {
            float dist = length(points[i] - points[j]);
            float threshold = 0.35;
            if (dist < threshold) {
                float strength = 1.0 - dist / threshold;
                strength = pow(strength, 2.0);

                // Draw line segment
                vec2 lineDir = normalize(points[j] - points[i]);
                vec2 toP = uv - points[i];
                float proj = clamp(dot(toP, lineDir), 0.0, dist);
                vec2 closest = points[i] + lineDir * proj;
                float lineDist = length(uv - closest);

                col += vec3(0.8, 0.9, 1.0) * strength * (1.0 - smoothstep(0.0, 0.003, lineDist));
            }
        }

        // Draw point
        float pointDist = length(uv - points[i]);
        col += vec3(0.3, 0.6, 1.0) * (1.0 - smoothstep(0.0, 0.015, pointDist));
    }

    gl_FragColor = vec4(col, 1.0);
}