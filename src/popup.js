'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.popup');
        this.popUpRefresh = document.querySelector('.popup__refresh');
        this.popUpMessage = document.querySelector('.popup__message');
        this.popUpRefresh.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    // 팝업 클릭시 이걸 호출한다.
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpMessage.innerText = text; // 텍스트 가져오기
        this.popUp.classList.remove('popup--hide');
    }

    // 다시 시작할 때 팝업 없애기
    hide() {
        this.popUp.classList.add('popup--hide');
    }
}

