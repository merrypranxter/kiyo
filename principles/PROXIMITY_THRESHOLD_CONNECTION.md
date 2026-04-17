# Proximity Threshold Connection

**ID:** `PROXIMITY_THRESHOLD_CONNECTION` | **Category:** Spatial | **Weird Factor:** 7/10

## Source

- **Sketch:** Draw line when you get close
- **Date:** 2026-04-15
- **URL:** https://junkiyoshi.com/openframeworks20260415/

---

## Core Mechanic

Instead of physics-based attraction, use pure distance threshold to spawn connections between particles.

## What Makes It Weird

No persistent graph structure - connections exist only in the moment of proximity, creating ephemeral network visualizations.

## The Twist

Lines only exist between points that happen to be close - no memory, no history, just momentary adjacency.

---

## Emotional Quality

**aggressive_cutting** - Creates tension, like drawing a weapon or connecting synapses. The harsh SUBTRACT blend mode makes it feel confrontational.

---

## Variations

- [ ] Variable threshold based on particle size
- [ ] Animated threshold (pulse over time)
- [ ] Color-coded by distance (near=red, far=blue)
- [ ] Curved lines instead of straight
- [ ] Persistent fading connections (memory decay)

---

## Related Principles

- [[VOXEL_GRID_THRESHOLD]] - Both use spatial thresholds for rendering decisions
- [[CIRCLE_PACKING_GROWTH]] - Proximity determines geometric relationships

## Combinations

- [[PROXIMITY_NOISE]] - Noise-Gated Connections
- [[PROXIMITY_MOSAIC]] - Proximity Mosaic

---

## Code Reference


// openFrameworks style pseudocode
for (int i = 0; i < particles.size(); i++) {
    for (int j = i + 1; j < particles.size(); j++) {
        float dist = particles[i].pos.distance(particles[j].pos);
        if (dist < 20) { // threshold
            ofSetColor(255);
            ofDrawLine(particles[i].pos, particles[j].pos);
        }
    }
}
// No persistent connections - just momentary adjacency


---

## GLSL Key

`See database.json for shader translation`
