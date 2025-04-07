
## 使用技術

### フロントエンド

![React](https://img.shields.io/badge/Frontend_Framework-React-blue?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)

### バックエンド

![Express](https://img.shields.io/badge/Backend_Framework-Express-black?logo=express)
![Node.js](https://img.shields.io/badge/Language-Node.js-green?logo=node.js)

### ミドルウェア

![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)

### インフラ

![Docker](https://img.shields.io/badge/Infrastructure-Docker-blue?logo=docker)
![Linux](https://img.shields.io/badge/OS-Linux-yellow?logo=linux)
![Raspberry Pi](https://img.shields.io/badge/Hardware-RaspberryPi-C51A4A?logo=raspberry-pi)








docker-compose up -d -buildした後に、mongodbのコンテナに入る。

→　docker exec -it mongodb_container mongosh -u admin -p password --authenticationDatabase admin

次に、myappDBにユーザーを作成する。そして、myappDBデータベースにadminユーザを作成する。

→　use myappDB
db.createUser({
  user: "admin",
  pwd: "password",  // 適切なパスワードを設定
  roles: [{ role: "readWrite", db: "myappDB" }]
})

最後にbackend_containerの再起動をする

→　docker-compose restart backend_container
