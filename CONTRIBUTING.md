# Contributing to Jun Kiyoshi Weird Principles Database

## How to Add a New Principle

### Option 1: Use the Template
1. Copy `EXTRACTION_TEMPLATE.md`
2. Fill in all sections
3. Name file: `principles/YOUR_PRINCIPLE_ID.md`
4. Add shader: `shaders/glsl/your_principle_id.frag`
5. Update `database.json`
6. Submit PR

### Option 2: Bulk Import
1. Fill out `tools/BULK_IMPORT_TEMPLATE.csv`
2. Run: `python tools/bulk_import.py --csv your_file.csv`
3. Review generated files
4. Submit PR

### Option 3: Auto-Scrape
1. Adapt `tools/scraper_template.py` for target URL
2. Run scraper
3. Clean up output
4. Submit PR

## Principle ID Naming

Format: `DESCRIPTOR_ACTION_NOUN`

Examples:
- `PROXIMITY_THRESHOLD_CONNECTION`
- `MODULO_SPAWN_PHASE_SHIFT`
- `NOISE_MASKED_GEOMETRY`

Rules:
- ALL_CAPS
- Underscore separated
- Max 3 segments
- Descriptive of the WEIRD part

## Required Sections

Every principle MUST have:
- [ ] ID and name
- [ ] Source sketch (with date + URL)
- [ ] Core mechanic description
- [ ] What makes it weird
- [ ] GLSL shader translation
- [ ] Emotional quality
- [ ] Variations checklist
- [ ] Related principles (wiki-links)

## Shader Standards

- GLSL 3.0 compatible
- Use standard inputs: `iTime`, `iResolution`, `iMouse`
- Include comments explaining the weird part
- Test on [Shadertoy](https://shadertoy.com) or equivalent

## Review Criteria

- Is the principle actually WEIRD? (not obvious)
- Is it extractable from Kiyoshi's work? (not fabricated)
- Is the shader functional? (compiles and runs)
- Are cross-references accurate?

## Code of Conduct

- Don't steal art - extract principles
- Credit Kiyoshi's original sketches
- Be weird, be kind
