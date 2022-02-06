'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
    playSound(carrotSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playBg() {
    playSound(bgSound);
}

export function playBgStop() {
    stopSound(bgSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playWin() {
    playSound(winSound);
}

function playSound(sound) { // carrotSound 받아옴
    sound.play(); // 효과음 재생
    sound.currentTime = 0;
}

function stopSound(sound) {
    sound.pause(); // 브금 끄기
}