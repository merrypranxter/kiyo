# Gravity Well Orbit

**ID:** `GRAVITY_WELL_ORBIT`

**Ingredients:** [[DROP_RING_GRAVITY]] + [[BIDIRECTIONAL_ORBITAL_TRAILS]]

**Result:** Rings that attract and repel in orbital patterns

---

## Description

Rings fall and stack but also orbit each other gravitationally. Creates a hybrid of physics simulation and choreographed motion.

---

## How To


1. Initialize rings with orbital velocity
2. Apply gravity toward center well
3. Add ring-ring collision
4. Some rings orbit, others fall and stack


---

## GLSL Hint


// Orbital velocity + gravity
vec2 toCenter = center - ring.pos;
float dist = length(toCenter);
// Orbital force perpendicular to center
vec2 orbitDir = vec2(-toCenter.y, toCenter.x) / dist;
ring.vel += orbitDir * orbitStrength;
// Gravity pull
ring.vel += normalize(toCenter) * gravity / (dist * dist);


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
