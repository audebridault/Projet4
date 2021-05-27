function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const inputs = document.querySelectorAll("input");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

document.querySelector(".close").onclick = closeModale;

inputs.forEach((input) => {
  input.onblur = function () {
    validate(this);
  };
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModale(event) {
  event.preventDefault();
  event.stopPropagation();
  modalbg.style.display = "none";
}

function validate(input) {
  if (validateData(input)) {
    //masquer les messages d'erreurs
    return;
  }
  //afficher les messages d'erreur
}

/**
 * [validateData description]
 *
 * @param   {HTMLElement}  input  un Ã©lÃ©ment de type input
 *
 * @return  {Boolean}             si le champs est valide ou non
 */
function validateData(input) {
  switch (input.type) {
    case "date":
      break;
    case "email":
      console.log(input.checkValidity());
      break;
    case "text":
      const regex = /[a-z]/gi;
      if (regex.test(input.value) === false) return false;
      if (input.value.length < 2) return false;
      return true;
    default:
      console.error(`case ${input.type} non prÃ©vu`);
      break;
  }
}
