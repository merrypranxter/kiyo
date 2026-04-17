# Circle Packing Growth

**ID:** `CIRCLE_PACKING_GROWTH` | **Category:** Spatial | **Weird Factor:** 6/10

## Source

- **Sketch:** Circle packing sketches
- **Date:** 2025-09-15
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Circles grow from seeds until they touch another circle.

## What Makes It Weird

Simple collision-based growth creates organic packing patterns similar to cells or bubbles - emergence from simple rules.

## The Twist

New seeds spawn in gaps between existing circles, filling space optimally. Recursive growth.

---

## Emotional Quality

**organic_nature** - Like watching cells divide or bubbles settle. Natural optimization made visible.

---

## Variations

- [ ] Variable growth rates
- [ ] Shrinking/growing oscillation
- [ ] Color by size or age
- [ ] Limited lifespan (die and free space)
- [ ] Hierarchical packing (circles inside circles)

---

## Related Principles

- [[PROXIMITY_THRESHOLD_CONNECTION]] - Proximity-based interactions
- [[VOXEL_GRID_THRESHOLD]] - Emergent spatial patterns

## Combinations

- [[PROXIMITY_MOSAIC]] - Proximity Mosaic

---

## Code Reference


// Circle packing
struct Circle {
    ofVec2f pos;
    float radius;
    bool growing = true;
};

void update() {
    // Try to add new circle
    if (ofRandom(1) < 0.1) {
        ofVec2f newPos(ofRandom(width), ofRandom(height));
        bool valid = true;
        for (auto& c : circles) {
            if (newPos.distance(c.pos) < c.radius + 5) {
                valid = false; break;
            }
        }
        if (valid) circles.push_back({newPos, 1, true});
    }

    // Grow existing circles
    for (auto& c : circles) {
        if (!c.growing) continue;
        c.radius += 0.5;
        // Check collision
        for (auto& other : circles) {
            if (&c == &other) continue;
            if (c.pos.distance(other.pos) < c.radius + other.radius) {
                c.growing = false; break;
            }
        }
    }
}


---

## GLSL Key

`See database.json for shader translation`
