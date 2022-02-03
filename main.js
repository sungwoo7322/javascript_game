'use strict';

// 랜덤 지정된 x,y축에서 이미지 사이즈만큼
const POTATO_SIZE = 100;
// 배정된 숫자
const POTATO_COUNT = 4;
const WHEAT_COUNT = 4;
const BOAR_COUNT = 4;
// 게임 시간
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); // 필드 x,y 위치 파악
// 게임 시작
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const popUp = document.querySelector('.popup');
const popUpRefresh = document.querySelector('.popup__refresh');
const popUpMessage = document.querySelector('.popup__message');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

// 클릭할 때마다
field.addEventListener('click', onFiledClick);

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp(); // 다시 시작할 때 팝업 없애기
});

function startGame() {
    started = true;
    initGame(); // 버튼 눌렀을 때 아이템 배치
    showStopButton(); // 다시 눌렀을 때 중지
    showtimerAndScore(); // 타이머, 스코어 보이게
    startGameTimer(); // 타이머 시작
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer(); // 타이머 중지
    hideGameButton(); // 시작 버튼 숨김
    showPopUpWithText('다시 할래?');
    playSound(alertSound);
    stopSound(bgSound); // 게임이 끝나면 브금 끄기
}

// 이긴 게임
function finishGame(win) {
    started = false; // 게임 끝
    hideGameButton(); // 게임 버튼 없애기
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win? 'You Win !' : 'You Lost !'); 
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showtimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    // 남아있는 시간 동안만
    let remainingTimeSec = GAME_DURATION_SEC;
    // 업데이트 한다.
    updateTimerText(remainingTimeSec);
    // 전역 변수 timer안에 setInterval api를 사용하여 1초에 한번 업데이트
    timer = setInterval(() => {
        // 남아있는 시간이 0일 경우
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(POTATO_COUNT + WHEAT_COUNT === score);
            return;
        }
        // 남아있는 시간이 0이 아닐 경우 남은 시간이 1초씩 줄어 든다.
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60); // floor은 소수점 자리 처리 함수 // 분
    const seconds = time % 60; // 초
    gameTimer.innerText = `${minutes}:${seconds}`; 
}

function showPopUpWithText(text) {
    popUpMessage.innerText = text; // 텍스트 가져오기
    popUp.classList.remove('popup--hide');
}

function hidePopUp() {
    popUp.classList.add('popup--hide');
}

function initGame() {
    // 스코어 초기화
    score = 0
    // 누를 때마다 필드 초기화
    field.innerHTML = '';
    // 게임 스코어 계산
    gameScore.innerText = POTATO_COUNT + WHEAT_COUNT;
    // 작물과 멧돼지를 생성한 뒤 field에 추가한다.
    // console.log(fieldRect);
    addItem('potato', POTATO_COUNT, 'img/potatoImg.png');
    addItem('wheat', WHEAT_COUNT, 'img/wheatImg.png');
    addItem('boar', BOAR_COUNT, 'img/boarImg.png');
}

function onFiledClick(event) {
    if (!started) {
        return;
    }
    // 필드 내에 있는 전체 아이템들을 가져온다.
    const target = event.target;
    if (target.matches('.potato') || target.matches('.wheat')) {
        target.remove(); // 누른 아이템 필드 제거
        score++; // 스코어 1씩 증가
        playSound(carrotSound); // 효과음
        updateScoreBoard(); // 증가된 스코어 업데이트
        if(score === POTATO_COUNT + WHEAT_COUNT) { // 스코어가 감자 갯수랑 같다면
            finishGame(true); // 게임 승리
        }
    } else if (target.matches('.boar')) {
        finishGame(false);
    }
}

function playSound(sound) { // carrotSound 받아옴
    sound.play(); // 효과음 재생
    sound.currentTime = 0;
}

function stopSound(sound) {
    sound.pause(); // 브금 끄기
}

function updateScoreBoard() {
    // 남은 감자 + 밀 갯수 - 스코어
    gameScore.innerText = POTATO_COUNT + WHEAT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - POTATO_SIZE;
    const y2 = fieldRect.height - POTATO_SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    // 랜덤 배치
    return Math.random() * (max - min) + min;
}