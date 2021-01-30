const ze = document.querySelector('.ze');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          ze.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      ze.style.bottom = position + 'px';
    }
  }, 20);
}

function createcovid() {
  const covid = document.createElement('div');
  let covidPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  covid.classList.add('covid');
  background.appendChild(covid);
  covid.style.left = covidPosition + 'px';

  let leftTimer = setInterval(() => {
    if (covidPosition < -180) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(covid);
    } else if (covidPosition > 0 && covidPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      covidPosition -= 10;
      covid.style.left = covidPosition + 'px';
    }
  }, 20);

  setTimeout(createcovid, randomTime);
}

createcovid();
document.addEventListener('keyup', handleKeyUp);
