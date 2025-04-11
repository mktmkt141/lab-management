
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
3. [実際の様子](#実際の様子)



## プロジェクトについて
研究室の出席管理を行うためのWebアプリケーションです。<br>
カードキーをカードリーダーにかざすと、カードの情報を読み取り、画面上に誰が出席しているのかを表示することが出来ます。

## 開発環境の構築
このプロジェクトでは、Dockerを使用して開発環境を統一しています。
### 開発環境のセットアップ方法
・Dockerのインストールをします。<br>
macOSの場合・・Docker Desktop for Macのインストールを行う<br>
Windowsの場合・・Docker Desktop for Windowsのインストールを行う<br>
Ubuntu、CentOSの場合・・パッケージのインストール、Dockerのインストールを行う<br>
・Docker Composeのインストールを行う<br>

### プロジェクトのセットアップ
・リポジトリのクローンを行う<br>

・プロジェクトのディレクトリに移動する<br>
cd lab-management<br>
・Dockerコンテナをビルドして起動する<br>
docker compose up --build -d<br>
・mongodbの初期化方法<br>
docker exec -it mongodb_container mongosh -u admin -p password --authenticationDatabase admin<br>
・myappDBにユーザーの作成を行う<br>
use myappDB<br>
db.createUser({ user: "admin", pwd: "password",  roles: [{ role: "readWrite", db: "myappDB" }] })<br>
・最後にbackend_containerの再起動を行う<br>
docker compose restart backend_container<br>

### 実際の様子
カードリーダーにカードをタッチする前は、画面に赤いマークが光っているが、↓<br>
![欠席状態の写真](https://github.com/mktmkt141/lab-management/raw/main/before.png)<br>
カードリーダーにカードをかざした後は、画面に緑色のマークが光るようになる。↓<br>
![欠席状態の写真](https://github.com/mktmkt141/lab-management/raw/main/after.png)<br>

ラズパイやカードリーダーの設定や、詳細は[ここ](https://github.com/mktmkt141/raspi_settings)を見てください。

