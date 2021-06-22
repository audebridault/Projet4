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

/**
 * [validateOnSubmit description]
 *
 * @event
 *
 * @return  {[type]}         [return description]
 */
function validateOnSubmit() {
  event.preventDefault();
  event.stopPropagation();
  inputs.forEach((input) => {
    if (input.type === "submit" || input.type === "checkbox") return;
    validate(input);
  });

  //validation au moins 1 bouton radio coché
  const quantity = document.getElementById("quantity").value;
  const inputsLocations = document.querySelectorAll(
    "#locations input:checked"
  ).length;

  if (isNaN(quantity) || quantity <= 0){
    //ajouter des conditions
    showMessage(document.getElementById("locations"), true);
  }
  else {
    console.log("---");
    let cityError = false;
    console.log("inputLocations", inputsLocations);
    if (inputsLocations === 0) {
      showMessage(
        document.getElementById("locations"),
        false,
        "vous devez choisir au moins une ville"
      );
      cityError = true;
    }
    if (inputsLocations > quantity && !cityError) {
      showMessage(
        document.getElementById("locations"),
        false,
        "vous avez choisi plus de villes que de participations"
      );
      cityError = true;
    }
    if (!cityError) showMessage(document.getElementById("locations"), true);
  }

  //validation conditions acceptées
  const checkbox = document.getElementById("checkbox1");
  if (checkbox.checked) showMessage(checkbox.parentNode, true);
  else
    showMessage(
      checkbox.parentNode,
      false,
      "vous devez approver les conditions"
    );

  console.log(
    "erreurs",
    document.querySelectorAll("div[data-error-visible=true]").length
  );
  alert("ok");
}

function validate(input) {
  if (input.type === "submit") return;
  const result = validateData(input);
  showMessage(input.parentNode, result.success, result.msg);
}

function showMessage(cible, success, message = "") {
  cible.setAttribute("data-error", message);
  cible.setAttribute("data-error-visible", !success);
}

/**
 * [validateData description]
 *
 * @param   {HTMLInputElement}  input  un Ã©lÃ©ment de type input
 *
 * @return  {Object}             un objet avec succes= true|false et si c'est c'est faux un message (msg)
 */
function validateData(input) {
  if (input.value.length === 0)
    return {
      success: false,
      msg: "le champs ne peux pas être vide",
    };
  switch (input.type) {
    case "date":
      return { success: true };
    case "email":
      return input.checkValidity()
        ? { success: true }
        : {
            success: false,
            msg: "le format de l'email n'est pas valide",
          };
    case "text":
      var regex = /[a-z]/gi;
      if (regex.test(input.value) === false)
        return {
          success: false,
          msg: "le texte saisi n'est pas conforme",
        };
      if (input.value.length < 2)
        return {
          success: false,
          msg: "la saisie est trop courte",
        };
      return { success: true };
    case "number":
      var participations = parseInt(input.value);
      if (isNaN(participations) || participations < 0)
        return {
          success: false,
          msg: "la saisie est incorrecte",
        };
      return { success: true };
    case "submit":
      break;
    default:
      console.error(`case ${input.type} non prÃ©vu`);
      return { success: false };
  }
}
