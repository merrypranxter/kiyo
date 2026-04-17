# Hex Tunnel

**ID:** `HEX_TUNNEL`

**Ingredients:** [[HEXAGONAL_TILE_MORPH]] + [[TUNNEL_PERSPECTIVE]]

**Result:** Hexagonal perspective tunnel

---

## Description

Hexagonal tiles arranged in a tunnel perspective. Creates a bee-hive like structure stretching into depth.

---

## How To


1. Create hex grid in cylindrical coordinates
2. Apply tunnel perspective (z-depth scaling)
3. Rotate tunnel rings
4. Vary hex deformation by depth


---

## GLSL Hint


// Hex in tunnel
float z = fract(iTime + hexDepth);
float scale = 1.0 / (z + 0.1);
float angle = hexAngle + iTime * rotationSpeed;
vec2 pos = vec2(cos(angle), sin(angle)) * tunnelRadius * scale;
pos += hexOffset * scale;
float alpha = ofMap(z, 0, 1, 255, 50);


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
