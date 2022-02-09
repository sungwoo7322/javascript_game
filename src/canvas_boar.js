// 'use strict';

// import { Field, ItemType } from './field.js';

// const canvas = document.querySelector('.canvas-field');

// canvas.width = 800;
// canvas.height = 230;
// console.log(canvas.width);

// const ctx = canvas.getContext('2d');

// export default class Circle {
//     constructor(x,y,r) {
//         this.x = x;
//         this.y = y;
//         this.r = r;
//         // this.c = c;

//         // 랜덤 움직이기
//         this.dx = (Math.random() * 4) + 1;
//         this.dy = (Math.random() * 4) + 1;

//         // 한 쪽 방향으로 가지 않고 랜덤하게 움직이게 한다.
//         this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
//         this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        
//         // canvas 도구 준비
//         this.draw = function() {
//             ctx.beginPath();
//             ctx.fillStyle = this.c;
//             ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
//             ctx.fill();
//         }

//         // 움직이는 함수 draw 넣어줌
//         this.animate = function() {
//             this.x += this.dx;
//             this.y += this.dy;

//             // 가장자리에서 튕기기
//             if (this.x + this.r > canvas.width || this.x - this.r < 0) {
//                 this.dx = -this.dx;
//             }
//             if (this.y + this.r > canvas.height || this.y - this.r < 0) {
//                 this.dy = -this.dy;
//             }

//             this.draw();
//         }
//     }
// }

// // 무작위로 생성된 볼 배열
// const balls = [];
// for (let i = 0; i < 20; i++) {
//     let r = Math.floor(Math.random() * 30) + 15;
//     let x = Math.random() * (canvas.width - r * 2) + r;
//     let y = Math.random() * (canvas.height - r * 2) + r;
//     // let c = 'red';
//     balls.push(new Circle(x, y, r));
// }

// // 볼 배열의 길이만큼 움직이는 함수 animate를 업데이트 해 준다.
// function Update() {

//     // 움직일 때 그림자? 잔해? 초기화
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (let i = 0; i < balls.length; i++) {
//         balls[i].animate();
//     }

//     requestAnimationFrame(Update);
// }
// Update();

