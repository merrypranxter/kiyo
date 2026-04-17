// Wireframe Overlay Blend
// Triangle edge overlay on solid geometry

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.03, 0.04, 0.06);

    // Rotating icosahedron projection
    float angleX = t * 0.3;
    float angleY = t * 0.5;

    // Simple triangle faces
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float baseAngle = fi * PI / 3.0;

        // Triangle vertices
        vec2 v0 = vec2(cos(baseAngle), sin(baseAngle)) * 0.4;
        vec2 v1 = vec2(cos(baseAngle + PI*2.0/3.0), sin(baseAngle + PI*2.0/3.0)) * 0.4;
        vec2 v2 = vec2(cos(baseAngle + PI*4.0/3.0), sin(baseAngle + PI*4.0/3.0)) * 0.4;

        // Rotate
        float cosA = cos(angleY);
        float sinA = sin(angleY);
        v0 = vec2(v0.x * cosA - v0.y * sinA, v0.x * sinA + v0.y * cosA);
        v1 = vec2(v1.x * cosA - v1.y * sinA, v1.x * sinA + v1.y * cosA);
        v2 = vec2(v2.x * cosA - v2.y * sinA, v2.x * sinA + v2.y * cosA);

        // Solid fill
        float edge0 = abs(cross(vec3(v1-v0,0), vec3(uv-v0,0)).z) / length(v1-v0);
        float edge1 = abs(cross(vec3(v2-v1,0), vec3(uv-v1,0)).z) / length(v2-v1);
        float edge2 = abs(cross(vec3(v0-v2,0), vec3(uv-v2,0)).z) / length(v0-v2);

        // Barycentric-ish inside test
        float d0 = dot(uv - v0, vec2(-(v1-v0).y, (v1-v0).x));
        float d1 = dot(uv - v1, vec2(-(v2-v1).y, (v2-v1).x));
        float d2 = dot(uv - v2, vec2(-(v0-v2).y, (v0-v2).x));
        float inside = step(0.0, d0 * d1) * step(0.0, d1 * d2);

        vec3 faceColor = vec3(0.1 + fi * 0.05, 0.15, 0.2) * inside * 0.3;
        col += faceColor;

        // Wireframe edges
        float minEdge = min(min(edge0, edge1), edge2);
        float wire = 1.0 - smoothstep(0.0, 0.008, minEdge);
        wire *= inside + 0.1; // Show wireframe even outside

        col += vec3(0.4, 0.7, 0.9) * wire * 0.6;
    }

    gl_FragColor = vec4(col, 1.0);
}