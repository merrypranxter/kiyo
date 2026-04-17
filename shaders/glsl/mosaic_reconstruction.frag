// Mosaic Reconstruction
// Tiles assemble from scattered positions

uniform float iTime;
uniform vec2 iResolution;

#define GRID_SIZE 8

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.03);

    // Grid
    float scale = 5.0;
    vec2 gridUV = uv * scale;
    vec2 cell = floor(gridUV);
    vec2 local = fract(gridUV) - 0.5;

    // Assembly progress
    float progress = fract(t * 0.15);

    // Per-tile animation
    float tileHash = hash(cell);
    float tileDelay = tileHash * 0.5;
    float tileT = clamp((progress - tileDelay) / 0.5, 0.0, 1.0);

    // Easing
    float ease = tileT < 0.5 
        ? 4.0 * tileT * tileT * tileT 
        : 1.0 - pow(-2.0 * tileT + 2.0, 3.0) / 2.0;

    // Scattered position
    vec2 scatter = vec2(
        (hash(cell) - 0.5) * 3.0,
        (hash(cell + 100.0) - 0.5) * 3.0
    );

    // Interpolate
    vec2 tilePos = mix(scatter, vec2(0), ease);

    // Tile boundary with offset
    vec2 tileLocal = local + tilePos;
    float tileDist = max(abs(tileLocal.x), abs(tileLocal.y));
    float tileEdge = 1.0 - smoothstep(0.45, 0.5, tileDist);

    // Color by original position
    vec3 color = mix(
        vec3(0.8, 0.3, 0.2),
        vec3(0.2, 0.5, 0.8),
        hash(cell + 50.0)
    );

    // Rotation during assembly
    float rotation = (1.0 - ease) * 3.14159;
    float cosR = cos(rotation);
    float sinR = sin(rotation);
    vec2 rotLocal = vec2(
        local.x * cosR - local.y * sinR,
        local.x * sinR + local.y * cosR
    );

    col += color * tileEdge * 0.4;
    col += vec3(0.3) * (1.0 - smoothstep(0.0, 0.45, tileDist)) * 0.1;

    // Glow during movement
    col += vec3(0.5, 0.4, 0.2) * (1.0 - ease) * tileEdge * 0.2;

    gl_FragColor = vec4(col, 1.0);
}