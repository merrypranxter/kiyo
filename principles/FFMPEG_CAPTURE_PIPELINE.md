# FFMPEG Capture Pipeline

**ID:** `FFMPEG_CAPTURE_PIPELINE` | **Category:** Pipeline | **Weird Factor:** 5/10

## Source

- **Sketch:** Meta-technique
- **Date:** 2016-12-16
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Capture frames and encode to video using FFMPEG.

## What Makes It Weird

The capture process itself becomes part of the workflow - frame-perfect recording as creative tool.

## The Twist

Using named pipes or raw frame dumping for lossless capture before compression. Production quality from sketch workflow.

---

## Emotional Quality

**meta_production** - Not visible in the art, but enables the art. The invisible infrastructure.

---

## Variations

- [ ] Real-time streaming capture
- [ ] Variable frame rate capture
- [ ] Multi-pass render then encode
- [ ] Capture at higher res than display
- [ ] Automatic GIF generation

---

## Related Principles

- [[DETERMINISTIC_FRAME_RANDOM]] - Frame-perfect reproduction

## Combinations

- (No documented combinations yet)

---

## Code Reference


// Frame capture for FFMPEG
void ofApp::draw() {
    // Normal rendering

    // Save frame
    ofSaveScreen("frames/" + ofToString(ofGetFrameNum(), 4, '0') + ".png");
}

// Then encode:
// ffmpeg -framerate 30 -i frame_%04d.png -c:v libx264 
//        -pix_fmt yuv420p -crf 18 output.mp4

// Or use named pipe for real-time:
// ffmpeg -f rawvideo -pix_fmt rgb24 -s 1920x1080 -i pipe:0 
//        -c:v libx264 output.mp4


---

## GLSL Key

`See database.json for shader translation`
