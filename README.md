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
