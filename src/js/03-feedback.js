// імпортуємо функцію throttle з lodash
import throttle from 'lodash.throttle';
// отримуємо форму і її елементи
const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

// задаємо ключ для локального сховища
const localStorageKey = 'feedback-form-state';

// функція для збереження стану форми в локальному сховищі
const saveFormStateToLocalStorage = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formState));
};

// функція для завантаження стану форми з локального сховища
const loadFormStateFromLocalStorage = () => {
  const formState = JSON.parse(localStorage.getItem(localStorageKey));
  if (formState) {
    emailInput.value = formState.email || '';
    messageInput.value = formState.message || '';
  }
};

// встановлюємо обробник події input для форми
feedbackForm.addEventListener(
  'input',
  throttle(saveFormStateToLocalStorage, 500)
);

// встановлюємо обробник події submit для форми
feedbackForm.addEventListener('submit', event => {
  // запобігаємо стандартній поведінці форми
  event.preventDefault();

  // виводимо об'єкт з полями email та message у консоль
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);

  // очищуємо локальне сховище
  localStorage.removeItem(localStorageKey);

  // очищуємо поля форми
  emailInput.value = '';
  messageInput.value = '';
});

// завантажуємо стан форми з локального сховища під час завантаження сторінки
loadFormStateFromLocalStorage();
