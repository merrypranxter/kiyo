# Hexagonal Tile Morph

**ID:** `HEXAGONAL_TILE_MORPH` | **Category:** Geometry | **Weird Factor:** 7/10

## Source

- **Sketch:** Hexagon sketches
- **Date:** 2025-08-20
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Hexagonal grid with deformation.

## What Makes It Weird

Regular hex grid combined with organic displacement creates crystal-meets-nature aesthetic.

## The Twist

Individual hexes can rotate, scale, and translate independently while maintaining grid adjacency.

---

## Emotional Quality

**crystalline_ordered** - Like watching ice crystals form or bee hives construct. Ordered but alive.

---

## Variations

- [ ] Hex to circle morph
- [ ] Height displacement (3D hex columns)
- [ ] Color by hex neighbor count
- [ ] Hex shatter/fracture
- [ ] Hexagonal maze generation

---

## Related Principles

- [[MOSAIC_RECONSTRUCTION]] - Tile-based patterns
- [[VOXEL_GRID_THRESHOLD]] - Grid-based spatial structure

## Combinations

- [[HEX_TUNNEL]] - Hex Tunnel

---

## Code Reference


// Hexagonal grid
for (int x = 0; x < cols; x++) {
    for (int y = 0; y < rows; y++) {
        // Hex position
        float xPos = x * hexWidth * 0.75;
        float yPos = y * hexHeight + (x % 2) * hexHeight * 0.5;

        // Deform based on noise
        float deform = ofNoise(x * 0.1, y * 0.1, time * 0.1);
        float size = hexSize * (0.5 + deform * 0.5);
        float rotation = deform * PI;

        ofPushMatrix();
        ofTranslate(xPos, yPos);
        ofRotateRad(rotation);
        drawHexagon(0, 0, size);
        ofPopMatrix();
    }
}


---

## GLSL Key

`See database.json for shader translation`
