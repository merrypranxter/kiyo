#!/usr/bin/env python3
"""
Bulk import tool for Kiyoshi Weird Principles Database.

Usage:
    python bulk_import.py --csv principles.csv [--output-dir ../principles]

CSV Format:
    id,name,sketch,date,category,weird_factor,core_mechanic,weird,twist,emotional,emotional_desc,variations,related,combinations

Example row:
    MY_PRINCIPLE,My Principle,Sketch name,2026-01-01,Spatial,7,Core mechanic,What makes it weird,The twist,ethereal,Mood desc,Variation 1|Variation 2,RELATED_ID,COMBO_ID
"""

import argparse
import csv
import json
import os
import sys


def generate_principle_md(row):
    """Generate markdown principle file from CSV row."""
    variations = row.get("variations", "").split("|") if row.get("variations") else []
    related = row.get("related", "").split(",") if row.get("related") else []
    combinations = row.get("combinations", "").split(",") if row.get("combinations") else []

    variations_md = "\n".join(f"- [ ] {v.strip()}" for v in variations if v.strip())
    related_md = "\n".join(f"- [[{r.strip()}]]" for r in related if r.strip())
    combinations_md = "\n".join(f"- [[{c.strip()}]]" for c in combinations if c.strip())

    return f"""# {row['name']}

**ID:** `{row['id']}` | **Category:** {row.get('category', 'Unknown')} | **Weird Factor:** {row.get('weird_factor', '5')}/10

## Source

- **Sketch:** {row.get('sketch', 'Unknown')}
- **Date:** {row.get('date', 'Unknown')}
- **URL:** {row.get('url', 'https://junkiyoshi.com/')}

---

## Core Mechanic

{row.get('core_mechanic', 'TODO')}

## What Makes It Weird

{row.get('weird', 'TODO')}

## The Twist

{row.get('twist', 'TODO')}

---

## Emotional Quality

**{row.get('emotional', 'unknown')}** - {row.get('emotional_desc', '')}

---

## Variations

{variations_md if variations_md else '- [ ] Add variations'}

---

## Related Principles

{related_md if related_md else '- (No related principles yet)'}

## Combinations

{combinations_md if combinations_md else '- (No combinations yet)'}

---

## Code Reference

```
// TODO: Add code reference
```

---

## GLSL Key

`See database.json for shader translation`
"""


def generate_shader(row):
    """Generate GLSL shader file from CSV row."""
    name = row['id'].lower()
    return f"""// {row['name']}
// Principle: {row['id']}

uniform float iTime;
uniform vec2 iResolution;

void main() {{
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    
    // TODO: Implement {row['name']} shader
    // Core mechanic: {row.get('core_mechanic', '')[:50]}...
    
    vec3 col = vec3(0.1);
    gl_FragColor = vec4(col, 1.0);
}}
"""


def update_database(row, db_path):
    """Add principle to database.json."""
    if not os.path.exists(db_path):
        print(f"Warning: {db_path} not found, skipping database update")
        return

    with open(db_path, 'r') as f:
        db = json.load(f)

    # Check if already exists
    existing = [p for p in db['principles'] if p['id'] == row['id']]
    if existing:
        print(f"  Principle {row['id']} already in database, skipping")
        return

    new_principle = {
        "id": row['id'],
        "name": row['name'],
        "sketch": row.get('sketch', ''),
        "sketch_date": row.get('date', ''),
        "category": row.get('category', 'Unknown'),
        "weird_factor": int(row.get('weird_factor', 5)),
        "core_mechanic": row.get('core_mechanic', ''),
        "what_makes_it_weird": row.get('weird', ''),
        "the_twist": row.get('twist', ''),
        "emotional_quality": row.get('emotional', ''),
        "glsl_key": "TODO",
        "shader_translation": {"glsl": "// TODO"},
        "variations": [v.strip() for v in row.get("variations", "").split("|") if v.strip()],
        "related": [r.strip() for r in row.get("related", "").split(",") if r.strip()],
        "combinations": [c.strip() for c in row.get("combinations", "").split(",") if c.strip()]
    }

    db['principles'].append(new_principle)
    db['meta']['total_principles'] = len(db['principles'])

    with open(db_path, 'w') as f:
        json.dump(db, f, indent=2)

    print(f"  Added {row['id']} to database")


def main():
    parser = argparse.ArgumentParser(description='Bulk import Kiyoshi principles')
    parser.add_argument('--csv', required=True, help='Path to CSV file')
    parser.add_argument('--output-dir', default='..', help='Output directory for repo')
    parser.add_argument('--update-db', action='store_true', help='Update database.json')
    args = parser.parse_args()

    principles_dir = os.path.join(args.output_dir, 'principles')
    shaders_dir = os.path.join(args.output_dir, 'shaders', 'glsl')
    db_path = os.path.join(args.output_dir, 'database.json')

    os.makedirs(principles_dir, exist_ok=True)
    os.makedirs(shaders_dir, exist_ok=True)

    with open(args.csv, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            principle_id = row['id']
            print(f"Processing: {principle_id}")

            # Write principle markdown
            md_path = os.path.join(principles_dir, f"{principle_id}.md")
            with open(md_path, 'w') as mf:
                mf.write(generate_principle_md(row))
            print(f"  Created {md_path}")

            # Write shader
            shader_name = principle_id.lower() + '.frag'
            shader_path = os.path.join(shaders_dir, shader_name)
            with open(shader_path, 'w') as sf:
                sf.write(generate_shader(row))
            print(f"  Created {shader_path}")

            # Update database
            if args.update_db:
                update_database(row, db_path)

    print("\nImport complete!")


if __name__ == '__main__':
    main()
