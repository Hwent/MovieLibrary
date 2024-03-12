document
  .getElementById("add-to-favorites")
  .addEventListener("click", function () {
    const addToFavoritesButton = document.getElementById("add-to-favorites");
    const movieId = addToFavoritesButton.dataset.id;
    const activeUser = localStorage.getItem("selectedUser"); // Get the active user from localStorage
    if (!activeUser) {
      alert("Please select a user.");
      return;
    }
    fetch(`/movie/${movieId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: activeUser,
        movieId: movieId,
      }),
    })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then((data) => {
            if (!response.ok) {
              throw new Error(data.message);
            }
            return data;
          });
        } else {
          throw new Error("Oops, we haven't got JSON!");
        }
      })
      .then((data) => {
        if (data.success) {
          alert("Movie added to favorites!");
        } else {
          alert("Failed to add movie to favorites.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  });
