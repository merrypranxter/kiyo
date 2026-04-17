# Jun Kiyoshi Weird Principles Database

A structured, cross-referenced database of unusual generative art techniques extracted from [Jun Kiyoshi's](https://junkiyoshi.com/) daily openFrameworks sketches (2016-present).

> **Goal:** Extract the *weird DNA* - not obvious "particles are cool" stuff, but the underlying logic that makes generative art hit different. Built for ingestion by creative coding tools, shader pipelines, and AI art systems.

---

## Stats

- **25 Principles** extracted from 25+ sketches
- **12 Combinations** - hybrid techniques
- **25 GLSL Shaders** - copy-paste ready
- **8 Mood Categories** - emotional matching
- **3 Engine Examples** - Three.js, Unity, Godot
- **71+ Files** total

---

## Quick Start

```bash
# Browse principles
ls principles/

# Copy a shader
cat shaders/glsl/proximity_threshold_connection.frag | pbcopy

# Import bulk data
python tools/bulk_import.py --csv my_new_principles.csv
```

---

## Directory Structure

```
.
├── README.md                           # This file
├── QUICKREF.md                         # Cheat sheet
├── ROADMAP.md                          # Development plan
├── CONTRIBUTING.md                     # How to add principles
├── EXTRACTION_TEMPLATE.md              # Template for new analysis
├── database.json                       # Full structured data
├── manifest.json                       # For agent automation
├── taxonomy_graph.json                 # D3.js visualization data
├── recommendation_engine.json          # Mood -> Principle matching
├── shader_snippets.json                # Copy-paste code blocks
├── principles/                         # 25 markdown files (Obsidian-ready)
│   ├── PROXIMITY_THRESHOLD_CONNECTION.md
│   ├── MODULO_SPAWN_PHASE_SHIFT.md
│   └── ... (25 total)
├── combinations/                       # 12 hybrid techniques
│   ├── PROXIMITY_NOISE.md
│   └── ... (12 total)
├── shaders/
│   └── glsl/                           # 25 .frag files
│       ├── proximity_threshold_connection.frag
│       └── ... (25 total)
├── examples/                           # Engine implementations
│   ├── proximity_threshold_connection.js   # Three.js
│   ├── unity_shader_graph_guide.md
│   └── godot_example.gd
├── tools/                              # Automation
│   ├── bulk_import.py
│   ├── scraper_template.py
│   └── BULK_IMPORT_TEMPLATE.csv
├── categories/                         # Taxonomy docs
├── evolution/                          # Timeline docs
└── cross-references/                   # Artist comparisons
```

---

## The 25 Weird Principles

| # | ID | Name | From Sketch | Category |
|---|-----|------|-------------|----------|
| 1 | PROXIMITY_THRESHOLD_CONNECTION | Proximity Lines | Draw line when you get close | Spatial |
| 2 | MODULO_SPAWN_PHASE_SHIFT | Modulo Phase Spawn | Ripple on ripple | Temporal |
| 3 | BIDIRECTIONAL_ORBITAL_TRAILS | Bidirectional Orbits | A missed connection | Motion |
| 4 | NOISE_MASKED_GEOMETRY | Noise Masked Geo | Sphere by triangles | Geometry |
| 5 | FRAME_SYNCED_SPIRAL_SPAWN | Frame Spiral Spawn | Uzumaki | Temporal |
| 6 | DETERMINISTIC_FRAME_RANDOM | Deterministic Random | Multiple sketches | Pipeline |
| 7 | STEPPED_LIFETIME_ALPHA | Stepped Alpha Fade | Multiple sketches | Rendering |
| 8 | BLEND_MODE_MOOD_MAPPING | Blend Mode Mood | Ripple/Proximity | Rendering |
| 9 | VOXEL_GRID_THRESHOLD | Voxel Threshold | Voxel grid | Spatial |
| 10 | TRAIL_HISTORY_BUFFER | Trail History | Trail sketches | Motion |
| 11 | WIREFRAME_OVERLAY_BLEND | Wireframe Blend | Wireframe sketches | Rendering |
| 12 | FFMPEG_CAPTURE_PIPELINE | FFMPEG Pipeline | Meta-technique | Pipeline |
| 13 | DROP_RING_GRAVITY | Drop Ring Gravity | Drop ring (2025-04-06) | Physics |
| 14 | HEART_GENERATIVE | Generative Heart | Heart on heart (2025-06-18) | Shape |
| 15 | TUNNEL_PERSPECTIVE | Tunnel Perspective | Tunnel (2025-07-15) | Spatial |
| 16 | SWELL_DEFORMATION | Swell Deformation | Swell (2026-03-30) | Deformation |
| 17 | TWO_FRAME_ANIMATION | Two Frame Strobe | 2 frame (2025-12-29) | Animation |
| 18 | PRINT_TEXT_GENERATIVE | Generative Text | PRINT 10 (2025-07-01) | Typography |
| 19 | RAMPAGING_TORUS_KNOT | Torus Knot Chaos | Rampaging torus (2023-03-24) | 3D Topology |
| 20 | ALTERNATE_TORUS_FLIP | Torus Flip | Alternate torus (2023-09-12) | 3D Topology |
| 21 | HEXAGONAL_TILE_MORPH | Hex Tile Morph | Hexagon sketches | Geometry |
| 22 | CIRCLE_PACKING_GROWTH | Circle Packing | Circle packing sketches | Spatial |
| 23 | MOSAIC_RECONSTRUCTION | Mosaic Rebuild | Mosaic sketches | Geometry |
| 24 | ARROW_FIELD_FLOW | Arrow Flow | Arrow sketches | Motion |
| 25 | RIBBON_TWIST_DEFORM | Ribbon Twist | Ribbon sketches | Deformation |

---

## The 12 Combinations

| Combination | Ingredients | Result |
|-------------|-------------|--------|
| Noise-Gated Connections | PROXIMITY + NOISE_MASK | Lines only in noise-threshold zones |
| Two-Tone Echo | MODULO + STEPPED_ALPHA | Dual-phase ripples with fade |
| Rotating Aquarium | BIDIRECTIONAL + TUNNEL | Counter-rotating tunnel rings |
| Technical Cutaway | WIREFRAME + NOISE_MASK | Blueprint + selective reveal |
| Gravity Well Orbit | DROP_RING + BIDIRECTIONAL | Rings that attract and repel |
| Strobe Heartbeat | TWO_FRAME + HEART | Pulsing generative heart |
| Textual Swell | PRINT_TEXT + SWELL | Typography that inflates |
| Torus Voxelizer | RAMPAGING_TORUS + VOXEL | 3D printed torus knots |
| Proximity Mosaic | PROXIMITY + MOSAIC | Tile connections by nearness |
| Spiral Ribbon | FRAME_SPIRAL + RIBBON | Twist along spiral path |
| Hex Tunnel | HEX_TILE + TUNNEL | Hexagonal perspective tunnel |
| Arrow Gravity | ARROW_FIELD + DROP_RING | Directional gravity flow |

---

## For Your App

### Ingest the Database
```javascript
const db = require('./database.json');

// Find principles by mood
const ethereal = db.principles.filter(p => p.emotional_quality === 'ethereal');

// Get shader code
const shader = db.principles[0].shader_translation.glsl;

// Follow combinations
const combo = db.combinations[0].ingredients; // ['PROXIMITY', 'NOISE_MASK']
```

### Mood Matching
```javascript
const rec = require('./recommendation_engine.json');
// rec.moods.ethereal_glow.principles -> ['MODULO_SPAWN', 'FRAME_SPIRAL', ...]
```

---

## Source

- **Artist:** Jun Kiyoshi (Kiyoshi Jun)
- **Site:** [junkiyoshi.com](https://junkiyoshi.com/)
- **Blog:** [Programming de Doodle](https://junkiyoshi.com/) (プログラミング de 落描き)
- **First Sketch:** December 16, 2016
- **Total Sketches:** ~3,000+ (and counting daily)

---

## License

Principles are extracted observations. Original art and code by Jun Kiyoshi.
This database is for educational and inspirational purposes.
