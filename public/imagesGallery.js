const ImageGallery = {
  highlight: document.querySelector('.wrap-image-recipe img'),
  previews: document.querySelectorAll('.photos-preview.show img'),
  setImage(event) {
    const { target } = event;
    ImageGallery.previews.
      forEach(preview => preview.classList.remove('active'));
    target.classList.add('active');
    ImageGallery.highlight.src = target.src;
  }
}

const LightBox = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
  open() {
    LightBox.image.src = ImageGallery.highlight.src;
    LightBox.target.style.opacity = 1;
    LightBox.target.style.top = 0;
    LightBox.closeButton.style.top = 0;
  },
  close() {
    LightBox.target.style.opacity = 0;
    LightBox.target.style.top = "-100%";
    LightBox.target.style.bottom = "initial";
    LightBox.closeButton.style.top = "-80px";
  }
}