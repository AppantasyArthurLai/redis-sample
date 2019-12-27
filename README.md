# redis-sample
此專案目的為練習在 Node.js（express）下，如何存取 Redis；最後部署至 Heorku（https://redis-fixerio.herokuapp.com/）

## 參考
https://www.manifold.co/blog/build-super-fast-apps-in-node-js-using-redis-cache-d3d55bbdc375

原本 Manifold 要推廣自家服務，所以寫了這個快速建置 Node.js w/ Redis cache 教學，但沒想到多年後被我翻出來，他們的一些服務（RedisGreen?）失效了；且 Fixer.io 的資料存取方式完全變了，因此整篇將一些資訊更新以後，發佈至 Github、Heroku 上

## 環境(2019-12-27)
1. MacOS 10.15
2. IDE VSCode 1.41
3. Node 10.16.3
4. npm 6.13.4
5. online redis on RedisLabs for free（https://redislabs.com/）
6. online redis-gui on Redsmin for free（https://www.redsmin.com/）
7. host on Heroku

## other frameworks
1. Bulma css framework（https://bulma.io/documentation/overview/start/）
2. Awesome Font
3. Axios Web Ajax

## Data source
1. Fixer.io 匯率查找（https://fixer.io/）


## Installation
### 環境變數
1. FIXIO_KEY
2. REDIS_URL
3. REDIS_PWD

### 運行指令
```bash
npm install
npm start
```

### deploy to Heroku
```bash
heroku create redis-fixerio
heroku git:remote -a redis-fixerio
git push heroku master
```

## Q&A
歡迎交流，會將其中問題各別列舉如下
1. 若要部署至 Heroku 上，需要注意 listen() 裡，port assign 的方式應該用動態的（process.env.PORT || 55688）
2. <link> tag 不要指定 rel="stylecheet"
3. （待續）
