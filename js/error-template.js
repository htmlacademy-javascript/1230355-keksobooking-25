const ERROR_SHOW_TIME = 3000;

const renderErrorFullScreen = (msg) => {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-mess');
  errorElement.textContent = msg;

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_SHOW_TIME);
};

export { renderErrorFullScreen };
