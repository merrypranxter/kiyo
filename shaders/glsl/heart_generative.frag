// Generative Heart
// Parametric heart shape

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.05, 0.01, 0.02);

    // Multiple overlapping hearts
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float scale = 0.08 + fi * 0.015;
        float offset = fi * 0.3;
        float alpha = 1.0 - fi * 0.15;

        // Heart SDF
        vec2 p = uv / scale;
        p.y *= -1.0; // Flip

        // Parametric heart
        float a = atan(p.y, p.x);
        float r = length(p);

        // Heart shape function
        float heartR = pow(sin(a), 2.0) * cos(a);
        heartR = abs(heartR) * 0.5 + 0.3;

        // Better heart SDF approximation
        p.y += 0.3;
        float x = p.x;
        float y = p.y;
        float a2 = x * x + y * y - 0.3;
        float heartDist = a2 * a2 * a2 - x * x * y * y * y;

        // Simple filled heart
        float heart = 1.0 - smoothstep(0.0, 0.02, heartDist);

        // Beat animation
        float beat = 1.0 + 0.1 * sin(t * 3.0 + fi * 0.5) * exp(-mod(t, 1.0) * 3.0);

        vec2 heartUV = uv / (scale * beat);
        heartUV.y *= -1.0;
        heartUV.y += 0.1 * beat;

        // Recompute for animated heart
        float ax = heartUV.x;
        float ay = heartUV.y + 0.3;
        float a2b = ax * ax + ay * ay - 0.3;
        float heartDist2 = a2b * a2b * a2b - ax * ax * ay * ay * ay;
        float heart2 = 1.0 - smoothstep(0.0, 0.015, heartDist2);

        vec3 color = mix(
            vec3(1.0, 0.2, 0.4),
            vec3(1.0, 0.6, 0.7),
            fi / 5.0
        );

        col += color * heart2 * alpha * 0.3;
    }

    gl_FragColor = vec4(col, 1.0);
}