const SERVER_API_URL = "http://localhost:3000";

const $form = document.querySelector(".form");
const $root = document.querySelector("#root");

const eventHandlers = () => {
  window.addEventListener("DOMContentLoaded", init);

  $form.addEventListener("submit", submitHandler);
  $root.addEventListener("click", selectArticle);
};

const init = () => {
  loadArticles();
};

const loadArticles = () => {
  fetch(`${SERVER_API_URL}/articles`)
    .then((data) => data.json())
    .then((data) => renderArticles(data));
};

const renderArticles = (items) => {
  const $root = document.querySelector("#root");

  const $items = items.map((item) => {
    const $container = document.createElement("div");
    $container.classList.add("article");

    const $title = document.createElement("h2");
    $title.innerText = item.title;

    const $updateButton = document.createElement("button");
    $updateButton.innerText = "Update";
    $updateButton.setAttribute("data-action", "update");
    $updateButton.setAttribute("data-id", item.id);
    $updateButton.classList.add("button-update");

    const $deleteButton = document.createElement("button");
    $deleteButton.innerText = "Delete";
    $deleteButton.setAttribute("data-action", "delete");

    $deleteButton.setAttribute("data-id", item.id);

    $container.appendChild($title);
    $container.appendChild($updateButton);
    $container.appendChild($deleteButton);

    return $container;
  });

  $root.replaceChildren(...$items);
};

const submitHandler = (event) => {
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
    id: Date.now(),
    title,
    author,
    description,
  };

  if (event.target.getAttribute("action") === "POST") {
    createArticle(data);
  } else {
    updateArticles(data, event.target.getAttribute("data-article-id"));
  }
};

const createArticle = (data) => {
  fetch(`${SERVER_API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => loadArticles())
    .catch((error) => console.log(error));
};

const updateArticles = (data, id) => {
  fetch(`${SERVER_API_URL}/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => loadArticles())
    .catch((error) => console.log(error));
};

const selectArticle = (event) => {
  if (
    event.target.nodeName === "BUTTON" &&
    event.target.getAttribute("data-action") === "update"
  ) {
    const id = event.target.getAttribute("data-id");

    fetch(`${SERVER_API_URL}/articles/${id}`)
      .then((response) => response.json())
      .then((data) => insertData(data))
      .catch((error) => console.log(error));
  } else {
    const id = event.target.getAttribute("data-id");

    fetch(`${SERVER_API_URL}/articles/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        loadArticles();
      })
      .catch((error) => console.log(error));
  }
};

const insertData = (article) => {
  document.querySelector('input[name="title"]').value = article.title;
  document.querySelector('input[name="author"]').value = article.author;
  document.querySelector('textarea[name="description"]').value =
    article.description;

  $form.setAttribute("data-article-id", article.id);
  $form.setAttribute("action", "PATCH");
};

eventHandlers();
