const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('没有文件被上传。');
    }

    // 这里 'files' 是 HTML 表单中文件输入字段的名称
    let uploadedFiles = req.files.files;

    // 检查是否是多文件上传
    if (!Array.isArray(uploadedFiles)) {
        uploadedFiles = [uploadedFiles];
    }

    uploadedFiles.forEach(file => {
        console.log("接收到的文件名: ", file.name); // 打印文件名

        // 解码文件名
        const buffer = Buffer.from(file.name, 'binary');
        const decodedFileName = buffer.toString('utf-8');
        console.log("尝试解码的文件名: ", decodedFileName);

        // 使用 file.mv() 来移动每个文件到服务器的指定位置
        file.mv('/recv/' + decodedFileName, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
        });
    });

    // 在发送响应之前设置响应头
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    res.send('所有文件上传成功！');
});

app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
