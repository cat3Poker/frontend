// Game state machine class
class GameStateMachine {
  constructor() {
    this._stateList = {};
    this._activeStateId = -1;
    this._interrupted = true;
  }

  // Start the state machine
  start() {
    this._interrupted = false;
  }

  // Halt the state machine
  halt() {
    this._interrupted = true;
  }

  // Register a new state
  registerState(state) {
    this._stateList[state.GetStateID()] = state;
    this._stateList[state.GetStateID()].initialize();
  }

  // Change to a specific state
  changeState(stateId, previousStatePayload = null, gameplayModel = null) {
    if (GameStateMachine.currentState >= 0) {
      stateId = GameStateMachine.currentState;
    }
    if (this._stateList[stateId]) {
      this._stateList[stateId].startState(previousStatePayload, gameplayModel);
      this._activeStateId = stateId;
    }
  }

  // Process a message and transition to the next state
  updateState(message, param = null) {
    if (!this._interrupted) {
      if (this._interrupted) {
        this._stateList[this._activeStateId].interrupt();
      }
      this._startNextState(
        this._stateList[this._activeStateId].updateState(message, param),
        param
      );
      return false;
    }
  }

  // Change to the next state
  goToState(nextStateId, param = null) {
    if (nextStateId > 0) {
      let previousStatePayload = null;
      if (this._stateList[this._activeStateId]) {
        previousStatePayload = this._stateList[
          this._activeStateId
        ].endState(param);
      }
      this._activeStateId = nextStateId;
      if (this._stateList[this._activeStateId]) {
        this._stateList[this._activeStateId].startState(
          previousStatePayload,
          param
        );
      }
    }
  }

  // Check if the state machine is halted
  isHaulted() {
    if (this._activeStateId < 0 || !this._stateList[this._activeStateId]) {
      this._activeStateId = -1;
      return true;
    }
  }

  // Post a message to the active state
  postMessageToActiveState(message, param) {
    if (!this.isHaulted()) {
      this._stateList[this._activeStateId].handleMessage(message, param);
    }
  }

  // Get the active state ID
  getActiveStateId() {
    return this._activeStateId;
  }

  // Start the next state
  _startNextState(nextStateId, param) {
    if (nextStateId !== 0) {
      let previousStatePayload = null;
      if (this._stateList[this._activeStateId]) {
        previousStatePayload = this._stateList[
          this._activeStateId
        ].endState(param);
      }
      this._activeStateId = nextStateId;
      if (this._stateList[this._activeStateId]) {
        this._stateList[this._activeStateId].startState(
          previousStatePayload,
          param
        );
      }
    }
  }

  // Default state ID
  static currentState = -1;
}