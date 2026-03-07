# Windows 95/98 Cursor Mapping

This document maps the cursor files to their usage in the application.

## Source
- **Original Set**: https://www.rw-designer.com/cursor-set/win-95-98
- **License**: Public Domain
- **Author**: darix555

## Cursor File Mapping

### Currently Used Cursors

| File | Visual | Usage | CSS Reference |
|------|--------|-------|---------------|
| `arrow.cur` | Arrow pointer | Default cursor, clickable elements | `html, *` and interactive elements |
| `Beam.cur` | I-beam | Text selection/input | Text inputs, textarea, terminal |
| `Cursor_3.cur` | Hourglass | Wait/loading state | `.cursor-wait`, page load |
| `Cursor_10.cur` | 4-way arrows | Move/drag | `.cursor-move`, icon dragging |
| `help_win95.cur` | Arrow with ? | Help/info | `[title]:hover`, `.help-cursor` |
| `Cursor_11.cur` | Circle with slash | No/unavailable | `.disabled`, `[disabled]`, `.no-drop` |

### Available Additional Cursors

| File | Visual | Potential Usage |
|------|--------|-----------------|
| `Cursor_4.cur` | I-beam variant | Alternative text cursor |
| `Cursor_5.cur` | Up arrow | Alternate select/up navigation |
| `Cursor_6.cur` | Diagonal NE-SW | Window resize (diagonal) |
| `Cursor_7.cur` | Diagonal NW-SE | Window resize (diagonal) |
| `Cursor_8.cur` | Horizontal E-W | Window resize (horizontal) |
| `Cursor_9.cur` | Vertical N-S | Window resize (vertical) |
| `Cursor_14.cur` | Pen/Writing | Drawing/annotation |
| `Cursor_15.cur` | Hand/Pointing | Alternative link cursor |
| `Cursor_17.cur` | Arrow + CD | Working in background |

## Key Changes from PNG to CUR Format

### Benefits
1. **Embedded hotspots** - No manual X Y coordinates needed in CSS
2. **Native Windows format** - Authentic Windows 95/98 cursors
3. **Browser support** - Modern browsers support .cur natively
4. **Smaller file size** - Optimized cursor format

### CSS Syntax Changes
- **Before (PNG)**: `cursor: url('/cursors/arrow.png') 0 0, auto;`
- **After (CUR)**: `cursor: url('/cursors/arrow.cur'), auto;`

## Win95 Authenticity Note

The same arrow cursor is used for both default and clickable states (buttons, links, etc.). This is authentic to the Windows 95 desktop experience. The hand/pointing cursor became common with web browsers (IE 4+), not in the original Win95 desktop interface.

## Future Enhancements

### Window Resizing
If window resizing is implemented, use these cursors:
- `Cursor_6.cur` - Resize NE-SW corners
- `Cursor_7.cur` - Resize NW-SE corners
- `Cursor_8.cur` - Resize E-W edges
- `Cursor_9.cur` - Resize N-S edges

### Alternative Cursors
- `Cursor_15.cur` - Could be used for external links to differentiate from internal UI
- `Cursor_17.cur` - Could replace hourglass for background tasks that don't block interaction
- `Cursor_14.cur` - Could be used if drawing/annotation features are added

## Files Modified

1. `/app.vue` (lines 247-282) - Global cursor CSS
2. `/nuxt.config.ts` (lines 40-41) - Initial page load cursor
3. `/assets/css/windows/appgrid.css` (lines 38, 43) - Icon cursors

## Backup

Original PNG cursors backed up to: `/public/cursors.backup/`
