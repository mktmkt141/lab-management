# Node.js の公式イメージを使用
FROM node:18

# 作業ディレクトリの設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ポートを公開
EXPOSE 5000

# アプリケーションを起動
CMD ["node", "index.js"]

