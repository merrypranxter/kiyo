// Deterministic Frame Random
// Same random sequence every frame

uniform float iTime;
uniform vec2 iResolution;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash1(float n) {
    return fract(sin(n * 127.1) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    // Frame number as integer for deterministic behavior
    float frame = floor(iTime * 60.0);
    vec3 col = vec3(0.03);

    // Grid of elements with frame-seeded random
    for (int i = 0; i < 100; i++) {
        float fi = float(i);
        float x = hash1(fi * 13.37 + frame * 0.0) * 2.4 - 1.2;
        float y = hash1(fi * 7.91 + frame * 0.0 + 100.0) * 2.0 - 1.0;
        float size = hash1(fi * 3.14 + 200.0) * 0.05 + 0.01;
        vec3 color = vec3(
            hash1(fi + 300.0),
            hash1(fi + 400.0),
            hash1(fi + 500.0)
        );

        // Position jitters each frame but deterministically
        float jitterX = (hash1(frame + fi) - 0.5) * 0.02;
        float jitterY = (hash1(frame + fi + 50.0) - 0.5) * 0.02;

        vec2 pos = vec2(x + jitterX, y + jitterY);
        float dist = length(uv - pos);
        float shape = 1.0 - smoothstep(0.0, size, dist);

        // Step between frames
        float stepNoise = step(0.5, hash1(frame * 0.1 + fi));
        float visibility = mix(0.3, 1.0, stepNoise);

        col += color * shape * visibility * 0.4;
    }

    // Glitch lines
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float y = hash1(frame * 2.0 + fi * 50.0) * 2.0 - 1.0;
        float thickness = hash1(frame + fi) * 0.01 + 0.002;
        float line = 1.0 - smoothstep(0.0, thickness, abs(uv.y - y));
        float r = hash1(frame + fi + 10.0);
        float g = hash1(frame + fi + 20.0);
        float b = hash1(frame + fi + 30.0);
        col += vec3(r, g, b) * line * 0.3;
    }

    gl_FragColor = vec4(col, 1.0);
}