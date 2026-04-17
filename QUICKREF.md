# Quick Reference - Jun Kiyoshi Weird Principles

## Principle Lookup

### Spatial Principles
| ID | Core Mechanic | Shader Keyword |
|----|-------------|----------------|
| PROXIMITY_THRESHOLD_CONNECTION | distance < threshold -> line | length(), step() |
| VOXEL_GRID_THRESHOLD | 3D grid, noise culls cells | fract(), noise3D() |
| TUNNEL_PERSPECTIVE | Z-depth sprite scaling | perspective divide |
| CIRCLE_PACKING_GROWTH | Grow until collision | distance(), max() |

### Temporal Principles
| ID | Core Mechanic | Shader Keyword |
|----|-------------|----------------|
| MODULO_SPAWN_PHASE_SHIFT | frame % period -> phase | mod(), floor() |
| FRAME_SYNCED_SPIRAL_SPAWN | frame * rate -> angle/spawn | iTime, atan() |
| TWO_FRAME_ANIMATION | flip between 2 states | fract(iTime) > 0.5 |
| DETERMINISTIC_FRAME_RANDOM | seedRandom(frame) -> reproducible | hash(frame) |

### Motion Principles
| ID | Core Mechanic | Shader Keyword |
|----|-------------|----------------|
| BIDIRECTIONAL_ORBITAL_TRAILS | reverse dir on rings | sign(), mod() |
| TRAIL_HISTORY_BUFFER | ring buffer of positions | array, iFrame |
| ARROW_FIELD_FLOW | rotate towards target | atan(), mix() |

### Geometry Principles
| ID | Core Mechanic | Shader Keyword |
|----|-------------|----------------|
| NOISE_MASKED_GEOMETRY | noise > threshold -> render | noise3D(), step() |
| HEXAGONAL_TILE_MORPH | hex grid deformation | hexSDF(), mix() |
| MOSAIC_RECONSTRUCTION | tile assembly/disassembly | floor(), fract() |

### Rendering Principles
| ID | Core Mechanic | Shader Keyword |
|----|-------------|----------------|
| STEPPED_LIFETIME_ALPHA | binary then linear fade | smoothstep(), mix() |
| BLEND_MODE_MOOD_MAPPING | ADD vs SUBTRACT = mood | glBlendFunc() |
| WIREFRAME_OVERLAY_BLEND | triangle edge overlay | fwidth(), edgeDetect |

### Physics/Other
| ID | Core Mechanic | Shader Keyword |
|----|-------------|----------------|
| DROP_RING_GRAVITY | ring falls, stacks | gravity, collision |
| HEART_GENERATIVE | parametric heart shape | pow(), sin() |
| SWELL_DEFORMATION | inflate mesh over time | sin(), length() |
| PRINT_TEXT_GENERATIVE | text as geometry source | text SDF |
| RAMPAGING_TORUS_KNOT | chaotic torus params | cos(), sin(), mod() |
| ALTERNATE_TORUS_FLIP | inside-out surface | face normal flip |
| RIBBON_TWIST_DEFORM | twist along path | cross(), rotate() |
| FFMPEG_CAPTURE_PIPELINE | record + encode | external tool |

---

## Emotional Quality Quick Match

| You Want | Use Principle | Blend Mode |
|----------|--------------|------------|
| Ethereal/Ghostly | MODULO_SPAWN_PHASE_SHIFT | ADD |
| Aggressive/Cutting | PROXIMITY_THRESHOLD_CONNECTION | SUBTRACT |
| Organic/Nature | FRAME_SYNCED_SPIRAL_SPAWN | ALPHA |
| Technical/Sci-Fi | NOISE_MASKED_GEOMETRY | ALPHA |
| Playful/Fun | DROP_RING_GRAVITY | ADD |
| Romantic/Soft | HEART_GENERATIVE | ADD |
| Claustrophobic | TUNNEL_PERSPECTIVE | SUBTRACT |
| Breathing/Living | SWELL_DEFORMATION | ALPHA |
| Retro/Digital | TWO_FRAME_ANIMATION | SUBTRACT |
| Loud/Bold | PRINT_TEXT_GENERATIVE | SUBTRACT |
| Chaotic/Energetic | RAMPAGING_TORUS_KNOT | ADD |
| Mind-Bending | ALTERNATE_TORUS_FLIP | SUBTRACT |

---

## GLSL Snippets

### Proximity Check
```glsl
float dist = length(p1 - p2);
float connect = step(dist, 0.02); // threshold
```

### Modulo Spawn
```glsl
float phase = mod(iTime * speed + float(id) * offset, TWO_PI);
```

### Noise Mask
```glsl
float n = noise3D(pos * scale);
float visible = step(0.4, n) * (1.0 - step(0.6, n));
```

### Stepped Alpha
```glsl
float alpha = life < 0.5 ? 1.0 : smoothstep(0.5, 1.0, life);
```

### Frame Seeded Random
```glsl
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
// hash(vec2(float(id), iTime)) -> deterministic per frame
```
