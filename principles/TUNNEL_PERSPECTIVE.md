# Tunnel Perspective

**ID:** `TUNNEL_PERSPECTIVE` | **Category:** Spatial | **Weird Factor:** 7/10

## Source

- **Sketch:** Tunnel
- **Date:** 2025-07-15
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Z-depth sprite scaling to create tunnel effect.

## What Makes It Weird

Simple 2D sprites with perspective divide create convincing 3D tunnel without actual 3D geometry.

## The Twist

Objects at center appear closer, edge objects farther - can be inverted for disorienting effects.

---

## Emotional Quality

**claustrophobic_intense** - Being pulled through a tube. Can feel comforting or claustrophobic depending on speed.

---

## Variations

- [ ] Curved tunnel paths
- [ ] Multiple tunnel layers
- [ ] Rotating tunnel walls
- [ ] Speed variation along tunnel
- [ ] Reverse tunnel (outward)

---

## Related Principles

- [[FRAME_SYNCED_SPIRAL_SPAWN]] - Depth-based positioning
- [[VOXEL_GRID_THRESHOLD]] - 3D spatial structure

## Combinations

- [[ROTATING_AQUARIUM]] - Rotating Aquarium
- [[HEX_TUNNEL]] - Hex Tunnel

---

## Code Reference


// Tunnel perspective
for (int i = 0; i < objectCount; i++) {
    float z = fmod(ofGetElapsedTimef() * speed + i * spacing, 1.0);
    float scale = 1.0 / (z + 0.1); // perspective divide
    float x = (ofRandomf() * 0.5) * scale + ofGetWidth()/2;
    float y = (ofRandomf() * 0.5) * scale + ofGetHeight()/2;
    float alpha = ofMap(z, 0, 1, 255, 0);
    float size = baseSize * scale;
    ofSetColor(255, alpha);
    ofDrawCircle(x, y, size);
}


---

## GLSL Key

`See database.json for shader translation`
