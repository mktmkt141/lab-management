
## 使用技術

### フロントエンド

![React](https://img.shields.io/badge/Frontend_Framework-React-blue?logo=react)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-blue?logo=typescript)

### バックエンド

![Express](https://img.shields.io/badge/Backend_Framework-Express-black?logo=express)
![Node.js](https://img.shields.io/badge/Language-Node.js-green?logo=node.js)

### データベース

![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)

### インフラ

![Docker](https://img.shields.io/badge/Infrastructure-Docker-blue?logo=docker)
![Linux](https://img.shields.io/badge/OS-Linux-yellow?logo=linux)
![Raspberry Pi](https://img.shields.io/badge/Hardware-RaspberryPi-C51A4A?logo=raspberry-pi)

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [ディレクトリ構成](#ディレクトリ構成)
3. [フロントエンドに関して](#フロントエンドに関して)
4. [バックエンドに関して](#バックエンドに関して)
5. [開発環境の構築](#開発環境の構築)
6. [実際の様子](#実際の様子)
7. [認証方式](#認証方式)
8. [苦労したところ](#苦労したところ)
9. [追加したい機能](#追加したい機能)
10. [出欠席の管理に関して](#出欠席の管理に関して)



## プロジェクトについて
研究室の出席管理を行うためのWebアプリケーションです。<br>
ラズパイに繋がれたカードリーダーにカードをかざし、出席を管理できます。<br>
このアプリケーションは研究室に所属している学生のうち、誰が研究室内にいるのかを画面上に出力するためのアプリケーションで、分かりやすい色を使って出席、欠席を判断できるようにしてあります。研究室の学生に配られているカードなどがあれば、カードリーダーにかざすことで画面上の出力を変更し、出席と欠席を簡単に判断できるようになっています。<br>
### カードリーダーにはラズパイをつないでいます。ラズパイやカードリーダーの設定や、詳細は[ここ](https://github.com/mktmkt141/raspi_settings)を見てください。<br>


## ディレクトリ構成
```
.
|-- README.md
|-- after.png
|-- before.png
|-- client
|   |-- Dockerfile
|   |-- Dockerfile.dev
|   |-- README.md
|   |-- node_modules
|   |-- package-lock.json
|   |-- package.json
|   |-- public
|   `-- src
|-- docker-compose.yml
`-- server
    |-- Dockerfile
    |-- Dockerfile.dev
    |-- index.js
    |-- node_modules
    |-- package-lock.json
    |-- package.json
    `-- src
```

## フロントエンドに関して
(自分の理解のために書きました)
### /client/src/api について

**axios とは**<br>
javascript でサーバとのやり取りをするための HTTP リクエストライブラリのこと<br>

**axiosClient.js の役割・・API 通信の共通設定をまとめたファイル。axios を使って、API リクエストの設定や処理の共通化を行う**<br>
BASE_URL の設定を行うことで、変更があった際に一か所で修正できるようになる。また、getToken 関数を定義し、ブラウザのローカルストレージに保存された JWT トークンを取得する。次に、axios インスタンスを定義を行い、作業の手間を省けるようになる。また、リクエストに関して axios のインターセプターを使うことで API を送る直前に自動で JWT トークンをリクエストヘッダーに追加することが出来る。さらに、レスポンスに関しても、axios のインターセプターを使い、レスポンスデータを返すことが出来る。

**authApi.js の役割・・authApi はログイン、ユーザ登録、トークン検証、認証関連の API 通信を一か所にまとめて管理するためのファイル**<br>
ユーザ登録用の API である register で、params を POST リクエストで送信する。<br>
ログイン用の API である login で、params を POST する。<br>
現在の JWT トークンが有効であるかを確認するための API である verifyToken に POST する記述がある。<br>
最後に、ユーザー一覧を取得するための API である users に GET する記述がある。<br>

### /client/src/components/common について

**React Router とは**<br>
ページ遷移を実現するためのライブラリのこと。このファイルでは、usenavigate を利用していて、ボタンを押すことで画面の切り替えを実現している。<br>
**Redux とは**<br>
React が扱う UI の状態を管理するためのフレームワークのことで、状態の管理を行うもの。このファイルでは useSelector を使っている<br>

**useSelector とは**<br>
Redux のストアに保存されている値を読み取るためのフックス。

**Sidebar.jsx について・・ページの左側に用意するログアウト、過去の出席状況、過去の出席を見るためのボタンが配置された部分を定義するためのファイル**<br>
まず、useSelector を使って、Redux から現在のユーザー情報を取得する。次に、ログアウト用の関数を定義し、ここでは、ローカルストレージにある token を削除し、React Router のフック useNavigate を使って定義した navigate を利用してログイン画面に遷移するようにする。<br>
matirial ui の drawer コンポーネントを用意し、variant に permanent とすることで、常に表示されるようにしている。次に、ListItemButton コンポーネントの中に、ユーザーネーム、ログアウトボタンを flex で配置する。同じように、過去の出席と過去の出席状況を一覧で見られるボタン、出席状況(誰が研究室の中にいるのかいるのか)とボタンを flex で並べる。

### /client/src/components/layout について

**useState とは**<br>
React のフックスの一つで、現在の状態とその状態を更新するための関数をペアにしたもの。これを用いることで状態の更新が簡単になる。<br>

**useEffect とは**<br>
React のフックスの一つで、コールバック関数と任意の配列の二つの引数を取る。コールバック関数には、コンポーネントのレンダリングがおきたときや依存値の変更が起きたときに実行されるコードが記述される。また、依存関係の配列には変更を監視するための値を指定し、コールバック関数は、ここの配列が変更されたときに実行される。例えば、空の配列を使用すると、コールバック関数の中身が一度だけ実行され、配列を省略するとコンポーネントのレンダリングの度にエフェクトが実行される。<br>

**useDispatch とは**<br>
Redux のストアにある値を更新したいときに命令を送るためのフックス。状態を変更させるためのもの。

**AppLayout.jsx について・・アプリケーション全体のレイアウトを担当するためのコンポーネントで、認証のチェックとサイドバーの表示を行っている**<br>
まずは、useEffect フックを用いてユーザーがログインしているかを調べる。画面が表示されたときのマウント時のみ第一引数が実行される。第一引数の関数では、非同期処理を用いて JWT トークンを持っているかを調べる。ここでは後述するが、authUtils.js を使っている。authUtils.js から返ってくる値 user が存在すれば、JWT トークンが存在するということ。次に、if 文で user が存在しなかった場合に navigate 関数で login 画面にリダイレクトするようにする。さらに、user が存在(ログインしている)なら、setUser で Redux の userSlice(後述する)にユーザー情報を渡して、dispatch する。<br>
次からは、アプリのレイアウトとユーザーデータの取得を行う。useState を用いて研究室のメンバーの状態変数を定義する。初期値は空の配列。ここには、後で API から取得したユーザー一覧が入る。useEffect を使って、ユーザー一覧の取得を行う。ここでは、第二引数に空の配列を用意し、画面の表示が行われたときにのみ実行される。authApi.users()でユーザー一覧を取得する API リクエストを行い、成功すれば response に値が入り、useState で定義した第二引数の関数 setLabMembers に response 結果が入る。失敗すれば、コンソールに取得の失敗が起きたことを表示させる。最後に、return 文でサイドバーと子ルートの中身を display:flex で表示させる。(App.js の中でルーティング設定を行い、過去の出席状況をみられる、「/logs」と出席者の状況がみられる「/Home」がルーティングされている。)<br>
**Outlet とは**<br> 
Outletは、親コンポーネント内で子ルートをレンダリングするために使われる。親のレイアウトを保持しながら異なるページを表示できる。<br>
**useLocation とは**<br>
現在の URL の情報を取得することが出来る React Router が提供するフックス。<br>

**AuthLayout.jsx について・・認証状態を確認して、認証済みだったら他のページにリダイレクトする認証に関する共通のレイアウトを提供するファイル**<br>
まず、useEffect を使って、ログイン済みのユーザーがログインページなどの認証前のページに来たら、自動で「/」にリダイレクトさせるためのファイル。authUtils の isAuthenticated を呼び出し、戻り値が true(ログイン済み)かつ、loacation.pathname(今いる URL のパス)が「/」ではない場合に、navigate を使って、「/」にリダイレクトさせている。<br>
最後に、return 文を使って、レイアウトの記述を行っている。<br>

### client/src/redux/features/userSlice.js について

**Redux toolkit とは**<br>
Redux のコード開発を効率よく記述できるようにするためのもの<br>
**createSlice とは**<br>
Redux における状態とそれをどう更新するかを定義するまとまりを作るための関数のこと。例えば、ユーザー情報を管理するためのスライスは userSlice、todo リストを管理するためのスライスが todoSlice と勝手に定義する。<br>
**userSlice.js について・・ユーザー情報を管理するための Redux の slice を定義している**<br>
まずは、createSlice を使う。次に、initialState で、Redux の初期状態を定義する。(ここでは空の配列を用いる)<br>
次に、user 状態に関する Redux のロジックを定義する。setUser という名前の reducer を定義し、ユーザー情報(action.payload)を state に保存する。<br>

### client/src/redux/store.js について

**configureStore とは**<br>
Redux のストアを設定するための関数のこと。<br>
**store.js について・・Redux ストアを設定するためのコードのこと。アプリケーション全体で状態の管理を行い、Redux を使って状態の取得と更新を行う**<br>
まず、userSlice.js で定義した userSlice から作成された reducer をインポートする。次に、configureStore のオプションとして渡される reducer でストア内の state を管理する。キーを user にして(ストア内での状態の名前のことで、アプリケーションのユーザー情報を管理するためのもの)、値を userReducer にする。userReducer とは実際に user 状態を管理するためのロジック。(useSlice から作られた reducer)この、configureStore を使って、store を作る。<br>

**userSlice.js と store.js の関係性について**<br>
userSlice.js は、Redux の状態とその更新方法を定義する場所で、user というスライスを作成した。このスライスには setUser というアクションと、ユーザー情報を保存するためのリデューサーが含まれる。一方、store.js では configureStore を使ってストアを作り、user スライスをストアに追加している。まとめると、userSlice.js で定義した状態(user)やアクション(setUser)を store.js で管理し、アプリケーション全体で使えるようにしたという関係。<br>

### client/src/utils/authUtils.js について

**authUtils.js について・・ユーザー認証に関するユーティリティ関数を提供するオブジェクト。ユーザーが JWT を使用して認証されているかを確認するための関数が定義されている**<br>
isAuthenticated というキーに非同期関数を値として割り当てる。isAuthenticated の中では、JWT トークンをローカルストレージの中から取得し、token が存在しなければ、false を返す。次に、try,catch 文でトークンの検証を行う。authApi.veryfiToken 関数でバックエンドの APi にリクエストを送る。(veryfiToken はサーバー側でトークンの検証を行い、レスポンスを返す)もし、トークンが有効であれば、res.user にユーザー情報は含まれている。もし、存在しなかったら false を返す。<br>

### client/index.js について

**Redux の store と Provider とは**<br>
store とは、状態(state)を管理する場所のことで、ログイン情報やユーザー情報などをアプリ全体で管理できるようになる。Provider とは、React アプリ全体で、useSelector や、useDispatch などが store にアクセスできるようになる。<br>
**index.js について・・アプリ全体の最初に実行されるファイルのこと**<br>
Redux ストアを使うために store と Provider をインポートする。次に、App を Provider で囲う。こうすることで、App.js で定義された React コンポーネントを Provider で囲い、App.js で定義されたコンポーネントに Redux のストアを渡せるようになる。

### client/App.js について

**BrouserRouter とは**<br>
ルーティングを管理するためのコンポーネント。React Router のコンポーネントで、URL の管理とページ遷移を担う。<br>
**Routes とは**<br>
ルートを定義するためのコンポーネント。アプリケーション内で定義された全てのルートを管理する。<br>
**Route とは**<br>
それぞれのパスとそのパスに対するコンポーネントをマッピングする。パスの定義を行い、それに対応するコンポーネントを設定する(Login コンポーネントなど)
**ThemeProvider とは**<br>
アプリケーション全体にテーマを適用するためのコンポーネント。

**App.js について・・アプリケーション全体のメインコンポーネントにたる。**
react-router-dom から BrouserRouter、Route、Routes をインポートしている。次に、Route で「/」を定義し、その中に AuthLayout コンポーネントを表示する。その下に、login、register のサブパスにそれぞれに対応するコンポーネントを設定する。もう一つの Route には、「/」を定義し、AppLayout コンポーネントを設定する。さらにサブパスに logs と index(デフォルトのパス)とし、それぞれに Logs と Home コンポーネントを設定する。

### client/src/pages/Home.jsx について

**Home.jsx について・・研究室のメンバーの出席状況を表示させるためのアプリケーションの一部。出席状況をサーバから定期的に取得し、UI に表示させるためのもの。**

### client/src/pages/Login.jsx について

**Login.jsx について・・ログイン画面のコンポーネントで、メールアドレスとカード番号を入力してログインする画面の設定を行うためのもの**<br>
usestate を用いて、各入力フィールドのエラーメッセージを管理する。また、ログインボタンが押されたときにローディングの表示を行うためのもの。<br>
handlsubmit 関数を定義し、data 部分を取得、その中から email と idm の二種類の要素を trim する。そして API と通信を、authApi.login を用いて行う。成功したら、トークンを localstorage に保存し navigate 関数でトップページに遷移する。

### client/src/pages/Register.jsx について

**Register.jsx について・・新規ユーザー登録画面のコンポーネント**<br>
ユーザーに必要な情報を入力させ、入力値のバリデーションチェック、API を叩いて新規登録の実行、失敗すればログイン状態にして「/」にリダイレクトする。usestate を用いてエラーテキストとローディングの状態を管理する。handleSubmit 関数で API リクエストを実行し、authApi.register で入力値の登録を行い、JWT トークンをローカルストレージに保存する。失敗すればサーバからの返信内容をもとにどのフィールドにエラーがあるかをチェックし、該当箇所にエラーテキストを表示する。

## バックエンドに関して
(自分の理解のために書きました)

**Express とは**<br>
Node.js での開発をスピードアップするためのフレームワークのこと<br>
**index.js について・・バックエンドのエントリーポイントに関しての記述がされているファイル**<br>
Express、Mongoose、JWT モジュールの読み込み、ミドルウェアの設定、MONGODB への接続、ルーティングの設定、サーバの起動を行っている。<br>

### server/src/v1/models/user.js 　について

**models/user.js について・・MongoDB に保存するユーザーのデータ構造を定義したスキーマのファイル**<br>
ユーザーネーム、メールアドレス、権限などをフィールドとして定義する。mongoose.Schema でユーザー情報の型や制約を定義し、mongoose.model で定義したスキーマをもとに実際のデータベースモデルを作る。<br>

### server/src/v1/controllers/user.js 　について

**controllers/user.js について・・ユーザー関連のロジックを API ごとにまとめたファイルのこと**<br>
exports.register でユーザー登録 API を設定し、req.body で受け取ったデータをそのまま User.create に渡してユーザーの登録を行う。成功したら JWT トークンの発行を行う。exports.scan で IC カードをスキャンするときに入退出を判定する API を作成する。IC カードの識別番号(idm)から該当ユーザーを探す。いた場合は、status の値を切り替える。最後に、exports.login でログイン処理を行う。email と idm の両方が一致するユーザーを探す。存在したらトークンを生成して返す。<br>

### server/handlers/tokenHandlers.js について

**tokenHandlers.js について・・JWT トークンを使った認証処理を行うファイルのこと**<br>
tokenDecode で、トークンの解析を行う。クライアントから渡されたリクエストヘッダー Authorization を確認し、token 部分を split 関数で抽出する。秘密鍵と有効期限を検証し、デコードされたペイロードを返却する。<br>
exports.verifyToken で、認証ミドルウェアの定義を行う。tokenDecode でトークンの検証とデコードを行い、デコードされたペイロードｋら id を使って、MongoDB にいる該当ユーザーを探す。これは、ミドルウェアとして存在し、ルートファイルなどで使われる。 <br>

### server/handlers/validation.js 　について

**validation.js について・・バリデーションチェックエラーのハンドリング処理を担当するミドルウェア**<br>
このファイルでは、express-validator ライブラリを組み合わせて使われるミドルウェア関数。バリエーションエラーがあれば、レスポンスを返すようになっている。<br>

### server/src/v1/routes/auth.js 　について

**auth.js について・・ユーザー認証、登録、ステータス更新などの API ルートをまとめている部分**<br>
router.post("/register",...)で、ユーザー新規登録 API の部分で、ユーザーネーム、カード識別番号。メールアドレスなどに対するバリデーションチェックを行う。問題がなければ、userController.register が呼び出され、登録処理が行われる。次に、router.post("/scan",..)で IC カードのスキャン API を設定する。userController.scan でステータスの更新と JWT トークンの発行を行う。次に。router.post("/login",...)でログイン API を設定する。メールアドレスとカード識別番号が空でないかを確認する。正常なら、userController.login が呼ばれてユーザー確認とトークンの返却が行われる。最後に、router.post("/verify-token")で JWT トークンの検証を行う。verifyToken ミドルウェアでクライアントから送られたトークンが正しいかを検証する。<br>


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
`cd lab-management`<br>
・Dockerコンテナをビルドして起動する<br>
`docker compose up --build -d`<br>
・mongodbの初期化方法<br>
`docker exec -it mongodb_container mongosh -u admin -p password --authenticationDatabase admin`<br>
・myappDBにユーザーの作成を行う<br>
`use myappDB`<br>
`db.createUser({ user: "admin", pwd: "password",  roles: [{ role: "readWrite", db: "myappDB" }] })`<br>
・最後にbackend_containerの再起動を行う<br>
`docker compose restart backend_container`<br>

### 実際の様子
新規登録画面の様子が以下になります。↓<br>
![新規登録の写真](https://github.com/mktmkt141/lab-management/raw/main/account-make.png)<br>
ログイン画面の様子が以下になります。↓<br>
![ログイン画面の写真](https://github.com/mktmkt141/lab-management/raw/main/login.png)<br>
カードリーダーにカードをタッチする前は、画面に赤いマークが光っているが、↓<br>
![欠席状態の写真](https://github.com/mktmkt141/lab-management/raw/main/before.png)<br>
カードリーダーにカードをかざした後は、画面に緑色のマークが光るようになる。↓<br>
![欠席状態の写真](https://github.com/mktmkt141/lab-management/raw/main/after.png)<br>



### 認証方式
JWTを使った認証方式を採用しています。ログイン成功時にクライアントにJWTを発行し、クライアント側のローカルストレージに保存します。また、APIリクエスト時にはAuthorizationヘッダーにトークンを付けます。<br>

### 苦労したところ
ユーザー新規登録画面から、ユーザを作ると、エラーが起きたところ。<br>
→BASE_URLに「`http://localhost~`」の値を入れていて、実際のipアドレス(研究室のプライベートipアドレス)を入れていなかったのでフロントとバックエンドの接続が出来ていなかった。<br>
Docker composeで環境構築をしたあとに、データベースの設定が上手くいかなかった。<br>
→mongodbのコンテナの中に入り、ユーザ名、パスワードの設定を忘れていた。<br>
**ネットワークや、インフラの部分で躓くことが多く、自分の知識量の無さを痛感したことと、「システムを作る＝プログラミング」という認識が無くなりました。何か物を作る時にはプログラムを書いたりするだけではなくて、色々な知識が総合的に必要になるのだと分かりました。**

### 追加したい機能
追加したい機能・・研究室からの退出と入出が確認出来たらスラック上に通知が来る機能を追加したい。また、httpsの設定も行いたい。<br>


### ユーザー新規作成の流れ
①カードキー番号をカードリーダーにかざし読み取る。
②ユーザーに名前、メールアドレス、カードキーの番号、役割、(スラックのID)を入力させる。<br>
③入力された内容からバリデーションチェックを行う。(express-validatorを利用)<br>
④そのユーザーがすでに存在しているかを調べる。(express-validatorを利用)<br>
⑤DBに情報を保存<br>
⑥jwt発行してクライアントへ渡す。<br>

### 出欠席の管理に関して
ラズパイの中のファイルを用いてカードリーダーにカードをかざし、カード番号を取得する。取得した番号を用いてユーザー新規登録に使う。<br>
次に、違うファイルを利用してカードをかざしてバックエンドにカード情報を送り、学生の出席と欠席の状態が変更され、スピーカーで出席か欠席かの音声が流れる。<br>

