class FormValidator {
    constructor(settings, formEl) {
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._errorClass = settings.errorClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._formEl = formEl;
    }

    _showInputError = (inputElement) => {
      const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (inputElement) => {
      const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);

      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };

    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        return this._showInputError(inputElement);
      } else {
        return this._hideInputError(inputElement);
      }
    }

    _hasInvalidInput = () => {
     return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
      }
    }

    // resetValidation() {
    //   this._formEl.reset();
    //   this._toggleButtonState();
    // }


    resetValidation() {
      this._formEl.reset();
      this._toggleButtonState();
      this._inputList.forEach((inputElement) =>
        this._hideInputError(inputElement)
      );
    }


    // _disableSubmitBtn(){
    //   this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    //   this._submitButtonSelector.disabled = true;
    //   this.resetValidation();
    // }





    _setEventListeners() {
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );
           this._buttonElement = this._formEl.querySelector(
            this._submitButtonSelector,
          );
        
         this._toggleButtonState();
        
          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
            });
          });
    }



    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
     }
    }

export default FormValidator;
