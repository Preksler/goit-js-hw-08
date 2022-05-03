import _ from 'lodash';

const LOCAL_STORAGE_KEY = "feedback-form-state";
const refs = {
    form: document.querySelector('.feedback-form'),
    inputEmail: document.querySelector('input'),
    inputMessage: document.querySelector('textarea'),
    submitBtn: document.querySelector('button'),
};

addEventListener('DOMContentLoaded', getFormState);

function saveFormState(formState) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formState));
};

function clearFormState() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function handlerSubmit(event) {
    event.preventDefault();
    const formState = {
        email: refs.inputEmail.value,
        message: refs.inputMessage.value,
    };
    if (!formState.email || !formState.message) {
        return;
    };
    saveFormState(formState);
    clearFormState();
    refs.form.reset();
    console.log(formState);
}

function getFormState() {
    const formState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (formState) {
        const parsedFormState = JSON.parse(formState);
        refs.inputEmail.value = parsedFormState.email;
        refs.inputMessage.value = parsedFormState.message;
    }
}

function handlerInput() {
    const formState = {
        email: refs.inputEmail.value,
        message: refs.inputMessage.value,
    };
    saveFormState(formState);
};

refs.form.addEventListener('submit', handlerSubmit);
refs.form.addEventListener('input', _.throttle(handlerInput, 500));