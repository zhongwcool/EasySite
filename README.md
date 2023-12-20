# EasySite
Fast deployment of a simple website on Nginx.

## How to work

### 1. 配置文件
复制配置文件到`nginx-1.x.x`目录下

### 2. 启动Node.js

#### 2.1 装 Node.js 和 NPM
从 Node.js 官网 下载并安装它们。

#### 2.2 设置你的项目
在`nginx`目录下执行:
```shell
mkdir my-server
cd my-server
npm init -y
```
这将创建一个 package.json 文件，它用于管理你的项目依赖。

#### 2.3 安装 Express 和其他依赖
```shell
npm install express express-fileupload
```

#### 2.4 运行你的服务器
```shell
node server.js
```

#### 2.5 确保服务器持续运行（可选）
```shell
npm install pm2 -g
pm2 start server.js
pm2 save
pm2 startup
```

### 3. 启动Nginx

#### 3.1 配置文件上传
修改`conf\nginx.conf`:

```xml
server {
    listen 80;
    server_name example.com; # 更改为你的域名或服务器 IP

    location /upload {
        proxy_pass http://localhost:3000; # 假设你的应用运行在 3000 端口
        proxy_set_header Host $host;
        client_max_body_size 100M; # 设置允许上传的最大文件大小
    }
}
```

#### 3.2 配置文件下载
修改`conf\nginx.conf`:

```xml
server {
    # ... 其他配置 ...

    location /files {
        alias /path/to/your/files; # 文件存放的目录
        autoindex on; # 如果你想列出目录中的文件
    }
}

```