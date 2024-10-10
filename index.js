fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((usersData) => {
    const usersContainer = document.getElementById("users");

    usersData.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");
      userDiv.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <div class="posts"></div>
        `;
      usersContainer.append(userDiv);

      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then((response) => response.json())
        .then((postsData) => {
          const postsContainer = userDiv.querySelector(".posts");
          const h1 = document.createElement("h1");
          h1.innerHTML = "Posts Section:";
          postsContainer.appendChild(h1);
          postsData.forEach((post) => {
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `<strong>${post.title}</strong>
            <br>${post.body}`;

            postsContainer.append(postDiv);
          });
        })
        .catch((err) => console.log(err));
    });
  })
  .catch((err) => console.log(err));
