// ---------- Utilities ----------

function getRecipes() {
  return JSON.parse(localStorage.getItem("recipes")) || {};
}

// ---------- Elements ----------

const list = document.getElementById("recipe-list");
const empty = document.getElementById("empty");

// ---------- Render ----------

function renderRecipes() {
  const recipes = getRecipes();
  const ids = Object.keys(recipes);

  list.innerHTML = "";

  if (ids.length === 0) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  ids.forEach(id => {
    const recipe = recipes[id];

    const card = document.createElement("div");
    card.className = "recipe-card";

    card.onclick = () => {
      window.location.href = `./html/recipe.html?id=${id}`;
    };

    if (recipe.image) {
      const img = document.createElement("img");
      img.src = recipe.image;
      card.appendChild(img);
    }

    const title = document.createElement("h2");
    title.textContent = recipe.title;
    card.appendChild(title);

    if (recipe.description) {
      const desc = document.createElement("p");
      desc.textContent = recipe.description;
      card.appendChild(desc);
    }

    if (recipe.tags.length) {
      const tags = document.createElement("div");
      tags.className = "tags";

      recipe.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tags.appendChild(span);
      });

      card.appendChild(tags);
    }

    list.appendChild(card);
  });
}

// ---------- Actions ----------

document.getElementById("add-recipe").onclick = () => {
  window.location.href = "html/editor.html";
};

// ---------- Init ----------

renderRecipes();
