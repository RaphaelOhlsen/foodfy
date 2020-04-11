const form = document.querySelector('#form');
const saveButtonChef = document.querySelector("#save-button-chef");
const deleteButtonChef = document.querySelector("#delete-button-chef");

saveButtonChef.addEventListener("click", () => {
  form.action = "/admin/chefs?_method=PUT";
});

deleteButtonChef.addEventListener("click", () => {
  form.action = "/admin/chefs?_method=DELETE"; 
  const confirmation = confirm('Deseja Deletar ?');
  if(!confirmation) e.preventDefault();
});