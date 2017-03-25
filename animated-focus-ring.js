document.addEventListener('DOMContentLoaded', function() {
  var DEFAULT_DURATION = '0.25s';
  var DIMENSIONS = ['top', 'left', 'width', 'height'];
  var overlay = null;
  var setOverlayPosition = function(rect) {
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
  }

  document.body.addEventListener('focus', function(e) {
    if (e.target.classList.contains('focus-ring')) {
      if (!overlay) {
        overlay = document.createElement('div');
        document.body.appendChild(overlay);
        overlay.className = 'focus-ring focus-ring-overlay';
        overlay.style.pointerEvents = 'none';
        overlay.style.transition = DIMENSIONS.map(function(prop) {
          return prop + ' ' + DEFAULT_DURATION;
        }).join(', ');
        overlay.style.position = 'absolute';
        overlay.addEventListener('transitionend', function(e) {
          if (DIMENSIONS.indexOf(e.propertyName) !== -1) {
            overlay.style.opacity = '0';
          }
        });
        overlay.style.opacity = '0';
        setOverlayPosition(e.target.getBoundingClientRect());
      } else if (setOverlayPosition(e.target.getBoundingClientRect())) {
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
