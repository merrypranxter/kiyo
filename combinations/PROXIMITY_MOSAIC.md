# Proximity Mosaic

**ID:** `PROXIMITY_MOSAIC`

**Ingredients:** [[PROXIMITY_THRESHOLD_CONNECTION]] + [[MOSAIC_RECONSTRUCTION]]

**Result:** Tiles connect by nearness before assembling

---

## Description

During mosaic assembly, tiles temporarily connect to nearby tiles. Creates a network that guides the assembly choreography.

---

## How To


1. Scatter tiles randomly
2. Find nearby tiles (proximity threshold)
3. Draw temporary connections
4. Animate tiles to target positions
5. Fade connections as tiles arrive


---

## GLSL Hint


// During assembly
for each tile:
    for each other tile:
        if distance(tile, other) < threshold:
            drawConnection(tile.pos, other.pos, fadeAlpha)
    tile.pos = lerp(scatter, target, ease)


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
