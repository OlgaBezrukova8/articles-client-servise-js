const SERVER_API_URL = "http://localhost:3000";

const $form = document.querySelector(".form");

const eventHandlers = () => {
  $form.addEventListener("submit", createArticle);
};

const createArticle = (event) => {
  event.preventDefault();

  const title = event.target.elements.title.value;
  const author = event.target.elements.author.value;
  const description = event.target.elements.description.value;

  /* второй вариант чтобы достучаться до значения инпутов */

  //   const title = document.querySelector('input[name="title"]').value;
  //   const author = document.querySelector('input[name="author"]').value;
  //   const description = document.querySelector(
  //     'textarea[name="description"]'
  //   ).value;

  const data = {
    id: new Date().getMilliseconds(),
    title,
    author,
    description,
  };

  //   console.log(data, JSON.stringify(data));

  fetch(`${SERVER_API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

eventHandlers();
