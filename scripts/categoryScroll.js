export default function initCategoryScroll() {
	const scrollBtns = document.querySelectorAll(".icon");
	const categoriesDiv = document.querySelector(".categories-list");

	if (scrollBtns) {
		function handleClick(e) {
			if (e.target.classList.contains("next")) {
				categoriesDiv.scrollBy(200, 0);
				scrollBtns[0].style.display = "block";
			} else {
				categoriesDiv.scrollBy(-200, 0);
				
			}
		}
		scrollBtns.forEach((btn) => btn.addEventListener("click", handleClick));
	}
}
