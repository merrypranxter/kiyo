#!/usr/bin/env python3
"""
Scraper template for extracting principles from junkiyoshi.com

Usage:
    python scraper_template.py --url https://junkiyoshi.com/openframeworks20260101/ [--output principle.md]

Requirements:
    pip install requests beautifulsoup4

Adapt this template for specific page structures.
"""

import argparse
import re
import sys
from urllib.parse import urljoin

# Optional imports - install if needed
try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Install dependencies: pip install requests beautifulsoup4")
    sys.exit(1)


BASE_URL = "https://junkiyoshi.com/"


def fetch_page(url):
    """Fetch page content with retries."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (compatible; PrincipleBot/1.0)'
    }
    for attempt in range(3):
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            resp.raise_for_status()
            return resp.text
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
    return None


def extract_code(html):
    """Extract code blocks from page."""
    soup = BeautifulSoup(html, 'html.parser')

    # Look for code blocks
    code_blocks = []
    for pre in soup.find_all('pre'):
        code = pre.get_text()
        code_blocks.append(code)

    # Also check for gist embeds
    for script in soup.find_all('script', src=re.compile('gist')):
        gist_url = script.get('src', '')
        if gist_url:
            gist_id = gist_url.split('/')[-1].split('.')[0]
            code_blocks.append(f"// Gist: {gist_id}")

    return code_blocks


def extract_title(html):
    """Extract sketch title from page."""
    soup = BeautifulSoup(html, 'html.parser')
    title_tag = soup.find('title')
    if title_tag:
        return title_tag.get_text().strip()
    h1 = soup.find('h1')
    if h1:
        return h1.get_text().strip()
    return "Unknown Sketch"


def extract_date(html, url):
    """Extract date from URL or page content."""
    # Try URL pattern: openframeworks20260101
    match = re.search(r'(\d{4})(\d{2})(\d{2})', url)
    if match:
        year, month, day = match.groups()
        return f"{year}-{month}-{day}"

    # Try from page content
    soup = BeautifulSoup(html, 'html.parser')
    time_tag = soup.find('time')
    if time_tag:
        return time_tag.get('datetime', '')

    return "Unknown"


def detect_principles(code_blocks):
    """Analyze code to detect which principles are used."""
    principles_found = []
    full_code = '\n'.join(code_blocks).lower()

    patterns = {
        'PROXIMITY_THRESHOLD_CONNECTION': [r'distance.*<.*threshold', r'getclose', r'line.*close'],
        'MODULO_SPAWN_PHASE_SHIFT': [r'%.*\d+', r'mod.*frame', r'phase'],
        'BIDIRECTIONAL_ORBITAL_TRAILS': [r'direction.*-?1', r'counter.*rotat', r'orbit'],
        'NOISE_MASKED_GEOMETRY': [r'ofnoise.*>', r'noise.*threshold', r'inset'],
        'FRAME_SYNCED_SPIRAL_SPAWN': [r'ofgetframenum', r'spiral', r'uzumaki'],
        'DETERMINISTIC_FRAME_RANDOM': [r'ofseedrandom', r'seed.*random'],
        'STEPPED_LIFETIME_ALPHA': [r'life.*0\.5', r'step.*alpha'],
        'BLEND_MODE_MOOD_MAPPING': [r'blendmode', r'of_blendmode'],
        'VOXEL_GRID_THRESHOLD': [r'voxel', r'grid.*noise'],
        'TRAIL_HISTORY_BUFFER': [r'trail', r'history', r'deque'],
        'WIREFRAME_OVERLAY_BLEND': [r'wireframe', r'barycentric'],
        'DROP_RING_GRAVITY': [r'ring.*gravity', r'drop.*ring'],
        'HEART_GENERATIVE': [r'heart', r'love'],
        'TUNNEL_PERSPECTIVE': [r'tunnel', r'perspective.*divide'],
        'SWELL_DEFORMATION': [r'swell', r'displace.*normal'],
        'TWO_FRAME_ANIMATION': [r'2frame', r'twoframe', r'flip.*frame'],
        'PRINT_TEXT_GENERATIVE': [r'print.*text', r'font.*path'],
        'RAMPAGING_TORUS_KNOT': [r'torusknot', r'p.*q.*torus'],
        'ALTERNATE_TORUS_FLIP': [r'flip.*normal', r'insideout'],
        'HEXAGONAL_TILE_MORPH': [r'hexagon', r'hex.*grid'],
        'CIRCLE_PACKING_GROWTH': [r'circle.*pack', r'packing'],
        'MOSAIC_RECONSTRUCTION': [r'mosaic', r'tile.*assembl'],
        'ARROW_FIELD_FLOW': [r'arrow', r'field.*flow'],
        'RIBBON_TWIST_DEFORM': [r'ribbon', r'twist.*curve'],
    }

    for principle_id, regexes in patterns.items():
        for regex in regexes:
            if re.search(regex, full_code):
                principles_found.append(principle_id)
                break

    return principles_found


def generate_output(title, date, url, code_blocks, principles_found):
    """Generate extraction output."""
    output = f"""# Extraction Result

## {title}

- **Date:** {date}
- **URL:** {url}
- **Principles Detected:** {', '.join(principles_found) if principles_found else 'None'}

---

## Code Blocks Found

"""
    for i, code in enumerate(code_blocks):
        output += f"### Block {i + 1}\n\n"
        output += f"```cpp\n{code[:2000]}\n```\n\n"

    output += """---

## Analysis Notes

"""
    if principles_found:
        for pid in principles_found:
            output += f"- Confirms use of [[{pid}]]\n"
    else:
        output += "- No known principles detected. Manual analysis needed.\n"
        output += "- Check for new/weird techniques worth cataloging.\n"

    output += """
## Next Steps

1. Review code blocks for unusual patterns
2. Compare with EXTRACTION_TEMPLATE.md
3. Create new principle file if needed
4. Add GLSL translation
5. Update database.json
"""

    return output


def main():
    parser = argparse.ArgumentParser(description='Scrape Kiyoshi sketch page')
    parser.add_argument('--url', required=True, help='Sketch page URL')
    parser.add_argument('--output', help='Output file (default: stdout)')
    args = parser.parse_args()

    print(f"Fetching: {args.url}", file=sys.stderr)
    html = fetch_page(args.url)
    if not html:
        print("Failed to fetch page", file=sys.stderr)
        sys.exit(1)

    title = extract_title(html)
    date = extract_date(html, args.url)
    code_blocks = extract_code(html)
    principles_found = detect_principles(code_blocks)

    output = generate_output(title, date, args.url, code_blocks, principles_found)

    if args.output:
        with open(args.output, 'w') as f:
            f.write(output)
        print(f"Output written to: {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == '__main__':
    main()
