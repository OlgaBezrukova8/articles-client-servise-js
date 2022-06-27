const SERVER_API_URL = "http://localhost:3000";

const eventHandlers = () => {
  window.addEventListener("DOMContentLoaded", init);
};

const init = () => {
  loadArticles();
};

const loadArticles = () => {
  fetch(`${SERVER_API_URL}/articles`)
    .then((response) => response.json())
    // .then((data) => renderArticles(data));
    .then((data) => console.log(data));
};

const renderArticles = (items) => {
  const $root = document.querySelector("#root");

  const $items = items.map((item) => {
    const $container = document.createElement("div");

    const $title = document.createElement("h2");
    $title.innerText = item.title;

    const $description = document.createElement("p");
    $description.innerText = item.description;

    $container.appendChild($title);
    $container.appendChild($description);

    return $container;
  });

  $root.replaceChildren(...$items);
};

// console.log(
//   renderArticles({
//     title: "sfsf",
//     author: "sdfdddd",
//     description: "ddddddd",
//   })
// );

eventHandlers();
