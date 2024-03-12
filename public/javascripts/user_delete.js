document
  .getElementById("deleteForm")
  .addEventListener("submit", function (event) {
    const password = prompt("Please enter your password to confirm deletion:");
    if (password !== null) {
      document.getElementById("password").value = password;
    } else {
      event.preventDefault();
    }
  });
