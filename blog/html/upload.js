document.getElementById('upload-button').addEventListener('click', function() {
    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        const formData = new FormData();
        formData.append('photo', photoInput.files[0]);

        fetch('http://0.0.0.0:8080/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('upload-status').textContent = 'Photo uploaded successfully!';
                } else {
                    document.getElementById('upload-status').textContent = 'Upload failed.';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                document.getElementById('upload-status').textContent = 'Error uploading photo.';
            });
    } else {
        document.getElementById('upload-status').textContent = 'Please select a photo to upload.';
    }
});
