var T=Object.defineProperty;var R=(o,e,t)=>e in o?T(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(R(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const y of r.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&l(y)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const i={UP:1,RIGHT:2,DOWN:3,LEFT:4},d=600,f=600,h=30,b=d/h,k=f/h,a={PAUSE:0,RUN:1,STOP:3},P=[{x:12,y:10},{x:11,y:10},{x:10,y:10}];class g{constructor(e){n(this,"body");n(this,"game");n(this,"direction");this.body=[...P],this.direction=void 0,this.game=e}get head(){return{x:this.body[0].x,y:this.body[0].y}}grow(){const e=this.body[this.body.length-1];this.body.push({...e})}setDirection(e){this.direction===i.UP&&e===i.DOWN||this.direction===i.DOWN&&e===i.UP||this.direction===i.LEFT&&e===i.RIGHT||this.direction===i.RIGHT&&e===i.LEFT||(this.direction=e)}draw(e){e.fillStyle="#D9F9A5",e.strokeStyle="#b6d77f",this.body.forEach(t=>{const l=t.x*h,s=t.y*h;e.fillRect(l,s,h,h),e.strokeRect(l,s,h,h)})}update(){this.direction!==void 0&&(this.move(),this.checkCollision()&&this.game.gameOver())}checkCollision(){const e=this.body[0];for(let t=1;t<this.body.length;t++)if(e.x===this.body[t].x&&e.y===this.body[t].y)return!0;return!1}move(){const e=this.head;let t;switch(this.direction){case i.UP:e.y===0?t={x:e.x,y:b-1}:t={x:e.x,y:e.y-1};break;case i.DOWN:e.y===b-1?t={x:e.x,y:0}:t={x:e.x,y:e.y+1};break;case i.LEFT:e.x===0?t={x:k-1,y:e.y}:t={x:e.x-1,y:e.y};break;case i.RIGHT:e.x===k-1?t={x:0,y:e.y}:t={x:e.x+1,y:e.y};break}t&&(this.body.unshift(t),this.body.pop())}}class O{constructor(e){document.addEventListener("keydown",t=>{switch(t.key){case"ArrowDown":e.snake.setDirection(i.DOWN);break;case"ArrowUp":e.snake.setDirection(i.UP);break;case"ArrowLeft":e.snake.setDirection(i.LEFT);break;case"ArrowRight":e.snake.setDirection(i.RIGHT);break;case"Enter":case"Escape":e.state===a.RUN?e.pause():e.state===a.PAUSE?e.resume():e.state===a.STOP&&e.restart();break}})}}class p{constructor(e){n(this,"width");n(this,"height");n(this,"position");this.width=h,this.height=h,this.position=this.getRandomPosition(e)}draw(e){e.fillStyle="#F6511D",e.strokeStyle="#a72e08";const t=[this.position.x*h,this.position.y*h,this.width,this.height];e.fillRect(...t),e.strokeRect(...t)}getRandomPosition(e){const t=this.getRandomInt(1,k-1),l=this.getRandomInt(1,b-1);let s=!1;return e.snake.body.forEach(r=>{r.x===t&&r.y===l&&(s=!0)}),s?this.getRandomPosition(e):{x:t,y:l}}getRandomInt(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}}class I{constructor(){n(this,"state",a.RUN);n(this,"speed",1);n(this,"snake");n(this,"food");n(this,"bestScore",localStorage.getItem("snakeScore")||0);n(this,"score",0);n(this,"inputHandler");this.snake=new g(this),this.food=new p(this),this.inputHandler=new O(this)}restart(){this.score=0,this.speed=1,this.snake=new g(this),this.food=new p(this),this.state=a.RUN}pause(){this.state=a.PAUSE}resume(){this.state=a.RUN}gameOver(){this.state=a.STOP,this.score>this.bestScore&&this.saveScore()}saveScore(){localStorage.setItem("snakeScore",this.score.toString()),this.bestScore=this.score}draw(e){var t;this.snake.draw(e),(t=this.food)==null||t.draw(e),e.fillStyle="white",e.font="16px Arial",this.state===a.RUN?(e.fillText(`Score: ${this.score}`,10,20),e.fillText(`Best Score: ${this.bestScore}`,10,45)):(this.state===a.STOP||this.state===a.PAUSE)&&(e.fillStyle="rgba(0, 0, 0, 0.5)",e.fillRect(0,0,d,f),e.fillStyle="white",e.font="16px Arial"),this.state===a.STOP?(e.fillText("Game Over",10,20),e.fillText("Press Enter to restart",10,45)):this.state===a.PAUSE&&(e.fillText("Paused",10,20),e.fillText("Press Enter to resume",10,45))}update(){this.state===a.RUN&&(this.snake.update(),this.snake.head.x===this.food.position.x&&this.snake.head.y===this.food.position.y&&(this.snake.grow(),this.food=new p(this),this.score++,this.speed+=.01))}}const A=document.querySelector("#app"),u=document.createElement("canvas");u.width=d;u.height=f;const L=u.getContext("2d"),c=new I;let S,m=Date.now(),w;const E=o=>{if(o===null)return;let t=1e3/(c.speed*10>15?15:c.speed*10);requestAnimationFrame(E.bind(null,o)),S=Date.now(),w=S-m,w>t&&(o.clearRect(0,0,d,f),c.update(),c.draw(o),m=S-w%t)};A.appendChild(u);E(L);