// Hexagonal Tile Morph
// Hex grid with deformation

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265
#define SQRT3 1.7320508

float hexDist(vec2 p) {
    p = abs(p);
    return max(p.x + p.y * 0.577350269, p.y * 1.154700538);
}

vec2 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, SQRT3);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    return dot(a, a) < dot(b, b) ? a : b;
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.03, 0.04);

    // Hex grid
    float scale = 6.0;
    vec2 hexUV = uv * scale;
    vec2 cell = floor(hexUV / vec2(1.0, SQRT3)) * vec2(1.0, SQRT3);
    vec2 local = hexCoords(hexUV);

    // Per-hex deformation
    float deform = hash(floor(hexUV * 0.5)) * 2.0 - 1.0;
    float size = 0.4 + sin(t * 2.0 + deform * 5.0) * 0.1;

    // Hex SDF
    float d = hexDist(local);
    float hex = 1.0 - smoothstep(size - 0.05, size, d);
    float edge = smoothstep(size - 0.08, size - 0.05, d) * (1.0 - smoothstep(size, size + 0.02, d));

    // Color by deformation
    vec3 fillColor = mix(
        vec3(0.1, 0.2, 0.35),
        vec3(0.3, 0.5, 0.7),
        sin(t + deform * 3.0) * 0.5 + 0.5
    );

    col += fillColor * hex * 0.4;
    col += vec3(0.4, 0.6, 0.8) * edge * 0.5;

    // Grid lines
    col += vec3(0.05, 0.08, 0.12) * (1.0 - smoothstep(0.0, 0.5, d)) * 0.2;

    gl_FragColor = vec4(col, 1.0);
}