'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import GameBuilder, { Reason } from './game.js';

// 팝업 클릭 되면 startGame 호출
const gameFinishBanner = new PopUp();

// 배정된 시간, 숫자
const game = new GameBuilder()

.withGameDuration()
.withPotatoCount()
.withWheatCount()
.withBoarCount()
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

