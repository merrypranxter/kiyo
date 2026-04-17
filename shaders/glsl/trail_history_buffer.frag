// Trail History Buffer
// Ring buffer of positions creating motion trails

uniform float iTime;
uniform vec2 iResolution;

#define TRAIL_LENGTH 20
#define NUM_TRAILS 5

float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

float lineSegment(vec2 p, vec2 a, vec2 b, float thickness) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return 1.0 - smoothstep(0.0, thickness, length(pa - ba * h));
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.01, 0.02);

    for (int tr = 0; tr < NUM_TRAILS; tr++) {
        float ftr = float(tr);
        float baseAngle = ftr * 2.1 + t * (0.5 + ftr * 0.1);

        vec2 prevPos;
        for (int i = 0; i < TRAIL_LENGTH; i++) {
            float fi = float(i);
            float timeOffset = fi * 0.05;
            float angle = baseAngle - timeOffset;
            float radius = 0.3 + 0.1 * sin(ftr * 1.3 + fi * 0.2);

            vec2 pos = vec2(
                cos(angle) * radius + sin(t + ftr) * 0.05,
                sin(angle * 0.8) * radius + cos(t * 0.7 + ftr) * 0.05
            );

            if (i > 0) {
                float trailFade = 1.0 - fi / float(TRAIL_LENGTH);
                float thickness = 0.003 * trailFade;
                float line = lineSegment(uv, prevPos, pos, thickness);

                vec3 color = mix(
                    vec3(0.8, 0.3, 0.6),
                    vec3(0.2, 0.5, 0.9),
                    fi / float(TRAIL_LENGTH)
                );

                col += color * line * trailFade * 0.4;
            }

            // Point at head
            if (i == 0) {
                float headDist = length(uv - pos);
                col += vec3(1.0, 0.8, 0.9) * (1.0 - smoothstep(0.0, 0.015, headDist)) * 0.5;
            }

            prevPos = pos;
        }
    }

    gl_FragColor = vec4(col, 1.0);
}