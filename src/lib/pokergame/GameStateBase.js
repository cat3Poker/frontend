// Base class for game states
class GameStateBase {
  constructor(stateId) {
    this._stateChangeRequestEvent = new Event("stateChangeRequest");
    this.shouldSaveOnInterrupt = true;
    this._gameplayModel = null;
    this._stateId = stateId;
  }

  // Trigger a state change request event
  _triggerStateChangeRequest() {
    document.dispatchEvent(this._stateChangeRequestEvent);
  }

  // Force a state change request
  forceStateChangeRequest() {
    this._triggerStateChangeRequest();
  }

  // Update the state
  update(deltaTime, gameplayModel) {
    return this._updateState(deltaTime, gameplayModel);
  }

  // Get the state ID
  GetStateID() {
    return this._stateId;
  }
}