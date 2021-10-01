const auth = "23508945-d253b032e43e7508a11e2da8c";
const next = document.querySelector(".next");
const previous = document.querySelector(".previous")
const input = document.querySelector("input");
const searchbutton = document.querySelector(".searchbutton")
const selectcolor = document.querySelector(".colors")
const gallery = document.querySelector(".gallery");

let pagenr = 1;
let query = "";
let color = "";
let maxPage = 0;

previous.style.visibility = "hidden";
next.style.visibility = "hidden";

input.addEventListener("input", (e) => {
    e.preventDefault();
    query = e.target.value;
});

// Color search
function getSelectValue() {
    color = document.getElementById("list").value;
}

// Search image function
async function searchImage(query, pagenr, color) {

    // Clear pictures at new search
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    const data = await fetch(`https://pixabay.com/api/?key=${auth}&q=${query}&colors=${color}&per_page=10&page=${pagenr}`,

    );
    const result = await data.json();
    result.hits.forEach((hit) => {

        const images = document.createElement("div")
        const pic = document.createElement("img");
        const tags = document.createElement("p");
        const user = document.createElement("p");
        pic.src = hit.webformatURL;
        tags.textContent = hit.tags;
        user.textContent = 'Taken by: ' + hit.user;

        gallery.appendChild(images);
        images.appendChild(pic);
        images.appendChild(tags);
        images.appendChild(user);

        // Find last page and hide next button
        if (pagenr < maxPage) {
            next.style.visibility = "visible"
        }
        maxPage = Math.ceil(result.totalHits / 10);
    });
}

// Search by clicking search button
searchbutton.addEventListener("click", (event) => {
    if (input.value === "") return;
    pagenr = 1;
    previous.style.visibility = "hidden";
    searchImage(query, pagenr, color);
    if (query.toLowerCase() !== "capybara") {
        alert("Are you sure you don't want to search for capybara?")
    }
});

// Search by pressing enter key
input.addEventListener('keyup', function(evt) {
    if (evt.key === 'Enter') {
        if (input.value === "") return;

        previous.style.visibility = "hidden";
        pagenr = 1;
        searchImage(query, pagenr, color);
        if (query.toLowerCase() !== "capybara") {
            alert("Are you sure you don't want to search for capybara?")
        }
    }
});

// Next page
next.addEventListener("click", () => {
    pagenr++;
    searchImage(query, pagenr, color)
    previous.style.visibility = "visible";
    if (pagenr >= maxPage) {
        next.style.visibility = "hidden";
    }

});

// Previous page
previous.addEventListener("click", () => {
    if (pagenr === 2) {
        previous.style.visibility = "hidden";
    }
    pagenr--;
    searchImage(query, pagenr, color)
});