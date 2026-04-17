# Mosaic Reconstruction

**ID:** `MOSAIC_RECONSTRUCTION` | **Category:** Geometry | **Weird Factor:** 7/10

## Source

- **Sketch:** Mosaic sketches
- **Date:** 2025-10-05
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Tiles assemble from scattered positions to form an image.

## What Makes It Weird

Reverse destruction - pieces come together rather than falling apart. Satisfying assembly.

## The Twist

Each tile takes a unique path to its destination, creating choreographed assembly with personality.

---

## Emotional Quality

**satisfying_assembly** - Like solving a puzzle or watching construction. The satisfaction of order from chaos.

---

## Variations

- [ ] Disassembly instead of assembly
- [ ] Different easing per tile
- [ ] 3D tiles (flip into place)
- [ ] Color bleeding between tiles
- [ ] Tiles that rotate into position

---

## Related Principles

- [[HEXAGONAL_TILE_MORPH]] - Tile-based geometry
- [[NOISE_MASKED_GEOMETRY]] - Selective rendering

## Combinations

- [[PROXIMITY_MOSAIC]] - Proximity Mosaic
- [[TECHNICAL_CUTAWAY]] - Technical Cutaway

---

## Code Reference


// Mosaic reconstruction
struct Tile {
    ofVec2f currentPos, targetPos;
    float rotation = 0;
    ofColor color;
};

void update() {
    for (auto& tile : tiles) {
        // Unique path per tile
        float t = ofGetElapsedTimef() * 0.5 + 
                  ofNoise(tile.targetPos.x, tile.targetPos.y) * 2;
        t = ofClamp(t, 0, 1);

        // Easing
        float ease = t < 0.5 ? 4*t*t*t : 1 - pow(-2*t+2, 3)/2;

        tile.currentPos = ofVec2f::lerp(scatterPos, tile.targetPos, ease);
        tile.rotation = ofLerp(PI * 2, 0, ease);
    }
}


---

## GLSL Key

`See database.json for shader translation`
