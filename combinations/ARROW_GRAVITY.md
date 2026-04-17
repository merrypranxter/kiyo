# Arrow Gravity

**ID:** `ARROW_GRAVITY`

**Ingredients:** [[ARROW_FIELD_FLOW]] + [[DROP_RING_GRAVITY]]

**Result:** Directional gravity flow visualization

---

## Description

Arrows point in the direction of gravity field lines while rings fall along them. Visualizes force fields.

---

## How To


1. Define gravity sources
2. Calculate arrow directions from field
3. Spawn rings at arrow origins
4. Rings follow arrow directions


---

## GLSL Hint


// Gravity field
vec2 gravityField(vec2 pos) {
    vec2 g = vec2(0);
    for each source:
        vec2 dir = source.pos - pos;
        g += normalize(dir) * source.strength / length(dir);
    return g;
}
// Arrow points along g, ring accelerates along g


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
