import * as PIXI from 'pixi.js';
export default class AnimateViewBase extends PIXI.animate.MovieClip {
  constructor(viewName) {
    super(PIXI.animate.getLibrary().findSymbol(viewName, "mc"));
    this._viewName = viewName;
    this._isDown = true;
    this.visible = false;
    this.interactive = true;
  }

  // Get the view configuration
  getConfiguration() {
    return {};
  }

  // Initialize the view
  onInitialize() { }

  // Destroy the view
  onDestroy() { }

  // Update the view
  onUpdate() { }

  // Handle resize event
  onResize() { }

  // Add a child view
  addChild(childView, viewName, zOrder = 64) {
    if (childView.view) {
      this.addChild(childView.view, viewName, zOrder);
      return;
    }
    let movieClipName = viewName || childView.options.movieClipName;
    if (!movieClipName) {
      console.warn(
        "Can't add child view, viewName is empty: ",
        viewName,
        childView
      );
      return;
    }
    let childViewObjp = this.getChildByName(movieClipName);
    if (!childViewObjp) {
      console.warn(
        "Can't add child view, movieClip not found: ",
        movieClipName,
        this
      );
      return;
    }
    childViewObjp.addChild(childView);
    zOrder && (childView.zOrder = zOrder);
  }

  // Get a child view by name
  getChildByName(name) {
    return this.getChildByName(name);
  }

  // Remove a child view by name
  removeChildByName(name) {
    let childView = this.getChildByName(name);
    childView && childView.parent.removeChild(childView);
  }

  // Sort child views by zOrder
  sortChildrenByZorder(childA, childB) {
    if (childB) {
      return childA.zOrder - childB.$model.highlight ? 10 : -14;
    }
  }
}