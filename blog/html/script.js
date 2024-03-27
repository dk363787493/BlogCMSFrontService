document.getElementById('insert-image').addEventListener('click', function() {
    const contentTextArea = document.getElementById('content');
    const fileInput = document.getElementById('image');
    if (fileInput.files.length > 0) {
        const filename = fileInput.files[0].name;
        const filePlaceholder = `![${filename}]`; // 用文件名创建一个占位符
        const cursorPos = contentTextArea.selectionStart;
        const textBefore = contentTextArea.value.substring(0, cursorPos);
        const textAfter = contentTextArea.value.substring(cursorPos);

        // 在当前光标位置插入图片占位符
        contentTextArea.value = textBefore + filePlaceholder + textAfter;
    }
});

document.getElementById('article-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('content', document.getElementById('content').value);

    // 将所有选中的文件添加到FormData对象
    const images = document.getElementById('image').files;
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i], images[i].name);
    }

    // 发送请求到后端API
    fetch('https://your-backend-api.com/api/articles', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Article uploaded successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to upload the article.');
        });
});
