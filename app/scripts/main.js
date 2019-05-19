class MapState {
  constructor() {

    this.state = {
      mode: '',
      color: '',
      currentToken: null,
      clickState: 'up'
    };

    this.setColor = this.setColor.bind(this);
    this.setClickState = this.setClickState.bind(this);
    this.getState = this.getState.bind(this);
  }

  setColor(color) {
    this.state.mode = 'draw';
    this.state.color = color;
  }

  setClickState(state) {
    this.state.clickState = state;
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
 * @context {HTMLDivElement}
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
  console.log('Drawing!');
}

function onCanvasInteract(eventType, DOMEvent) {
  const state = app.getState();

  switch(eventType) {
    case 'mousedown': {
      app.setClickState('down');

      break;
    }

    case 'mouseup': {
      app.setClickState('up');

      break;
    }

    case 'mousemove': {
      if (state.clickState === 'down') {
        draw();
      }
      break;
    }

    case 'mouseover': {

      break;
    }

    case 'mouseout': {
      app.setClickState('up');
      break;
    }

    case 'click': {

      break;
    }
  }
}

function clearToken() {
  app.state.currentToken = null;
}

function setToken() {

}

function init() {
  // Setup color selector
  const colors = getColorsArray();
  colors.forEach( el =>
    el.addEventListener('click', selectColor.bind(el))
  );

  CANVAS.addEventListener('mousedown', event =>
    onCanvasInteract('mousedown', event)
  );

  CANVAS.addEventListener('mousemove', event =>
    onCanvasInteract('mousemove', event)
  );

  CANVAS.addEventListener('mouseup', event =>
    onCanvasInteract('mouseup', event)
  );

  CANVAS.addEventListener('mouseout', event =>
    onCanvasInteract('mouseout', event)
  );

  CANVAS.addEventListener('mouseover', event =>
    onCanvasInteract('mouseover', event)
  );

  CANVAS.addEventListener('click', event =>
    onCanvasInteract('click', event)
  );


}

init();
