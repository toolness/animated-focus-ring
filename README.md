This is a simple drop-in script that builds upon
the [WICG `:focus-ring` polyfill][polyfill] by
adding support for animating the focus ring as it moves
around the page.

The behavior is based upon that of the focus ring on the
[WebAIM][] website.

This can be useful for keyboard users who might have a
difficult time seeing where their focus ring has moved to
when they press tab, which can be particularly hard if
focusable elements on the page are spaced far apart.

For a live demonstration, see the [demo page][].

## Prerequisites

* The WICG `:focus-ring` polyfill.

* The script also requires support for CSS transitions and
  a few other APIs present in modern browsers; if they are
  not supported, the script will simply not enable itself
  (i.e., it will not "crash").

## Usage

Add the [animated-focus-ring.js][] script after the
[focus-ring.js][] polyfill. Note that the script
must be initialized *after* the polyfill, or else the
animation won't take place.

By default, you don't need to do anything else, so long as
you have applied your focus styling to the `focus-ring` class.
When the user presses <kbd>Tab</kbd> to move the keyboard
focus around the page, the focus ring will appear to "move"
from one focused element to another.

## Customizing behavior

The script works by creating an absolutely-positioned
`<div>` with the `focus-ring` and `focus-ring-overlay` classes;
this overlay follows position and size of the focused element,
as long as it has the `focus-ring` class. It becomes transparent
when it is done "moving" to a new location.

You can customize the speed and appearance by adding CSS
rules targeting the `focus-ring-overlay` class, e.g.:

```css
.focus-ring-overlay {
  background: rgba(0, 0, 255, 0.25);
  transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s, opacity 0.125s;
}
```

Note that any transitions you define *must* animate `top`,
`left`, `width`, and `height` at minimum. If you don't do this,
the script will define its own CSS transitions, overriding any
that you've defined.

[demo page]: https://toolness.github.io/animated-focus-ring/
[polyfill]: https://github.com/WICG/focus-ring
[WebAIM]: http://webaim.org/
[animated-focus-ring.js]: animated-focus-ring.js
[focus-ring.js]: https://github.com/WICG/focus-ring/blob/gh-pages/src/focus-ring.js
