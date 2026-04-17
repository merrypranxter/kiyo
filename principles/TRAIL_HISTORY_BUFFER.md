# Trail History Buffer

**ID:** `TRAIL_HISTORY_BUFFER` | **Category:** Motion | **Weird Factor:** 6/10

## Source

- **Sketch:** Trail sketches
- **Date:** 2026-03-05
- **URL:** https://junkiyoshi.com/

---

## Core Mechanic

Ring buffer of previous positions to create motion trails.

## What Makes It Weird

Instead of simple motion blur, discrete historical positions create segmented trails with character.

## The Twist

Each segment can have different properties (size, color, alpha) creating gradient trails that tell a story.

---

## Emotional Quality

**nostalgic_tracing** - Like watching someone trace a path with their finger. Memory made visible.

---

## Variations

- [ ] Variable trail length per particle
- [ ] Catmull-Rom spline through history
- [ ] Color gradient along trail
- [ ] Trails that persist after particle dies
- [ ] Ribbons instead of point trails

---

## Related Principles

- [[BIDIRECTIONAL_ORBITAL_TRAILS]] - Both create persistent trails
- [[ARROW_FIELD_FLOW]] - Directional motion visualization

## Combinations

- [[ROTATING_AQUARIUM]] - Rotating Aquarium

---

## Code Reference


// Ring buffer for trails
struct Particle {
    deque<ofVec2f> history; // trail buffer
    ofVec2f pos;
};

void update() {
    for (auto& p : particles) {
        p.history.push_front(p.pos);
        if (p.history.size() > TRAIL_LENGTH) {
            p.history.pop_back();
        }
    }
}

void draw() {
    for (auto& p : particles) {
        for (int i = 0; i < p.history.size() - 1; i++) {
            float alpha = ofMap(i, 0, p.history.size(), 255, 0);
            float weight = ofMap(i, 0, p.history.size(), 3, 0.5);
            ofSetColor(255, alpha);
            ofSetLineWidth(weight);
            ofDrawLine(p.history[i], p.history[i + 1]);
        }
    }
}


---

## GLSL Key

`See database.json for shader translation`
