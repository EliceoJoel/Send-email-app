/*************VARIABLES****************** */
const form = document.getElementById("send-email");
const to = document.getElementById("to");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const btnSend = document.getElementById("send");
const btnReset = document.getElementById("reset");
const spiner = document.querySelector(".spiner");
const sent = document.querySelector('.sent');



/**************EVENT LISTENERS**************** */
eventListeners();

function eventListeners(){
   //initial DOM load
   document.addEventListener("DOMContentLoaded", startApp);
   //fields
   to.addEventListener('input', fieldCheck);
   subject.addEventListener('input', fieldCheck);
   message.addEventListener('input', fieldCheck);
   //reset button
   btnReset.addEventListener('click', resetForm);
   //form
   form.addEventListener('submit', sendEmail);
}

/**************FUNCTIONS**************** */
function startApp(){
   //disable button
   disableBtnSend();
}

function fieldCheck(e){
   //validate length and empty content
   validateLength(this);

   //validateEmail
   if(this.type === "email"){
      validateEmail(this);
   }

   let errors = document.querySelectorAll(".error");

   if(to.value !== "" && subject.value !== "" && message.value !== ""){
      if(errors.length === 0){
         enableBtnSend();
      }else{
         disableBtnSend();
      }
   }else{
      disableBtnSend();
   }
}

function sendEmail(e){
   e.preventDefault();
   //display spinner
   spiner.style.display = "block"
   setTimeout(() => {
      spiner.style.display = "none";
      sent.style.display = "block";
   }, 2000);
   setTimeout(() => {
      sent.style.display = "none";
      resetForm(e);
   }, 4000);
}

function validateLength(field){
   if(field.value.length > 0){
      field.style.borderBottom = "1px solid green";
      field.classList.remove("error");
   }else{
      field.style.borderBottom = "1px solid red";
      field.classList.add("error");
   }
}


function validateEmail(field){
   const email = field.value;
   const expReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
   if (expReg.test(email)){
      field.style.borderBottom = "1px solid green";
      field.classList.remove("error");
   }else {
      field.style.borderBottom = "1px solid red";
      field.classList.add("error");
   }
}


function enableBtnSend(){
   btnSend.disabled = false;
   btnSend.style = "";
}

function disableBtnSend(){
   btnSend.style.background = "rgb(118, 118, 118)";
   btnSend.disabled = true;
}

function resetForm(e){
   e.preventDefault();
   to.value = "";
   subject.value = "";
   message.value = "";
   to.style.borderBottom = ""
   subject.style.borderBottom = ""
   message.style.borderBottom = ""
   disableBtnSend();
}