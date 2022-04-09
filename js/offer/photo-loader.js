const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photosChooserElement = document.querySelector('#images');
const photosPreviewContainerElement = document.querySelector('.ad-form__photo');

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const filename = file.name;
  const matches = FILE_TYPES.some((it) => filename.toLowerCase().endsWith(it));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

const resetAvatar = () => {
  avatarChooserElement.files.value = '';
  avatarPreviewElement.src = 'img/muffin-grey.svg';
};

photosChooserElement.addEventListener('change', () => {
  Object.values(photosChooserElement.files).map((file) => {
    const filename = file.name;
    const matches = FILE_TYPES.some((it) => filename.toLowerCase().endsWith(`.${it}`));

    if (matches) {
      const photoPreviewElement = document.createElement('img');
      photoPreviewElement.src = URL.createObjectURL(file);
      photoPreviewElement.classList.add('preview-img');
      photosPreviewContainerElement.append(photoPreviewElement);
    }
  });
});

const resetPhotos = () => {
  photosChooserElement.files.value = '';
  photosPreviewContainerElement.textContent = '';
};

export { resetAvatar, resetPhotos };
