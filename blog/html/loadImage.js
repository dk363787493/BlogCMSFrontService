// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadImageFromBackend();
});

function loadImageFromBackend() {
    fetch('http://your-backend-api.com/api/get-image')
        .then(function(response) {
            // 确保请求成功
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.blob(); // 如果返回的是图片数据
            // return response.json(); // 如果后端返回的是包含图片URL的JSON
        })
        .then(function(imageBlob) {
            // 如果直接返回图片Blob数据
            const imageUrl = URL.createObjectURL(imageBlob);
            document.getElementById('backend-image').src = imageUrl;

            // 如果后端返回的是JSON，包含了图片的URL
            // document.getElementById('backend-image').src = imageData.url;
        })
        .catch(function(error) {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
