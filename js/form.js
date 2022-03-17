//1.1 Неактивное состояние
const deactiveForm = () =>{
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  document.querySelectorAll('.ad-form fieldset').forEach((el) => {
    el.setAttribute('disabled', '');
  });
  document.querySelector('.ad-form__slider').setAttribute('disabled', '');
  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  document.querySelectorAll('.map__filters select').forEach((el) => {
    el.setAttribute('disabled', '');
  });
};

//1.2 Активное состояние
const activeForm = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelectorAll('.ad-form fieldset').forEach((el) => {
    el.removeAttribute('disabled');
  });
  document.querySelector('.ad-form__slider').removeAttribute('disabled');
  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  document.querySelectorAll('.map__filters select').forEach((el) => {
    el.removeAttribute('disabled');
  });
};

export{deactiveForm, activeForm};

