// ---------- Utilities ----------

function getRecipes() {
  return JSON.parse(localStorage.getItem("recipes")) || {};
}

function saveRecipes(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- URL Params ----------

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

// ---------- Elements ----------

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const notesInput = document.getElementById("notes");

const ingredientsDiv = document.getElementById("ingredients");
const stepsDiv = document.getElementById("steps");
const tagsDiv = document.getElementById("tags");

// ---------- Dynamic Fields ----------

function addIngredient(value = "") {
  const row = document.createElement("div");
  row.className = "row";

  const input = document.createElement("input");
  input.type = "text";
  input.value = value;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "✕";
  remove.onclick = () => row.remove();

  row.append(input, remove);
  ingredientsDiv.appendChild(row);
}

function addStep(value = "") {
  const row = document.createElement("div");
  row.className = "row";

  const textarea = document.createElement("textarea");
  textarea.rows = 2;
  textarea.value = value;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "✕";
  remove.onclick = () => row.remove();

  row.append(textarea, remove);
  stepsDiv.appendChild(row);
}

function addTag(value) {
  if (!value) return;

  const tag = document.createElement("div");
  tag.className = "tag";

  const span = document.createElement("span");
  span.textContent = value;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "✕";
  remove.onclick = () => tag.remove();

  tag.append(span, remove);
  tagsDiv.appendChild(tag);
}

// ---------- Collect Data ----------

function getIngredients() {
  return [...ingredientsDiv.querySelectorAll("input")]
    .map(i => i.value.trim())
    .filter(Boolean);
}

function getSteps() {
  return [...stepsDiv.querySelectorAll("textarea")]
    .map(t => t.value.trim())
    .filter(Boolean);
}

function getTags() {
  return [...tagsDiv.querySelectorAll(".tag span")]
    .map(s => s.textContent);
}

// ---------- Load Existing Recipe ----------

function loadRecipe(id) {
  const recipes = getRecipes();
  const recipe = recipes[id];
  if (!recipe) return;

  document.getElementById("editor-title").textContent = "Edit Recipe";

  titleInput.value = recipe.title;
  descriptionInput.value = recipe.description;
  imageInput.value = recipe.image;
  notesInput.value = recipe.notes;

  recipe.ingredients.forEach(addIngredient);
  recipe.steps.forEach(addStep);
  recipe.tags.forEach(addTag);
}

// ---------- Event Listeners ----------

document.getElementById("add-ingredient").onclick = () => addIngredient();
document.getElementById("add-step").onclick = () => addStep();

document.getElementById("add-tag").onclick = () => {
  const input = document.getElementById("new-tag");
  addTag(input.value.trim());
  input.value = "";
};

document.getElementById("cancel").onclick = () => {
  window.location.href = "index.html";
};

// ---------- Save ----------

document.getElementById("recipe-form").addEventListener("submit", e => {
  e.preventDefault();

  const recipes = getRecipes();

  const id = recipeId || slugify(titleInput.value);
  if (!id) return alert("Title is required.");

  recipes[id] = {
    id,
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    image: imageInput.value.trim(),
    tags: getTags(),
    ingredients: getIngredients(),
    steps: getSteps(),
    notes: notesInput.value.trim(),
    createdAt: recipes[id]?.createdAt || Date.now(),
    updatedAt: Date.now()
  };

  saveRecipes(recipes);
  window.location.href = `recipe.html?id=${id}`;
});

// ---------- Init ----------

if (recipeId) {
  loadRecipe(recipeId);
} else {
  addIngredient();
  addStep();
}
