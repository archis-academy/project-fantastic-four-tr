const users = [
  {
    id: "john@example.com",
    password: 123,
  },
  {
    id: "jane@example.com",
    password: "mysecretpassword",
  },
  {
    id: "bob@example.com",
    password: 123456,
  },
];

const inputUserId = document.querySelector("#input-userid");
const inputPassword = document.querySelector("#input-password");
const loginBtn = document.querySelector("#login-btn");
const forgetPassword = document.querySelector("#forget-password");
inputPassword.type = "password";

checkIfInputsEmpty();
inputUserId.addEventListener("input", checkIfInputsEmpty);
inputPassword.addEventListener("input", checkIfInputsEmpty);
loginBtn.addEventListener("click", login);

function checkIfInputsEmpty() {
  loginBtn.disabled = inputUserId.value === "" || inputPassword.value === "";
}
function login() {
  const enteredId = inputUserId.value;
  const enteredPassword = inputPassword.value;
  const user = users.find(
    (u) => u.id == enteredId && u.password == enteredPassword
  );

  if (user) {
    window.location.href = "index.html";
  } else {
    alert("Incorrect username or password. Please try again.");
  }
}
