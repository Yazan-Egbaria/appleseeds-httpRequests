const usersURL = "https://jsonplaceholder.typicode.com/users";

const usersPromise = fetch(usersURL).then((res) => res.json());

const loadingBar = document.getElementById("loading-indicator");
const usersContainer = document.getElementById("users");

loadingBar.style.display = "block";

usersPromise
  .then((users) => {
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("item");
      userDiv.innerHTML = `<h2>${user.name}</h2>
      <p>${user.email}</p>`;
      usersContainer.append(userDiv);
    });
  })
  .then(() => {
    loadingBar.style.display = "none";
  })
  .catch((err) => {
    console.log(err);
  });
