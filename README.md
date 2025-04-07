
## 使用技術

### フロントエンド

![React](https://img.shields.io/badge/Frontend_Framework-React-blue?logo=react)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-blue?logo=typescript)

### バックエンド

![Express](https://img.shields.io/badge/Backend_Framework-Express-black?logo=express)
![Node.js](https://img.shields.io/badge/Language-Node.js-green?logo=node.js)

### ミドルウェア

![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)

### インフラ

![Docker](https://img.shields.io/badge/Infrastructure-Docker-blue?logo=docker)
![Linux](https://img.shields.io/badge/OS-Linux-yellow?logo=linux)
![Raspberry Pi](https://img.shields.io/badge/Hardware-RaspberryPi-C51A4A?logo=raspberry-pi)

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [開発環境の構築](#開発環境の構築)
3. [ディレクトリ構成](#ディレクトリ構成)



## 1.プロジェクトについて
研究室の出席管理を行うためのWebアプリケーションです。
カードキーをカードリーダーにかざすと、カードの情報を読み取り、画面上に誰が出席しているのかを表示することが出来ます。

## 2.開発環境の構築
このプロジェクトでは、Dockerを使用して開発環境を統一しています。
# 開発環境のセットアップ方法
・Dockerのインストールをします。
macOSの場合・・Docker Desktop for Macのインストールを行う
Windowsの場合・・Docker Desktop for Windowsのインストールを行う
Ubuntu、CentOSの場合・・パッケージのインストール、Dockerのインストールを行う
・Docker Composeのインストールを行う

# プロジェクトのセットアップ
・リポジトリのクローンを行う
git clone https://github.com/mktmkt141/lab-management.git
・プロジェクトのディレクトリに移動する
cd lab-management
・Dockerコンテナをビルドして起動する
docker compose up --build -d
・mongodbの初期化方法
docker exec -it mongodb_container mongosh -u admin -p password --authenticationDatabase admin
・myappDBにユーザーの作成を行う
use myappDB
db.createUser({ user: "admin", pwd: "password",  roles: [{ role: "readWrite", db: "myappDB" }] })
・最後にbackend_containerの再起動を行う
docker compose restart backend_container

## 3.ディレクトリ構成
sudo apt install tree
tree













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
