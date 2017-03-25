document.addEventListener('DOMContentLoaded', function() {
  if (!('transition' in document.body.style)) {
    return;
  }

  var DEFAULT_DURATION = '0.25s';
  var DIMENSIONS = ['top', 'left', 'width', 'height'];
  var overlay = null;
  var setOverlayPosition = function(overlay, rect) {
    var didChange = false;
    var currRect = overlay.getBoundingClientRect();

    DIMENSIONS.forEach(function(prop) {
      var newVal = rect[prop];

      if (currRect[prop] !== newVal) {
        didChange = true;
        if (prop === 'top') {
          newVal += window.scrollY;
        } else if (prop === 'left') {
          newVal += window.scrollX;
        }
        overlay.style[prop] = newVal + 'px';
      }
    });

    return didChange;
  };
  var setDefaultOverlayTransitionStyle = function (overlay) {
    var style = window.getComputedStyle(overlay);
    var isInTransition = function(prop) {
      return (style.transitionProperty || '').match(new RegExp(prop));
    };

    if (!DIMENSIONS.every(isInTransition)) {
      overlay.style.transition = DIMENSIONS.map(function(prop) {
        return prop + ' ' + DEFAULT_DURATION;
      }).join(', ');
    }
  };
  var createOverlay = function() {
    var overlay = document.createElement('div');
    document.body.appendChild(overlay);
    overlay.className = 'focus-ring focus-ring-overlay';
    overlay.style.pointerEvents = 'none';
    overlay.style.position = 'absolute';
    overlay.style.opacity = '0';
    setDefaultOverlayTransitionStyle(overlay);
    overlay.addEventListener('transitionend', function(e) {
      if (DIMENSIONS.indexOf(e.propertyName) !== -1) {
        overlay.style.opacity = '0';
      }
    });
    return overlay;
  }

  document.body.addEventListener('focus', function(e) {
    var rect;

    if (e.target.classList.contains('focus-ring')) {
      rect = e.target.getBoundingClientRect();
      if (!overlay) {
        overlay = createOverlay();
        setOverlayPosition(overlay, rect);
      } else if (setOverlayPosition(overlay, rect)) {
        overlay.style.opacity = '1';
      }
    } else {
      if (overlay) {
        document.body.removeChild(overlay);
        overlay = null;
      }
    }
  }, true);
});
