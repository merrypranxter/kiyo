// Swell Deformation
// Inflate mesh over time

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.04);

    // Grid of 'vertices'
    float gridScale = 12.0;
    vec2 gridUV = uv * gridScale;
    vec2 cell = floor(gridUV);
    vec2 cellUV = fract(gridUV) - 0.5;

    // Swell per cell
    float swell1 = sin(t * 2.0 + cell.x * 0.3 + cell.y * 0.2) * 0.5 + 0.5;
    float swell2 = sin(t * 5.0 + cell.x * 0.1) * 0.3;
    float totalSwell = swell1 * 0.7 + swell2 * 0.3;

    // Displace cell UV
    cellUV *= 1.0 + totalSwell * 0.3;

    // Cell boundary
    float cellDist = max(abs(cellUV.x), abs(cellUV.y));
    float cellEdge = 1.0 - smoothstep(0.4, 0.5, cellDist);

    // Color by swell amount
    vec3 color = mix(
        vec3(0.1, 0.2, 0.4),
        vec3(0.6, 0.3, 0.5),
        totalSwell
    );

    col += color * cellEdge * 0.3;

    // Deformed circle in each cell
    float circleDist = length(cellUV);
    float circleSize = 0.2 + totalSwell * 0.15;
    float circle = 1.0 - smoothstep(circleSize - 0.02, circleSize, circleDist);

    col += vec3(0.4, 0.6, 0.8) * circle * 0.4;

    // Grid lines
    float gridLine = smoothstep(0.48, 0.5, abs(cellUV.x)) + smoothstep(0.48, 0.5, abs(cellUV.y));
    col += vec3(0.1, 0.15, 0.25) * gridLine * 0.2;

    gl_FragColor = vec4(col, 1.0);
}