const users = document.getElementById("users");
const error = document.getElementById("error");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((usersData) => {
    usersData.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `<h2>${user.name}</h2>
      <p><strong>Email:</strong>${user.email}</p>`;
      users.append(userDiv);
    });
  })
  .catch((err) => {
    error.innerHTML = `An error occurred: ${err.message}. Please try again later.`;
  });
