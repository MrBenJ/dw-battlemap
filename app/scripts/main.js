class MapState {
  constructor() {

    this.state = {};

    this.setColor = this.setColor.bind(this);
    this.getState = this.getState.bind(this);
  }

  setColor(color) {
    this.state.mode = 'draw';
    this.state.color = color;
  }

  getState() {
    return this.state;
  }
}
const app = new MapState();
const CANVAS = document.getElementById('canvas');

/**
 * Gets all the available colors in an array
 * @return {Array<HTMLDivElement>}
 */
function getColorsArray() {
  return Array.from(document.getElementsByClassName('color'));
}

/**
 * Clears the app's state and draw panel of a selected color
 * @return {undefined}
 */
function clearColorSelection() {
  getColorsArray().forEach( el => el.classList.remove('selected'));
  app.state.mode = '';
  app.state.color = '';
}

/**
 * Sets the app's state to "draw" plus the color to draw with
 * @return {undefined}
 */
function selectColor() {
  clearColorSelection();
  const { value: color } = this.dataset;

  if (color === 'clear') { return; }

  this.classList.add('selected');
  app.setColor(color);
  console.log(app.getState());
}

function draw() {

}

function onCanvasInteract(eventType, DOMEvent) {
  console.log(eventType);
}

function init() {
  // Setup color selector
  const colors = getColorsArray();
  colors.forEach( el =>
    el.addEventListener('click', selectColor.bind(el))
  );

  CANVAS.addEventListener('mousedown', event => {
    onCanvasInteract('mousedown', event);
  });

  CANVAS.addEventListener('mouseup', event => {
    onCanvasInteract('mouseup', event);
  });

  CANVAS.addEventListener('click', event => {
    onCanvasInteract('click', event);
  });


}

init();
