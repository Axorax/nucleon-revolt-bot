const button = document.querySelector("#login");
const input = document.querySelector("#pin");

input.addEventListener("change", (e) => {
  handleLogin(e.target.value);
});

button.addEventListener("click", (e) => {
  handleLogin(input.value);
});

function handleLogin(value) {
  fetch("/api/checkpin/" + value)
    .then((res) => res.json())
    .then((data) => {
      if (data.valid == true) {
        window.location.replace(window.location.origin + "/home?pin=" + value);
      } else {
        alert("Invalid pin!");
      }
    });
}
