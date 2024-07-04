document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('login-form');
    const adminPanel = document.getElementById('admin-panel');
    const passwordInput = document.getElementById('password');
    const contentEditor = document.getElementById('content-editor');
    const saveContentButton = document.getElementById('save-content');
    const imageUpload = document.getElementById('image-upload');
    const uploadImageButton = document.getElementById('upload-image');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const password = passwordInput.value;
        if (password === 'adminpassword') {
            loginForm.style.display = 'none';
            adminPanel.style.display = 'block';
            fetch('/content')
                .then(response => response.text())
                .then(data => {
                    contentEditor.value = data;
                });
        } else {
            alert('Contraseña incorrecta');
        }
    });

    saveContentButton.addEventListener('click', function() {
        const content = contentEditor.value;
        fetch('/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        }).then(response => {
            if (response.ok) {
                alert('Contenido guardado');
            } else {
                alert('Error al guardar el contenido');
            }
        });
    });

    uploadImageButton.addEventListener('click', function() {
        const file = imageUpload.files[0];
        const formData = new FormData();
        formData.append('image', file);
        fetch('/upload', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.ok) {
                alert('Imagen subida');
            } else {
                alert('Error al subir la imagen');
            }
        });
    });
});
