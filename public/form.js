const form = document.querySelector('#form');
const saveButtonRecipe = document.querySelector("#save-button-recipe");
const deleteButtonRecipe = document.querySelector("#delete-button-recipe");
const saveButtonChef = document.querySelector("#save-button-chef");
const deleteButtonChef = document.querySelector("#delete-button-chef");


saveButtonRecipe.addEventListener("click", () => {
  form.action = "/admin/recipes?_method=PUT";
  form.enctype="multipart/form-data"
});

deleteButtonRecipe.addEventListener("click", (e) => {
  form.action = "/admin/recipes?_method=DELETE"; 
  const confirmation = confirm('Deseja Deletar ?');
  if(!confirmation) e.preventDefault();
});

saveButtonChef.addEventListener("click", () => {
  form.action = "/admin/chefs?_method=PUT";
});

deleteButtonChef.addEventListener("click", () => {
  form.action = "/admin/chefs?_method=DELETE"; 
  const confirmation = confirm('Deseja Deletar ?');
  if(!confirmation) e.preventDefault();
});