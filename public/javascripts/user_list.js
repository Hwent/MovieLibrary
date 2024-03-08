document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll(
    'input[type="radio"][name="activateUser"]'
  );

  const selectedUser = localStorage.getItem("selectedUser");

  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        localStorage.setItem("selectedUser", this.value);
      }
    });

    // If this radio button's value matches the selected user, check it
    if (radio.value === selectedUser) {
      radio.checked = true;
    }
  });
});
