'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import GameBuilder, { Reason } from './game.js';

// 팝업 클릭 되면 startGame 호출
const gameFinishBanner = new PopUp();

// 배정된 숫자, 시간
const game = new GameBuilder()
.withGameDuration(5)
.withPotatoCount(3)
.withWheatCount(3)
.withBoarCount(3)
.build();

game.setGameStopListener(reason => {
    let message;
    switch(reason) {
        case Reason.cancel:
            message = 'Replay ?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You Win !';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You Lost !';
            sound.playBug();
            break;
        default:
            throw new  Error('not reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});

