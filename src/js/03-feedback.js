import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';
 let feedback = {};

emailInput.addEventListener('input', throttle(formInput, 500));
messageInput.addEventListener('input', throttle(formInput, 500));
form.addEventListener('submit', formSubmit);

function formInput(event) {
 
  const savedFeedback = localStorage.getItem(STORAGE_KEY);
  if (savedFeedback) {
    feedback = JSON.parse(savedFeedback);  
  }
  feedback[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}
const savedFeedback = localStorage.getItem(STORAGE_KEY);
if (savedFeedback) {
  const feedback = JSON.parse(savedFeedback);
  emailInput.value = feedback.email || '';
  messageInput.value = feedback.message || '';
}
function formSubmit(event) {
  event.preventDefault();
  const feedback = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(feedback);

  localStorage.removeItem(STORAGE_KEY);
  // emailInput.value =  '';
  // messageInput.value = '';
}
