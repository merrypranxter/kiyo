# Blend Mode Mood Mapping

**ID:** `BLEND_MODE_MOOD_MAPPING` | **Category:** Rendering | **Weird Factor:** 7/10

## Source

- **Sketch:** Ripple on ripple / Draw line when you get close
- **Date:** 2026-04-10
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Blend mode selection (ADD vs SUBTRACT) as primary aesthetic decision.

## What Makes It Weird

Most artists treat blend mode as a secondary setting - Kiyoshi uses it as the main emotional signal of the sketch.

## The Twist

ADD = ethereal/ghostly, SUBTRACT = aggressive/cutting - the blend mode IS the mood, not an afterthought.

---

## Emotional Quality

**dual_nature** - The same geometry feels completely different under different blend modes. Two moods from one form.

---

## Variations

- [ ] Switch blend modes mid-sketch
- [ ] Blend mode per particle layer
- [ ] Multiplicative for dark moods
- [ ] Screen blend for soft light
- [ ] Custom blend equations

---

## Related Principles

- [[STEPPED_LIFETIME_ALPHA]] - Shared rendering pipeline control
- [[WIREFRAME_OVERLAY_BLEND]] - Visual layering technique

## Combinations

- [[TWO_TONE_ECHO]] - Two-Tone Echo

---

## Code Reference


// Blend mode as emotional choice
void setup() {
    // Option A: Ethereal
    ofEnableBlendMode(OF_BLENDMODE_ADD);
    // Everything glows, overlaps create brightness

    // Option B: Aggressive
    ofEnableBlendMode(OF_BLENDMODE_SUBTRACT);
    // Everything cuts into the background
    // Overlaps create dark voids
}

// Can switch dynamically:
if (mood == "ethereal") {
    ofEnableBlendMode(OF_BLENDMODE_ADD);
} else {
    ofEnableBlendMode(OF_BLENDMODE_SUBTRACT);
}


---

## GLSL Key

`See database.json for shader translation`
