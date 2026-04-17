// FFMPEG Capture Pipeline
// Not a shader - pipeline documentation

// This is a meta-principle about capturing frames for video encoding.
// The shader below demonstrates a frame-counter overlay useful for debugging sync.

uniform float iTime;
uniform vec2 iResolution;
uniform float iFrame;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;

    // Visual frame counter
    vec3 col = vec3(0.02);

    // Show frame number as bar
    float frameBar = fract(iFrame / 60.0);
    if (uv.y < 0.02 && uv.x < frameBar) {
        col = vec3(0.2, 0.8, 0.3);
    }

    // Second marker
    float second = mod(iFrame / 60.0, 1.0);
    if (uv.y < 0.02 && abs(uv.x - second) < 0.005) {
        col = vec3(1.0, 0.9, 0.2);
    }

    gl_FragColor = vec4(col, 1.0);
}

// Capture command:
// ffmpeg -framerate 30 -i frame_%04d.png -c:v libx264 
//        -pix_fmt yuv420p -crf 18 output.mp4