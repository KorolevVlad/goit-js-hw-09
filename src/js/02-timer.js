import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]')
const day =document.querySelector('span[data-days]')
const hour = document.querySelector('span[data-hours]')
const minute =document.querySelector('span[data-minutes]')
const second=document.querySelector('span[data-seconds]')

startBtn.disabled=true
let intervalId

const options = { 
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < new Date()) {
        return Notiflix.Notify.warning('Please choose a date in the future');
      }
        clearInterval(intervalId);
        startBtn.disabled =false
      function onClickStartBtn() {
        intervalId=setInterval(()=>{
          const deltaTime=selectedDates[0]-new Date()
          if(deltaTime<1000){
            clearInterval(intervalId)
          }
          const finishTime=convertMs(deltaTime)
          updateClock(finishTime)
        },1000)
      }
        startBtn.addEventListener('click', onClickStartBtn)
    }
};  

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addZeroAsSecondNumber(Math.floor(ms / day));
  const hours = addZeroAsSecondNumber(Math.floor((ms % day) / hour));
  const minutes = addZeroAsSecondNumber(Math.floor(((ms % day) % hour) / minute));
  const seconds = addZeroAsSecondNumber(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };

}

function addZeroAsSecondNumber(value) {
    return `${value}`.padStart(2, '0');
}

function updateClock({ days, hours, minutes, seconds }) {
    day.textContent = `${days}`;
    hour.textContent = `${hours}`;
    minute.textContent = `${minutes}`;
    second.textContent = `${seconds}`;
}

