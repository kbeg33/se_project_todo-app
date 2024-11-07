class Popup {
    constructor({ popupSelector }) {
        this._popupEl = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popupEl.querySelector(".popup__close");
    }  

    open() {
        this._popupEl.classList.add("popup_visible");
        document.addEventListener("keyup", this._handleEscapeClose);
    }

    close() {
        this._popupEl.classList.remove("popup_visible");
        document.removeEventListener("keyup", this._handleEscapeClose);
    }

    _handleEscapeClose = (evt) => {
        if (evt.key === "Escape") {
          this.close();
          console.log("key has pressed");
        }
      }


    setEventListeners() {
        this._popupEl.addEventListener("mousedown", (evt) => {
          if (
            evt.target.classList.contains("popup__close") ||
            evt.target.classList.contains("popup")
          ) {
            this.close();
          }
        });
    }
}

export default Popup;