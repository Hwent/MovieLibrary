document
  .getElementById("add-to-favorites")
  .addEventListener("click", function () {
    const activeUser = localStorage.getItem("selectedUser"); // Get the active user from localStorage
    if (!activeUser) {
      alert("Please select a user.");
      return;
    }
    fetch("/users/addfavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movieId,
        userId: activeUser,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Movie added to favorites!");
        } else {
          alert("Failed to add movie to favorites.");
        }
      });
  });
