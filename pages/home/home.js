export default function initHome() {
	let currentPage = 0;
	const observerDiv = document.querySelector(".observer");
	const postsContainer = document.getElementById("posts");

	if (postsContainer && observerDiv) {
		const fetchPosts = async (page) => {
			observerDiv.classList.add("active");

			const responsePosts = await fetch(
				`https://m2-api-living.herokuapp.com/news?page=${page}`
			);
			const post = await responsePosts.json();
			return post.news;
		};

		async function renderPost() {
			const posts = await fetchPosts(currentPage);

			posts.forEach((post) => {
				postsContainer.insertAdjacentHTML(
					"beforeend",
					`<li class="post" id="${post.id}" data-category="${post.category}">
						<div class="post-image">
							<img src="${post.image}" alt="">
						</div>
							<h2>${post.title}</h2>
							<p>${post.description}</p>
							<button>Acessar conteúdo</button>
					</li>`
				);
			});
			observerDiv.classList.remove("active");

			filterPosts();
			setPostToLocalStorage();
		}

		const filterPosts = async () => {
			const filterButtons = document.querySelectorAll(".categories-list li");
			const posts = document.querySelectorAll(".post");
			const notFound = document.querySelector(".not-found");

			filterButtons.forEach((btn) => {
				btn.addEventListener("click", handleClick);
			});

			function handleClick({ target }) {
				filterButtons.forEach((btn) => {
					btn.classList.remove("primary");
				});

				posts.forEach((post) => {
					post.classList.remove("hide");

					if (target.innerText !== post.getAttribute("data-category")) {
						post.classList.add("hide");
						target.classList.add("primary");
						observerDiv.classList.add("hide");
					}
				});

				if (
					Array.from(posts).every((item) => item.classList.contains("hide")) &&
					target.innerText !== "Todos"
				) {
					notFound.classList.add("active");
				} else {
					notFound.classList.remove("active");
				}

				if (target.innerText === "Todos") {
					posts.forEach((post) => {
						post.classList.remove("hide");
					});
					observerDiv.classList.remove("hide");
				}
			}
		};

		const setPostToLocalStorage = async () => {
			const postsButton = document.querySelectorAll(".post button");

			postsButton.forEach((btn) => {
				btn.addEventListener("click", () => {
					const postId = btn.parentElement.getAttribute("id");
					localStorage.setItem("post-id", JSON.stringify(postId));
					window.location.href = "../post/post.html";
				});
			});
		};

		const getLocalStorage = async () => {
			await renderPost();
			const filterButtons = document.querySelectorAll(".categories-list li");
			const categoryStored = JSON.parse(localStorage.getItem("category"));

			filterButtons.forEach((btn) => {
				if (btn.innerText === categoryStored) {
					btn.click();
				}
			});
		};
		getLocalStorage();

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					fetchPosts(currentPage++);
					renderPost();
				}
			},
			{
				threshold: 1,
			}
		);
		observer.observe(observerDiv);
	}
}