const ERROR_SHOW_TIME = 3000;
const renderErrorFullScreen = (msg) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-mess');
  errorContainer.textContent = msg;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

export { renderErrorFullScreen };
