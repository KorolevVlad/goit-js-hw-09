function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyBgColor = document.querySelector('body');

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let colorId = null;

function bodyChangeColor() {
  bodyBgColor.style.backgroundColor = getRandomHexColor();
}

const startColorSwitch = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  colorId = setInterval(() => {
    bodyChangeColor();
  }, 1000);
  //   }
};

const stopColorSwitch = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(colorId);
};

startBtn.addEventListener('click', startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);
