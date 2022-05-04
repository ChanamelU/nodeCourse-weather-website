console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#p1");
const messageTwo = document.querySelector("#p2");

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchElement.value;
  messageOne.textContent = 'Checking the weather for ' + location + '...';
  messageTwo.textContent = '';
  

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageTwo.textContent = data.forecast;
        messageOne.textContent = data.location;
        console.log(data.address);
      }
    });
  });
});
