# Two Frame Animation

**ID:** `TWO_FRAME_ANIMATION` | **Category:** Animation | **Weird Factor:** 8/10

## Source

- **Sketch:** 2 frame
- **Date:** 2025-12-29
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Flip between two states to create strobe-like animation.

## What Makes It Weird

Only 2 frames - no in-between - creating harsh digital aesthetic reminiscent of early animation.

## The Twist

The two frames can be completely different (not just A/B of same motion) - jarring cuts.

---

## Emotional Quality

**retro_digital** - Like a broken GIF or early web animation. Nostalgic but intentionally crude.

---

## Variations

- [ ] Uneven timing (70/30 split)
- [ ] More than 2 frames (3, 4)
- [ ] Random frame selection
- [ ] Frame rate independent of display
- [ ] Trigger-based frame switch

---

## Related Principles

- [[DETERMINISTIC_FRAME_RANDOM]] - Controlled randomness
- [[MODULO_SPAWN_PHASE_SHIFT]] - Binary phase logic

## Combinations

- [[STROBE_HEARTBEAT]] - Strobe Heartbeat

---

## Code Reference


// Two frame strobe
bool frameA = (int)(ofGetElapsedTimef() * 4) % 2 == 0;
// 4 flips per second, only 2 states

if (frameA) {
    // Render state A
    ofSetColor(255, 0, 0);
    ofDrawCircle(100, 100, 50);
} else {
    // Render state B - can be completely different!
    ofSetColor(0, 0, 255);
    ofDrawRectangle(200, 200, 100, 100);
}
// No interpolation, no tweening - hard cut


---

## GLSL Key

`See database.json for shader translation`
