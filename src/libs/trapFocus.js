/**
 * composition for trap key focus in an element
 * @returns
 */
function trapFocus() {
  let firstTabStop, lastTabStop;
  let focusableElements = [];

  function setupFocusTrap(elm) {
    if (typeof elm === 'undefined') {
      return;
    }
    // Find all focusable children
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], [role="button"]';

    focusableElements = elm.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);
    firstTabStop = focusableElements[0];
    lastTabStop = focusableElements[focusableElements.length - 1];

    // Focus first child
    firstTabStop.focus();
  }

  function trapTabKey(e) {
    // Check for TAB key press
    if (e.keyCode === 9) {
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }
      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement.isEqualNode(firstTabStop)) {
          e.preventDefault();
          lastTabStop.focus();
        }

        // TAB
      } else {
        // eslint-disable-next-line no-lonely-if
        if (document.activeElement.isEqualNode(lastTabStop)) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }
  }

  return { trapTabKey, setupFocusTrap };
}

export default trapFocus;
