(function() {
  const gameContainer = document.querySelector('#game-container');
  let pacArray = [
    ['PacMan1.png', 'PacMan2.png'],
  ];

  let imgWidth = 300;
  let pageWidth = gameContainer.clientWidth;
  let direction = 0;
  let focus = 0;
  let intervalId;

  function createPacMan() {
    const img = document.createElement('img');
    img.src = pacArray[0][0];
    img.setAttribute('id', 'PacMan');
    img.style.position = 'relative';
    img.style.left = 0;
    img.style.top = 0;
    img.style.width = imgWidth + "px";
    gameContainer.appendChild(img);
    direction = 1;
    }

let pos = 0;

function startAnimation() {
  console.log('Animation started!');

  createPacMan();
  createDots(); // call the createDots function to add dots to the game container
  
  function checkPageBounds(direction, imgWidth, pos, pageWidth) {
    if (pos > pageWidth - imgWidth) {
      resetPacMan();
      pos = 0;
    } else if (pos < 0) {
      pos = pageWidth - imgWidth;
    }
    return pos;
  }

  function resetPacMan() {
    // Remove the existing PacMan from the game container
    const pacman = document.getElementById('PacMan');
    if (pacman !== null) {
      pacman.remove();
    }
  
    // Recreate the PacMan in its initial position
    pos = 0;
    createPacMan();
  }
  

  let focus = 0;
  let direction = 1;
  const img = document.getElementById('PacMan');

  intervalId = setInterval(() => {
    pos = checkPageBounds(direction, imgWidth, pos, pageWidth);
    if (direction) {
      pos += 20;
      img.src = pacArray[0][focus];
    } else {
      pos -= 20;
      img.src = pacArray[1][focus];
    }
    focus = (focus + 1) % 2;
    img.style.left = pos + 'px';

    detectDotCollision(); // call the detectDotCollision function to check for dot collisions
  }, 300);
}

  
    function createDots() {
      for (let i = 0; i < 1000; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.position = 'absolute';
        dot.style.left = Math.floor(Math.random() * (pageWidth - 50)) + 'px';
        dot.style.top = Math.floor(Math.random() * (gameContainer.clientHeight - 100)) + 100 + 'px';
        gameContainer.appendChild(dot);
      }
    }
    
  
  function removeDot(dot) {
    dot.remove();
  }
  
  function checkCollision() {
    const pacman = document.getElementById('PacMan');
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      const dotRect = dot.getBoundingClientRect();
      const pacmanRect = pacman.getBoundingClientRect();
      if (pacmanRect.left < dotRect.right && pacmanRect.right > dotRect.left &&
          pacmanRect.top < dotRect.bottom && pacmanRect.bottom > dotRect.top) {
        removeDot(dot);
      }
    });
  }

  function detectDotCollision() {
    const pacman = document.getElementById('PacMan');
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      const dotRect = dot.getBoundingClientRect();
      const pacmanRect = pacman.getBoundingClientRect();
      if (pacmanRect.left < dotRect.right && pacmanRect.right > dotRect.left &&
          pacmanRect.top < dotRect.bottom && pacmanRect.bottom > dotRect.top) {
        removeDot(dot);
      }
    });
  }

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', startAnimation);

})();
