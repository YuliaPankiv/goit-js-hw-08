import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Функція для збереження стану форми в локальне сховище
const saveFormState = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}, 500);

// Функція для заповнення форми з локального сховища
const loadFormState = () => {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};

// Заповнюємо форму при завантаженні сторінки
loadFormState();

// Відстежуємо зміни в полях форми і зберігаємо стан форми в локальне сховище
form.addEventListener('input', saveFormState);

// Очищуємо локальне сховище та форму при сабміті форми
form.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
});
