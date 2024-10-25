// Class for handling user input from the keyboard
class Keyboard {
  constructor(modelEvents) {
    this.modelEvents = modelEvents;
    this.buttons = new List();
    this.numberButtons = new List();
    this.backButton = new KeyboardButtonModel("back");
    this.buttonNumber = new KeyboardButtonModel("number");
    this.buttonShift = new KeyboardButtonModel("shift");
    this.buttonSpace = new KeyboardButtonModel("space");
    this.buttonDelete = new KeyboardButtonModel("delete");
    this.buttonEnter = new KeyboardButtonModel("enter");
    this.buttonDot = new KeyboardButtonModel("dot");
    this.buttonComma = new KeyboardButtonModel("comma");
    this.inputText = "";
    this.shiftClicked = true;
    this.capsLock = true;
    this.specialClicked = true;
    this.numberClicked = true;
    this.specialKey = "";
    this.scalePortrait = 0.75;
    this.scaleLandscape = 0.5;
    this.keyboardMode = KeyboardMode.abc;
    this.hideCloseButton = true;
    this.keyboardColors = {
      bg: 9910544,
      bgTop: 16750848,
      buttons: { color: 1788227, over: 7077885 },
      closeButton: { color: 16777215, over: 7077885 }
    };
  }

  // Initialize the keyboard layout based on the current language
  initLayout(languageCode) {
    let currentLayout = layout.en;
    for (let layoutKey in currentLayout)
      if (currentLayout.hasOwnProperty(layoutKey)) {
        let keyData = currentLayout[layoutKey];
        let button = new KeyboardButtonModel(layoutKey);
        (button.key = keyData.key),
          (null != keyData.canBeShift
            ? (button.canBeShift = keyData.canBeShift)
            : (button.canBeShift = false)),
          button.canBeShift &&
          ((button.keyShift = keyData.keyShift || keyData.key.toUpperCase()),
            (button.keyShift = button.keyShift.toUpperCase())),
          (button.special = keyData.special),
          this.buttons.add(button);
      }
    for (let layoutKey in numbersLayout) {
      if (numbersLayout.hasOwnProperty(layoutKey)) {
        let keyData = numbersLayout[layoutKey];
        let button = new KeyboardButtonModel(layoutKey);
        (button.key = keyData.key),
          (button.keyShift = keyData.keyShift || keyData.key),
          (button.canBeShift = false),
          (button.special =
            null != keyData.special ? keyData.special : null),
          this.numberButtons.add(button);
      }
    }
    (this.buttonShift.key = "SHIFT"),
      (this.buttonSpace.key = "SPACE"),
      (this.buttonDelete.key = "BACKSPACE"),
      (this.buttonEnter.key = "ENTER"),
      (this.buttonDot.key = "."),
      (this.buttonComma.keyShift = "."),
      (this.buttonDot.key = ","),
      (this.buttonComma.keyShift = ",");
  }

  // Event triggered when Enter key is pressed
  onEnter() {
    this.modelEvents.dispatch(this, "onEnter");
  }

  // Event triggered when keyboard is closed
  onClose() {
    this.modelEvents.dispatch(this, "onClose");
  }

  // Event triggered when keyboard is shown
  onShow() {
    this.modelEvents.dispatch(this, "onShow");
  }

  // Toggle keyboard mode between letters and numbers
  toggleKeyboardMode() {
    this.keyboardMode === KeyboardMode.abc
      ? (this.keyboardMode = KeyboardMode.number)
      : (this.keyboardMode = KeyboardMode.abc);
  }

  // Change text register based on shift state
  changeTextRegister(shift) {
    this.buttons.forEach(button => {
      button &&
        button.canBeShift &&
        (button.uppercase = shift);
    });
    this.numberButtons.forEach(button => {
      if (button && button.canBeShift) {
        button.uppercase = shift;
      }
    });
  }

  // Set special key
  setSpecialKey(key) {
    let _this = this;
    (this.specialKey = key),
      this.buttons.forEach(button => {
        _this.numberClicked ||
          (button &&
            button.special &&
            button.special[key] &&
            (button.disabled = true),
            button &&
            !button.special &&
            "ENTER" !== button.key &&
            (button.disabled = !("BACKSPACE" === button.key)));
      }),
      (this.specialClicked = !this.specialClicked);
  }

  // Destroy the keyboard model, freeing resources
  destroy() {
    this.buttons.forEach(button => {
      button.destroy();
    });
    this.buttons = void 0;
  }

  // Method for hiding the keyboard
  keyboardHide() { }
}

// Enumeration for keyboard modes
const KeyboardMode = {
  abc: "abc",
  number: "number",
  hide: "hide"
};

// Keyboard button model
export class KeyboardButtonModel {
  constructor(id) {
    this.id = id;
    this.key = "";
    this.keyShift = "";
    this.canBeShift = true;
    this.special = { symbol1: "", symbol2: "", symbol3: "", symbol4: "" };
    this.uppercase = true;
    this.disabled = true;
    this.color = 1788227;
    this.colorOver = 7077885;
  }

  // Method for destroying the button model, freeing resources
  destroy() { }
}
