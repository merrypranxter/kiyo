// Drop Ring Gravity
// Rings fall, stack, and collide

uniform float iTime;
uniform vec2 iResolution;

#define NUM_RINGS 8

float hash(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.03);

    // Floor
    float floorY = -0.7;
    col += vec3(0.1, 0.1, 0.15) * (1.0 - smoothstep(0.0, 0.005, abs(uv.y - floorY)));

    for (int i = 0; i < NUM_RINGS; i++) {
        float fi = float(i);
        float spawnTime = fi * 0.4;
        float age = t - spawnTime;

        if (age < 0.0) continue;

        // Gravity physics
        float yPos = 0.8 - 0.5 * age * age;
        float xPos = (hash(fi * 3.7) - 0.5) * 1.2;

        // Stack collision (simplified)
        float stackHeight = fi * 0.04;
        float bounce = exp(-age * 2.0) * abs(sin(age * 8.0)) * 0.1;
        yPos = max(yPos, floorY + 0.08 + stackHeight) + bounce;

        float radius = 0.06 + hash(fi) * 0.03;

        // Ring (hollow circle)
        float dist = length(uv - vec2(xPos, yPos));
        float ring = smoothstep(radius - 0.008, radius - 0.003, dist) 
                   * (1.0 - smoothstep(radius, radius + 0.003, dist));

        // Color by size
        vec3 color = mix(
            vec3(0.9, 0.4, 0.2),
            vec3(0.2, 0.6, 0.9),
            hash(fi + 10.0)
        );

        col += color * ring * 0.7;
    }

    gl_FragColor = vec4(col, 1.0);
}