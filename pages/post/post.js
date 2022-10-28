import initCategoryScroll from "../../scripts/categoryScroll.js";

export default function initPost() {
  const getPost = () => {
    const postId = JSON.parse(localStorage.getItem("post-id"));

    if (postId) {
      const post = fetch(`https://m2-api-living.herokuapp.com/news/${postId}`)
        .then((response) => response.json())
        .then((body) => body)
        .catch((error) => error);

      return post;
    }
  };

  const renderPost = async () => {
    const postContainer = document.getElementById("post");
    const data = await getPost();

    if (postContainer && data) {
      postContainer.innerHTML = `
		<div class="post-header">
      <div class="container">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
      </div>
    </div>
      <div class="container">
        <div class="post-body">
          <div class="image">
            <img src="${data.image}" alt="">
          </div>
            <p>${data.content}</p>
        </div>
			  <section class="categories">
          <button class="icon prev"></button>
            <ul id="categories" class="categories-list">
              <li class="btn grey">Todos</li>
              <li class="btn grey">Pintura</li>
              <li class="btn grey">Decoração</li>
              <li class="btn grey">Organização</li>
              <li class="btn grey">Limpeza</li>
              <li class="btn grey">Segurança</li>
              <li class="btn grey">Reforma</li>
              <li class="btn grey">Aromas</li>
              <li class="btn grey">Saúde</li>
              <li class="btn grey">Tecnologia</li>
            </ul>
          <button class="icon next"></button>
        </section>
    </div>
		`;
    }
    setCategory();
    initCategoryScroll();
  };
  renderPost();

  const setCategory = () => {
    const categories = document.querySelectorAll(".categories-list li");

    if (window.location.href.includes("post")) {
      categories.forEach((category) => {
        category.addEventListener("click", handleClick);
      });

      function handleClick({ target }) {
        categories.forEach((item) => item.classList.remove("primary"));
        target.classList.add("primary");

        localStorage.setItem("category", JSON.stringify(target.innerText));
        window.location.href = "../home/home.html";
      }
    }
  };
}