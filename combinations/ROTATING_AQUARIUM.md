# Rotating Aquarium

**ID:** `ROTATING_AQUARIUM`

**Ingredients:** [[BIDIRECTIONAL_ORBITAL_TRAILS]] + [[TUNNEL_PERSPECTIVE]]

**Result:** Counter-rotating rings inside a perspective tunnel

---

## Description

Place bidirectional orbital trails inside a tunnel perspective. Rings rotate in opposite directions while being pulled through a depth tunnel, creating a hypnotic aquarium-like effect.

---

## How To


1. Create tunnel with Z-depth scaling
2. Place orbital rings at different tunnel depths
3. Counter-rotate adjacent rings
4. Use fat circle trails with alpha fade by depth


---

## GLSL Hint


// Combine tunnel depth with orbital motion
float z = fract(iTime * speed + ringDepth);
float scale = 1.0 / (z + 0.1);
float orbitAngle = iTime * speed * direction;
float x = cos(orbitAngle) * radius * scale + center.x;
float y = sin(orbitAngle) * radius * scale + center.y;
float alpha = ofMap(z, 0, 1, 255, 0);


---

## Variations

- [ ] Reverse combination (apply in opposite order)
- [ ] Add third principle
- [ ] Vary blend mode
- [ ] Animate the combination ratio
