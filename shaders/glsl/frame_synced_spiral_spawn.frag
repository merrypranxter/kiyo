// Frame Synced Spiral Spawn
// Birth coordinates derived from accumulated time

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.01, 0.03);

    // Spiral arms
    for (int arm = 0; arm < 3; arm++) {
        float armOffset = float(arm) * PI * 2.0 / 3.0;

        for (int i = 0; i < 40; i++) {
            float fi = float(i);
            float spawnTime = fi * 0.1;
            float age = t - spawnTime;

            if (age < 0.0 || age > 3.0) continue;

            // Frame-synced spiral
            float angle = spawnTime * 4.0 + armOffset + fi * 0.3;
            float radius = fi * 0.02;

            // Modulo radius for infinite spiral feel
            radius = mod(radius + t * 0.1, 0.8);

            vec2 pos = vec2(cos(angle), sin(angle)) * radius;

            // Noise jitter
            pos += vec2(hash(vec2(fi, 0.0)), hash(vec2(fi, 1.0))) * 0.02 - 0.01;

            float dist = length(uv - pos);
            float size = 0.01 * (1.0 - age / 3.0);
            float particle = 1.0 - smoothstep(0.0, size, dist);

            float alpha = 1.0 - age / 3.0;

            vec3 color = vec3(0.3 + fi * 0.02, 0.7, 0.5 + arm * 0.1);
            col += color * particle * alpha * 0.5;
        }
    }

    // Spiral arm lines
    float polarAngle = atan(uv.y, uv.x);
    float polarRadius = length(uv);
    float spiralDist = abs(polarRadius - mod(polarAngle * 0.3 + t * 0.1, 0.8));
    col += vec3(0.1, 0.3, 0.2) * (1.0 - smoothstep(0.0, 0.02, spiralDist)) * 0.2;

    gl_FragColor = vec4(col, 1.0);
}