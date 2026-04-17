# Drop Ring Gravity

**ID:** `DROP_RING_GRAVITY` | **Category:** Physics | **Weird Factor:** 7/10

## Source

- **Sketch:** Drop ring
- **Date:** 2025-04-06
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Rings fall under gravity and stack/collide with each other.

## What Makes It Weird

Simple rigid body stacking but with rings (hollow objects) creates unexpected wobble and roll behaviors.

## The Twist

Rings can tilt and roll off each other rather than just stacking flat - emergent physics behavior.

---

## Emotional Quality

**playful_fun** - Satisfying like stacking coins or watching water droplets merge. Playful physics.

---

## Variations

- [ ] Different ring sizes
- [ ] Rotational physics (spin when hit)
- [ ] Multiple gravity sources
- [ ] Rings that shatter on hard impact
- [ ] Magnetic rings (attract/repel)

---

## Related Principles

- [[BIDIRECTIONAL_ORBITAL_TRAILS]] - Orbital motion patterns

## Combinations

- [[GRAVITY_WELL_ORBIT]] - Gravity Well Orbit
- [[ARROW_GRAVITY]] - Arrow Gravity

---

## Code Reference


// Ring physics
struct Ring {
    ofVec2f pos, vel;
    float radius, rotation;
};

void update() {
    for (auto& ring : rings) {
        ring.vel.y += gravity; // apply gravity
        ring.pos += ring.vel;

        // Ring-ring collision
        for (auto& other : rings) {
            if (&ring == &other) continue;
            float dist = ring.pos.distance(other.pos);
            float minDist = ring.radius + other.radius;
            if (dist < minDist) {
                ofVec2f normal = (ring.pos - other.pos).getNormalized();
                float overlap = minDist - dist;
                ring.pos += normal * overlap * 0.5;
                ring.vel += normal * stiffness;
            }
        }
        // Floor collision
        if (ring.pos.y > floorY) {
            ring.pos.y = floorY;
            ring.vel.y *= -0.6; // bounce
        }
    }
}


---

## GLSL Key

`See database.json for shader translation`
