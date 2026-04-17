# Stepped Lifetime Alpha

**ID:** `STEPPED_LIFETIME_ALPHA` | **Category:** Rendering | **Weird Factor:** 6/10

## Source

- **Sketch:** Multiple sketches
- **Date:** 2026-03-15
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Non-linear alpha mapping - full opacity for first half of life, then steep drop-off.

## What Makes It Weird

Most fading uses linear or smoothstep - this creates a binary-then-linear curve that feels more decisive and crisp.

## The Twist

The sudden transition from fully opaque to fading creates a 'pop' effect that draws attention to the fade moment.

---

## Emotional Quality

**decisive_crisp** - Clean, modern, unapologetic. Things don't gently fade - they decide to leave.

---

## Variations

- [ ] Adjust split point (0.3, 0.7 instead of 0.5)
- [ ] Exponential drop-off
- [ ] Stepped fade (3-4 discrete levels)
- [ ] Size-linked instead of time-linked
- [ ] Color shift during fade phase

---

## Related Principles

- [[BLEND_MODE_MOOD_MAPPING]] - Both control visual presence
- [[VOXEL_GRID_THRESHOLD]] - Binary decision aesthetic

## Combinations

- [[TWO_TONE_ECHO]] - Two-Tone Echo

---

## Code Reference


// Stepped alpha - full then fade
for (auto& p : particles) {
    float life = p.age / p.maxAge; // 0 to 1
    float alpha;
    if (life < 0.5) {
        alpha = 255; // full opacity
    } else {
        alpha = ofMap(life, 0.5, 1.0, 255, 30); // steep drop
    }
    ofSetColor(255, alpha);
    ofDrawCircle(p.pos, p.radius);
}


---

## GLSL Key

`See database.json for shader translation`
