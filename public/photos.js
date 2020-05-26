const PhotosUpload = {
  input: "",
  files: [],
  uploadLimit: 5,
  preview: document.querySelector('#photos-preview'),

  handleFileInput(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;

    if(this.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result)
        const container = this.getContainer(image);
        
        this.preview.appendChild(container);
      }
      reader.readAsDataURL(file);
    });
      PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },
  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('photo');
    container.onclick = this.removePhoto;
    container.appendChild(image);
    container.appendChild(this.getRemoveButton())
    return container;
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = 'close';
    return button;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;
    if (fileList.length > this.uploadLimit) {
      alert(`Envie no máximo ${this.uploadLimit} fotos`); 
      event.preventDefault();
      return true
    } 

    const photosDiv = [];

    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == "photo")
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > uploadLimit) {
      alert("Você atingiu o limite máximo de fotos");
      event.preventDefault();
      return true;
    }
    return false;
  },

  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

    PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  },

  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index,1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
    
    photoDiv.remove();
  },
  
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;
    if(photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"');
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`
      }
    }
    photoDiv.remove();
  }
}

const AvatarUpload = {
  input: "",
  files: [],
  preview: document.querySelector('#photos-preview'),
  handleFileInput(event) {
    const { files: fileList } = event.target;
    AvatarUpload.input = event.target;
  
    if(this.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      AvatarUpload.files.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result)
        const container = this.getContainer(image);
        
        this.preview.appendChild(container);
      }
      reader.readAsDataURL(file);
    });
  },
  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('photo');
    container.onclick = this.removePhoto;
    container.appendChild(image);
    container.appendChild(this.getRemoveButton())
    return container;
  },
  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = 'close';
    return button;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = AvatarUpload;
    const { files: fileList } = input;
    if (fileList.length > 1) {
      alert(`Envie somente uma única foto`); 
      event.preventDefault();
      return true
    } 

    const photosDiv = [];

    preview.childNodes.forEach(item => {
      if(item.classList && item.classList.value == "photo")
        photosDiv.push(item);
    });

    const totalPhotos = fileList.length + photosDiv.length;

    if (totalPhotos > 1) {
      alert("Apague a foto atual e escolha outra");
      event.preventDefault();
      return true;
    }

    return false;
  },

  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

    AvatarUpload.files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  },

  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(AvatarUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);
    AvatarUpload.files.splice(index,1);
    AvatarUpload.input.files = AvatarUpload.getAllFiles();
    photoDiv.remove();
  }, 
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if(photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"');
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`
      }
    }
    photoDiv.remove();
  }
}
