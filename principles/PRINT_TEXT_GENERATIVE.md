# Generative Text

**ID:** `PRINT_TEXT_GENERATIVE` | **Category:** Typography | **Weird Factor:** 7/10

## Source

- **Sketch:** PRINT 10
- **Date:** 2025-07-01
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Text as generative geometry source.

## What Makes It Weird

Letters aren't rendered as text but converted to geometry that can be manipulated like any other mesh.

## The Twist

Text outlines become particle emitters or mesh boundaries - typography becomes sculpture.

---

## Emotional Quality

**loud_bold** - Words made physical. The message becomes the medium.

---

## Variations

- [ ] Text morphing between words
- [ ] Particles flowing along letter paths
- [ ] 3D extruded text with noise
- [ ] Text deforming like liquid
- [ ] Generative letterforms (not existing fonts)

---

## Related Principles

- [[SWELL_DEFORMATION]] - Deform text geometry
- [[MOSAIC_RECONSTRUCTION]] - Tile-based text

## Combinations

- [[TEXTUAL_SWELL]] - Textual Swell

---

## Code Reference


// Text as geometry
ofTrueTypeFont font;
font.load("font.ttf", 100);

// Get text as paths
ofPath textPath = font.getStringAsPath("PRINT");
vector<ofPolyline> outlines = textPath.getOutline();

// Use outlines as emitters
for (auto& outline : outlines) {
    for (auto& point : outline.getVertices()) {
        if (ofRandom(1) < 0.1) { // random emit
            particles.emplace_back(point);
        }
    }
}

// Or deform the text itself
for (auto& outline : outlines) {
    for (auto& point : outline.getVertices()) {
        point.y += sin(point.x * 0.01 + time) * 10;
    }
}


---

## GLSL Key

`See database.json for shader translation`
