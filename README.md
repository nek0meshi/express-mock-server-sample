# Express Mock Server Sample

## Overview

スマホアプリ等の開発時に利用可能な、ダミーデータを返すサーバの実装例です。
* Expressで製作しています。
  * https://expressjs.com/ja/
* Usageで記載したいくつかのRequest/Responseを試せます。
* nodemonでwatchするので、ソースコードを更新するとサーバも自動更新されます。

## Requirements
（Dockerで起動する場合）
* Docker
* Docker-compose

もちろん、Dockerなしでも動きます。

## Getting started
```bash
$ cd docker
$ docker-compose --project-dir .. up
```

## Usage

### GET /posts

```bash
## query stringを指定しない場合
$ curl http://localhost:4000/posts

## page/per_pageを指定
$ curl http://localhost:4000/posts?page=2&per_page=10
```

### GET /posts/:id

```bash
$ curl http://localhost:4000/posts/1
```

### POST /posts/store

```bash
## Authorizationをヘッダに指定しないと、401 Unauthorized
$ curl -XPOST http://localhost:4000/posts/store -i

## Authorizationを指定すると200 トークンは何でもいい
$ curl -XPOST http://localhost:4000/posts/store -H "Authorization: token" -i
