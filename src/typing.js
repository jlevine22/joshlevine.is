export default function typeText(text, speed) {
  speed = speed || 50;
  let keyPressEvent = dispatchKeyPressEvent(text.charAt(0), speed);
  for (let i = 1; i < text.length; i++) {
    keyPressEvent = keyPressEvent.then(() => {
      return dispatchKeyPressEvent(text.charAt(i), speed);
    });
  }
  return keyPressEvent;
}

export function dispatchKeyPressEvent(char, delay) {
  delay = delay || 0;
  var event = new Event("keypress");
  event.key = char;    // just enter the char you want to send
  event.keyCode = event.key.charCodeAt(0);
  event.which = event.keyCode;
  event.altKey = false;
  event.ctrlKey = true;
  event.shiftKey = false;
  event.metaKey = false;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.dispatchEvent(event);
      resolve(event);
    }, delay);
  });
}