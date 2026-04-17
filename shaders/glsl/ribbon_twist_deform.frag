// Ribbon Twist Deformation
// Twist along path

uniform float iTime;
uniform vec2 iResolution;

#define PI 3.14159265

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    float t = iTime;
    vec3 col = vec3(0.02, 0.02, 0.04);

    // Ribbon path (sine wave)
    float ribbonWidth = 0.08;

    for (float s = -1.0; s < 1.0; s += 0.005) {
        // Curve position
        vec2 curvePos = vec2(
            s * 1.2,
            sin(s * 3.0 + t * 0.5) * 0.3 + sin(s * 7.0) * 0.1
        );

        // Curve tangent
        vec2 tangent = normalize(vec2(
            1.2,
            cos(s * 3.0 + t * 0.5) * 0.9 + cos(s * 7.0) * 0.7
        ));
        vec2 normal = vec2(-tangent.y, tangent.x);

        // Twist along curve
        float twist = s * 3.0 + t * 2.0;
        vec2 twistedNormal = vec2(
            normal.x * cos(twist) - normal.y * sin(twist),
            normal.x * sin(twist) + normal.y * cos(twist)
        );

        // Ribbon segment
        vec2 toPixel = uv - curvePos;
        float along = dot(toPixel, tangent);
        float across = dot(toPixel, twistedNormal);

        // Variable width
        float width = ribbonWidth * (0.5 + 0.5 * sin(s * 5.0 + t));

        float onRibbon = 1.0 - smoothstep(0.0, width, abs(across));
        onRibbon *= step(0.0, along) * step(along, 0.02);

        // Color by twist
        vec3 color = mix(
            vec3(0.3, 0.5, 0.9),
            vec3(0.9, 0.3, 0.6),
            sin(twist) * 0.5 + 0.5
        );

        col += color * onRibbon * 0.05;
    }

    gl_FragColor = vec4(col, 1.0);
}