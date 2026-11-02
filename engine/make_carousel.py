"""Render post.json carousel slides to 1080x1350 JPEGs (Instagram API needs JPEG).
Usage: python3 make_carousel.py <post_dir>
"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
post_dir = os.path.abspath(sys.argv[1])
post = json.load(open(os.path.join(post_dir, "post.json"), encoding="utf-8"))
out = os.path.join(post_dir, "carousel")
os.makedirs(out, exist_ok=True)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=1)
    pg.goto("file://" + os.path.join(HERE, "carousel.html"))
    for i in range(len(post["carousel"])):
        pg.evaluate("([p,i]) => window.renderSlide(p,i)", [post, i])
        pg.evaluate("document.fonts.ready")
        png = os.path.join(out, f"{i+1:02d}.png")
        pg.screenshot(path=png)
        jpg = png[:-4] + ".jpg"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", png, "-q:v", "2", jpg], check=True)
        os.remove(png)
    b.close()
print(f"{len(post['carousel'])} slides -> {out}")
