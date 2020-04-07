const form = document.querySelector('#form');
const saveButton = document.querySelector("#save-button");
const deleteButton = document.querySelector("#delete-button");

saveButton.addEventListener("click", () => {
  form.action = "/admin/recipes?_method=PUT";
});

deleteButton.addEventListener("click", () => {
  form.action = "/admin/recipes?_method=DELETE"; 
  const confirmation = confirm('Deseja Deletar ?');
  if(!confirmation) e.preventDefault();
});

