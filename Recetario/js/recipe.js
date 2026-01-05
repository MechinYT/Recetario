// ---------- Utilities ----------

function getRecipes() {
  return JSON.parse(localStorage.getItem("recipes")) || {};
}

// ---------- URL Params ----------

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

if (!recipeId) {
  alert("No recipe specified.");
  window.location.href = "../index.html";
}

// ---------- Load Recipe ----------

const recipes = getRecipes();
const recipe = recipes[recipeId];

if (!recipe) {
  alert("Recipe not found.");
  window.location.href = "../index.html";
}

// ---------- Populate Page ----------

document.title = recipe.title;
document.getElementById("title").textContent = recipe.title;
document.getElementById("description").textContent = recipe.description;

// Image
const image = document.getElementById("image");
if (recipe.image) {
  image.src = recipe.image;
  image.hidden = false;
}

// Tags
const tagsDiv = document.getElementById("tags");
recipe.tags.forEach(tag => {
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = tag;
  tagsDiv.appendChild(span);
});

// Ingredients
const ingredientsUl = document.getElementById("ingredients");
recipe.ingredients.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  ingredientsUl.appendChild(li);
});

// Steps
const stepsOl = document.getElementById("steps");
recipe.steps.forEach(step => {
  const li = document.createElement("li");
  li.textContent = step;
  stepsOl.appendChild(li);
});

// Notes
document.getElementById("notes").textContent =
  recipe.notes || "—";

// ---------- Actions ----------

document.getElementById("edit").onclick = () => {
  window.location.href = `editor.html?id=${recipeId}`;
};

document.getElementById("back").onclick = () => {
  window.location.href = "../index.html";
};
