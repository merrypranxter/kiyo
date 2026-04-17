// Bidirectional Orbital Trails
// Counter-rotating rings with fat trails

uniform float iTime;
uniform vec2 iResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.03, 0.02, 0.04);

    int numRings = 5;
    for (int ring = 0; ring < 5; ring++) {
        float fr = float(ring);
        float direction = (ring % 2 == 0) ? 1.0 : -1.0;
        float radius = 0.15 + fr * 0.12;
        float speed = (1.0 + fr * 0.3) * direction;

        // Draw trail as overlapping circles
        for (int tr = 0; tr < 15; tr++) {
            float ftr = float(tr);
            float trailTime = t - ftr * 0.03;
            float angle = trailTime * speed + fr * 1.3;

            vec2 pos = vec2(cos(angle) * radius, sin(angle) * radius);
            float dist = length(uv - pos);

            float size = 0.025 - ftr * 0.001;
            float circle = 1.0 - smoothstep(0.0, size, dist);

            // Fade trail
            float trailFade = 1.0 - ftr / 15.0;

            // Color per direction
            vec3 color = (direction > 0.0) 
                ? vec3(0.6, 0.3, 0.8) 
                : vec3(0.3, 0.7, 0.9);

            col += color * circle * trailFade * 0.15;
        }
    }

    gl_FragColor = vec4(col, 1.0);
}