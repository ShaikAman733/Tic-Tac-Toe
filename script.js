let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector(".newgame");
let msg = document.querySelector("#msg");
let statusDisplay = document.querySelector("#status");

let turnO = true;
let gameCount = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const updateStatus = () => {
  statusDisplay.innerText = `Player ${turnO ? "O" : "X"}'s Turn`;
};

const resetGame = () => {
  turnO = true;
  gameCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  updateStatus();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `The Winner is ${winner} 🏆`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  statusDisplay.innerText = "";
};

const showDraw = () => {
  msg.innerText = `It's a Draw! 🤝`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  statusDisplay.innerText = "";
};

const checkWinner = () => {
  let isWinner = false;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      isWinner = true;
      break;
    }
  }

  if (!isWinner && gameCount === 9) {
    showDraw();
  }
};

const animateButton = (button) => {
  gsap.to(button, {
    opacity: 0,
    duration: 0.1,
    repeat: 3,
    yoyo: true,
    ease: "power1.inOut"
  });
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    turnO = !turnO;
    gameCount++;
    updateStatus();
    checkWinner();
    gsap.to(box, { y: -30, duration: 0.3, yoyo: true, repeat: 1, ease: "power10.out" });
  });
});

resetBtn.addEventListener('click', () => {
  animateButton(resetBtn);
  resetGame();
});

newGameBtn.addEventListener('click', () => {
  animateButton(newGameBtn);
  resetGame();
});

updateStatus();