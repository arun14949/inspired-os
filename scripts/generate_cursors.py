"""Generate Win95-style cursor PNGs using Pillow pixel art."""
from PIL import Image, ImageDraw

OUTPUT_DIR = "../public/cursors"

BLACK = (0, 0, 0, 255)
WHITE = (255, 255, 255, 255)
GREY = (128, 128, 128, 255)
DARK_GREY = (64, 64, 64, 255)
TRANSPARENT = (0, 0, 0, 0)
SAND_DARK = (128, 100, 50, 255)
SAND_LIGHT = (192, 170, 110, 255)


def generate_arrow():
    """Classic Win95 arrow: white fill, black outline, grey shadow."""
    img = Image.new("RGBA", (32, 32), TRANSPARENT)
    px = img.load()

    # Classic Win95 arrow outline (pixel coordinates)
    # The arrow points top-left, ~12px wide at base, ~19px tall
    outline = [
        (0, 0),
        (0, 1), (1, 1),
        (0, 2), (1, 2), (2, 2),
        (0, 3), (1, 3), (2, 3), (3, 3),
        (0, 4), (1, 4), (2, 4), (3, 4), (4, 4),
        (0, 5), (1, 5), (2, 5), (3, 5), (4, 5), (5, 5),
        (0, 6), (1, 6), (2, 6), (3, 6), (4, 6), (5, 6), (6, 6),
        (0, 7), (1, 7), (2, 7), (3, 7), (4, 7), (5, 7), (6, 7), (7, 7),
        (0, 8), (1, 8), (2, 8), (3, 8), (4, 8), (5, 8), (6, 8), (7, 8), (8, 8),
        (0, 9), (1, 9), (2, 9), (3, 9), (4, 9), (5, 9), (6, 9), (7, 9), (8, 9), (9, 9),
        (0, 10), (1, 10), (2, 10), (3, 10), (4, 10), (5, 10), (6, 10), (7, 10), (8, 10), (9, 10), (10, 10),
        (0, 11), (1, 11), (2, 11), (3, 11), (4, 11), (5, 11), (6, 11), (7, 11), (8, 11), (9, 11), (10, 11), (11, 11),
        (0, 12), (1, 12), (2, 12), (3, 12), (4, 12), (5, 12), (6, 12),
        (0, 13), (1, 13), (2, 13), (3, 13), (4, 13),
        (0, 14), (1, 14), (2, 14), (3, 14), (4, 14), (5, 14),
        (0, 15), (1, 15), (2, 15), (3, 15), (5, 15), (6, 15),
        (0, 16), (1, 16), (2, 16), (6, 16), (7, 16),
        (0, 17), (1, 17), (7, 17), (8, 17),
        (0, 18), (8, 18), (9, 18),
        (9, 19),
    ]

    # Draw black outline border pixels
    border_pixels = set()
    fill_pixels = set()

    # Define the arrow shape properly
    # Black border (outermost)
    border = [
        (0,0),
        (0,1),
        (0,2),
        (0,3),
        (0,4),
        (0,5),
        (0,6),
        (0,7),
        (0,8),
        (0,9),
        (0,10),
        (0,11),
        (0,12),
        (0,13),
        (0,14),
        (0,15),
        (0,16),
        (0,17),
        (0,18),
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5),
        (6,6),
        (7,7),
        (8,8),
        (9,9),
        (10,10),
        (11,11),
        (11,12), (10,12), (9,12), (8,12), (7,12),
        (7,13), (7,14),
        (6,13),
        (5,14), (5,15),
        (8,15), (8,16),
        (9,16), (9,17),
        (10,17), (10,18),
        (10,19), (9,19),
        (8,18),
        (7,17),
        (7,16),
        (6,15),
        (4,13),
        (3,14),
        (2,15),
        (1,16),
        (1,17),
        (1,18),
    ]

    # White fill (interior)
    fill = [
        (1,2), (1,3), (1,4), (1,5), (1,6), (1,7), (1,8), (1,9), (1,10), (1,11), (1,12),
        (1,13), (1,14), (1,15),
        (2,3), (2,4), (2,5), (2,6), (2,7), (2,8), (2,9), (2,10), (2,11), (2,12),
        (2,13), (2,14),
        (3,4), (3,5), (3,6), (3,7), (3,8), (3,9), (3,10), (3,11), (3,12),
        (3,13),
        (4,5), (4,6), (4,7), (4,8), (4,9), (4,10), (4,11), (4,12),
        (5,6), (5,7), (5,8), (5,9), (5,10), (5,11), (5,12), (5,13),
        (6,7), (6,8), (6,9), (6,10), (6,11), (6,12), (6,14),
        (7,8), (7,9), (7,10), (7,11), (7,13), (7,14), (7,15),
        (8,9), (8,10), (8,11), (8,14), (8,15), (8,16), (8,17),
        (9,10), (9,11), (9,15), (9,16), (9,17), (9,18),
        (10,11),
    ]

    for x, y in border:
        if 0 <= x < 32 and 0 <= y < 32:
            px[x, y] = BLACK

    for x, y in fill:
        if 0 <= x < 32 and 0 <= y < 32:
            px[x, y] = WHITE

    img.save(f"{OUTPUT_DIR}/arrow.png")
    print("  arrow.png generated")


def generate_hourglass():
    """Win95 hourglass/wait cursor."""
    img = Image.new("RGBA", (32, 32), TRANSPARENT)
    draw = ImageDraw.Draw(img)

    cx = 7  # center x for the hourglass

    # Top cap
    draw.rectangle([cx-6, 0, cx+6, 1], fill=BLACK)
    draw.rectangle([cx-5, 1, cx+5, 2], fill=BLACK)

    # Top glass outline
    draw.line([(cx-5, 2), (cx-5, 5)], fill=BLACK)
    draw.line([(cx+5, 2), (cx+5, 5)], fill=BLACK)
    # Narrowing
    draw.line([(cx-5, 5), (cx-1, 9)], fill=BLACK)
    draw.line([(cx+5, 5), (cx+1, 9)], fill=BLACK)

    # Waist
    draw.point((cx, 9), fill=BLACK)

    # Bottom glass outline
    draw.line([(cx-1, 9), (cx-5, 13)], fill=BLACK)
    draw.line([(cx+1, 9), (cx+5, 13)], fill=BLACK)
    draw.line([(cx-5, 13), (cx-5, 16)], fill=BLACK)
    draw.line([(cx+5, 13), (cx+5, 16)], fill=BLACK)

    # Bottom cap
    draw.rectangle([cx-5, 16, cx+5, 17], fill=BLACK)
    draw.rectangle([cx-6, 17, cx+6, 18], fill=BLACK)

    # White glass fill - top
    for y in range(3, 5):
        draw.line([(cx-4, y), (cx+4, y)], fill=WHITE)
    # Upper narrowing fill
    for y in range(5, 9):
        half_w = max(0, 4 - (y - 5))
        draw.line([(cx-half_w, y), (cx+half_w, y)], fill=WHITE)

    # Lower expanding fill
    for y in range(10, 13):
        half_w = min(4, (y - 9))
        draw.line([(cx-half_w, y), (cx+half_w, y)], fill=WHITE)
    # White glass fill - bottom
    for y in range(13, 16):
        draw.line([(cx-4, y), (cx+4, y)], fill=WHITE)

    # Sand in bottom half
    for y in range(14, 16):
        draw.line([(cx-3, y), (cx+3, y)], fill=SAND_LIGHT)
    draw.line([(cx-2, 13), (cx+2, 13)], fill=SAND_LIGHT)

    # Sand trickling
    draw.point((cx, 10), fill=SAND_DARK)
    draw.point((cx, 11), fill=SAND_DARK)

    # Sand in top
    draw.line([(cx-3, 3), (cx+3, 3)], fill=SAND_LIGHT)
    draw.line([(cx-2, 4), (cx+2, 4)], fill=SAND_LIGHT)

    img.save(f"{OUTPUT_DIR}/hourglass.png")
    print("  hourglass.png generated")


def generate_pointer():
    """Win95 pointing hand cursor for links/buttons."""
    img = Image.new("RGBA", (32, 32), TRANSPARENT)
    px = img.load()

    # Classic Win95 hand pointer - finger pointing up
    # Black outline, white fill

    border = [
        # Index finger (pointing up)
        (7, 0), (8, 0),
        (6, 1), (9, 1),
        (6, 2), (9, 2),
        (6, 3), (9, 3),
        (6, 4), (9, 4),
        (6, 5), (9, 5),
        (6, 6), (9, 6),
        (6, 7), (9, 7),
        (6, 8), (9, 8), (10, 8), (11, 8),
        (6, 9), (9, 9), (12, 9),
        # Other fingers join
        (6, 10), (9, 10), (10, 10), (12, 10), (13, 10),
        (3, 11), (4, 11), (6, 11), (14, 11),
        (2, 12), (5, 12), (6, 12), (14, 12),
        (2, 13), (14, 13),
        (2, 14), (14, 14),
        (2, 15), (13, 15),
        (3, 16), (13, 16),
        (3, 17), (12, 17),
        (4, 18), (12, 18),
        (4, 19), (11, 19),
        (5, 20), (11, 20),
        (5, 21), (10, 21),
        (6, 22), (10, 22),
        (6, 23), (7, 23), (8, 23), (9, 23), (10, 23),
    ]

    fill_rows = [
        (1, 7, 1, 8, 1),   # y=1, x=7..8
        (2, 7, 1, 8, 1),
        (3, 7, 1, 8, 1),
        (4, 7, 1, 8, 1),
        (5, 7, 1, 8, 1),
        (6, 7, 1, 8, 1),
        (7, 7, 1, 8, 1),
        (8, 7, 1, 8, 1),  (8, 10, 1, 10, 1),
        (9, 7, 1, 8, 1),  (9, 10, 1, 11, 1),
        (10, 7, 1, 8, 1), (10, 11, 1, 12, 1),
        (11, 4, 1, 5, 1), (11, 7, 1, 8, 1), (11, 10, 1, 13, 1),
        (12, 3, 1, 4, 1), (12, 7, 1, 13, 1),
        (13, 3, 1, 13, 1),
        (14, 3, 1, 13, 1),
        (15, 3, 1, 12, 1),
        (16, 4, 1, 12, 1),
        (17, 4, 1, 11, 1),
        (18, 5, 1, 11, 1),
        (19, 5, 1, 10, 1),
        (20, 6, 1, 10, 1),
        (21, 6, 1, 9, 1),
        (22, 7, 1, 9, 1),
    ]

    for x, y in border:
        if 0 <= x < 32 and 0 <= y < 32:
            px[x, y] = BLACK

    for entry in fill_rows:
        y = entry[0]
        for i in range(1, len(entry), 2):
            x_start = entry[i]
            x_end = entry[i+1]
            for x in range(x_start, x_end + 1):
                if 0 <= x < 32 and 0 <= y < 32:
                    px[x, y] = WHITE

    img.save(f"{OUTPUT_DIR}/pointer.png")
    print("  pointer.png generated")


def generate_text():
    """Win95 I-beam text cursor."""
    img = Image.new("RGBA", (32, 32), TRANSPARENT)
    px = img.load()

    cx = 8  # center x
    top = 4
    bottom = 19

    # Top serifs
    for x in range(cx - 3, cx + 4):
        px[x, top] = BLACK
    # Bottom serifs
    for x in range(cx - 3, cx + 4):
        px[x, bottom] = BLACK

    # Vertical shaft
    for y in range(top, bottom + 1):
        px[cx, y] = BLACK

    # Small notches at top and bottom for classic I-beam look
    px[cx - 1, top + 1] = BLACK
    px[cx + 1, top + 1] = BLACK
    px[cx - 1, bottom - 1] = BLACK
    px[cx + 1, bottom - 1] = BLACK

    img.save(f"{OUTPUT_DIR}/text.png")
    print("  text.png generated")


def generate_move():
    """Win95 4-directional move cursor (cross with arrows)."""
    img = Image.new("RGBA", (32, 32), TRANSPARENT)
    draw = ImageDraw.Draw(img)
    px = img.load()

    cx, cy = 8, 8

    # Vertical line
    for y in range(cy - 6, cy + 7):
        px[cx, y] = BLACK
    # Horizontal line
    for x in range(cx - 6, cx + 7):
        px[cx, x] = BLACK  # oops this is wrong

    # Actually let's redraw properly
    img = Image.new("RGBA", (32, 32), TRANSPARENT)
    px = img.load()
    cx, cy = 8, 8

    # Center cross - black outline, white fill
    # Vertical bar (outline)
    for y in range(cy - 6, cy + 7):
        px[cx - 1, y] = BLACK
        px[cx + 1, y] = BLACK
        px[cx, y] = WHITE

    # Horizontal bar (outline)
    for x in range(cx - 6, cx + 7):
        px[x, cy - 1] = BLACK
        px[x, cy + 1] = BLACK
        px[x, cy] = WHITE

    # Fix corners where bars meet
    px[cx - 1, cy - 1] = BLACK
    px[cx + 1, cy - 1] = BLACK
    px[cx - 1, cy + 1] = BLACK
    px[cx + 1, cy + 1] = BLACK

    # Up arrow
    for i in range(3):
        px[cx - 1 - i, cy - 6 + i] = BLACK
        px[cx + 1 + i, cy - 6 + i] = BLACK
        px[cx - i, cy - 6 + i] = WHITE if i > 0 else WHITE
        px[cx + i, cy - 6 + i] = WHITE if i > 0 else WHITE
    px[cx, cy - 6] = BLACK  # tip

    # Down arrow
    for i in range(3):
        px[cx - 1 - i, cy + 6 - i] = BLACK
        px[cx + 1 + i, cy + 6 - i] = BLACK
        px[cx - i, cy + 6 - i] = WHITE if i > 0 else WHITE
        px[cx + i, cy + 6 - i] = WHITE if i > 0 else WHITE
    px[cx, cy + 6] = BLACK  # tip

    # Left arrow
    for i in range(3):
        px[cx - 6 + i, cy - 1 - i] = BLACK
        px[cx - 6 + i, cy + 1 + i] = BLACK
        px[cx - 6 + i, cy - i] = WHITE if i > 0 else WHITE
        px[cx - 6 + i, cy + i] = WHITE if i > 0 else WHITE
    px[cx - 6, cy] = BLACK  # tip

    # Right arrow
    for i in range(3):
        px[cx + 6 - i, cy - 1 - i] = BLACK
        px[cx + 6 - i, cy + 1 + i] = BLACK
        px[cx + 6 - i, cy - i] = WHITE if i > 0 else WHITE
        px[cx + 6 - i, cy + i] = WHITE if i > 0 else WHITE
    px[cx + 6, cy] = BLACK  # tip

    img.save(f"{OUTPUT_DIR}/move.png")
    print("  move.png generated")


if __name__ == "__main__":
    import os
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print("Generating Win95 cursors...")
    generate_arrow()
    generate_hourglass()
    generate_pointer()
    generate_text()
    generate_move()
    print("Done!")
