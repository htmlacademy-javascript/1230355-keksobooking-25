const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form-header__input');
const preview = document.querySelector('.ad-form-header__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});


const fileChooserImgs = document.querySelector('#images');
const previewImgs = document.querySelector('.ad-form__photo');

fileChooserImgs.addEventListener('change', () => {
  Object.values(fileChooserImgs.files).map((file) => {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(`.${it}`));

    if (matches) {
      const imgContainer = document.createElement('img');
      imgContainer.src = URL.createObjectURL(file);
      imgContainer.classList.add('preview-img');
      previewImgs.append(imgContainer);
    }
  });
});
