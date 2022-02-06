'use strcit';

import * as sound from './sound.js';
import { Field, ItemType } from './field.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

// 빌더 패턴
export default class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withPotatoCount(num) {
        this.potatoCount = num;
        return this;
    }

    withWheatCount(num) {
        this.wheatCount = num;
        return this;
    }

    withBoarCount(num) {
        this.boarCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.potatoCount,
            this.wheatCount,
            this.boarCount
        )
    }
}

class Game {
    constructor(gameDuration, potatoCount, wheatCount, boarCount) {
        this.gameDuration = gameDuration;
        this.potatoCount = potatoCount;
        this.wheatCount = wheatCount;
        this.boarCount = boarCount;

        // 게임 시작
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });

        this.gameField = new Field(potatoCount, wheatCount, boarCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame(); // 버튼 눌렀을 때 아이템 배치
        this.showStopButton(); // 다시 눌렀을 때 중지
        this.showtimerAndScore(); // 타이머, 스코어 보이게
        this.startGameTimer(); // 타이머 시작
        sound.playBg();
    }

    stop(reason) {
        this.started = false;
        this.stopGameTimer(); // 타이머 중지
        this.hideGameButton(); // 시작 버튼 숨김
        sound.playBgStop(); // 게임이 끝나면 브금 끄기
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === ItemType.potato || item === ItemType.wheat) {
            this.score++; // 스코어 1씩 증가
            this.updateScoreBoard(); // 증가된 스코어 업데이트
            if(this.score === this.potatoCount + this.wheatCount) { // 스코어가 감자 갯수랑 같다면
                this.stop(Reason.win); // 게임 승리
            }
        } else if (item === ItemType.boar) {
            this.stop(Reason.lose);
        }
    }

    
    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }

    showtimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        // 남아있는 시간 동안만
        let remainingTimeSec = this.gameDuration;
        // 업데이트 한다.
        this.updateTimerText(remainingTimeSec);
        // 전역 변수 timer안에 setInterval api를 사용하여 1초에 한번 업데이트
        this.timer = setInterval(() => {
            // 남아있는 시간이 0일 경우
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.stop(this.potatoCount + this.wheatCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            // 남아있는 시간이 0이 아닐 경우 남은 시간이 1초씩 줄어 든다.
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60); // floor은 소수점 자리 처리 함수 // 분
        const seconds = time % 60; // 초
        this.gameTimer.innerText = `${minutes}:${seconds}`; 
    }

    initGame() {
        // 스코어 초기화
        this.score = 0
        // 게임 스코어 계산
        this.gameScore.innerText = this.potatoCount + this.wheatCount;
        // 작물과 멧돼지를 생성한 뒤 field에 추가한다.
        // console.log(fieldRect);

        // 게임 필드에 있는 init 호출 field.js 15번 째 줄
        this.gameField.init();
    }

    updateScoreBoard() {
        // 남은 감자 + 밀 갯수 - 스코어
        this.gameScore.innerText = this.potatoCount + this.wheatCount - this.score;
    }


}
