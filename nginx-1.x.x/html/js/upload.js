function updateFileList() {
    const input = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    
    fileList.innerHTML = '';
    for (const file of input.files) {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        fileList.appendChild(listItem);
    }
}

document.getElementById('fileInput').addEventListener('change', updateFileList);

function uploadFiles() {
	console.log("上传按钮被点击");
	
    const files = document.getElementById('fileInput').files;
    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file, file.name);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.77.106/upload', true);

    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const progress = document.getElementById('progress');
            const percent = (event.loaded / event.total) * 100;
            progress.textContent = `上传进度：${percent.toFixed(2)}%`;
        }
    };

    xhr.onload = function() {
        if (xhr.status == 200) {
            alert('所有文件上传成功！');
            document.getElementById('fileList').innerHTML = '';
            document.getElementById('progress').textContent = '';
        } else {
            alert('文件上传失败。');
        }
    };

    xhr.send(formData);
}
