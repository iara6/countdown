const dateSection = document.querySelector('.date-section');
const dateItems = document.querySelectorAll('.date-format h4');

let tempDate = new Date();

let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

let futureDate = new Date(tempYear, tempMonth, tempDay + 23, 23, 30, 0);

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const remainingTime = futureTime - today;
  
  /* 1s = 1000ms
     1m = 60s
     1hr = 60min
     1d = 24hr   */
  
  /* convert to ms  */
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = remainingTime / oneDay;
  days = Math.floor(days);
  
  let hours = Math.floor((remainingTime % oneDay) / oneHour);
  let minutes = Math.floor((remainingTime % oneHour) / oneMinute);
  let seconds = Math.floor((remainingTime % oneMinute / 1000))
  
  const values = [days, hours, minutes, seconds];

  /* add zero to number < 10  */
  function format(number) {
    return number < 10 ? `0${number}` : number;
  }

  dateItems.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });
  
  if (remainingTime < 0) {
    clearInterval(countdown);
    dateSection.innerHTML = `<h4 class="expired">Sorry, this event has expired.</h4>`
  }
};

let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();