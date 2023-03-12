import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const formState = { email: '', message: '' };
const storageKey = 'feedback-form-state';

const onFormInput = throttle(() => {
  formState.email = emailInput.value;
  formState.message = messageInput.value;
  localStorage.setItem(storageKey, JSON.stringify(formState));
}, 500);

emailInput.addEventListener('input', onFormInput);
messageInput.addEventListener('input', onFormInput);

const savedState = localStorage.getItem(storageKey);

if (savedState) {
  const parsedState = JSON.parse(savedState);
  formState.email = parsedState.email;
  formState.message = parsedState.message;
  emailInput.value = parsedState.email;
  messageInput.value = parsedState.message;
}
