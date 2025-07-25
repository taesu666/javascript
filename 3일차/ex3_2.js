// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈(라이브러리) 불러오기
const http = require('http');
const express = require('express');
const { hrtime } = require('process');

// 2. express를 이용해서 웹서버를 위한 객체 만들기
const app = express();

// 4. 미들웨어(중간에 가로챈다) 추가하기

// 5. 라우터 추가하기
const router = express.Router();
app.use(`/`, router);

router.route('/page/first').get((req, res) => {
    console.log(`/page/first 요청됨`);

    res.writeHead(200, { 'Content-type': 'text/html;charset=utf8' })
    res.end(`
      <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>웹서버에서 받아온 페이지</title>
            </head>
            <body>
                <h1>첫번째 페이지</h1>
                <a href="/page/second">두번째 페이지로</a>
            </body>
        </html>
        `)
})

router.route('/page/second').get((req, res) => {
    console.log(`/page/second 요청됨`);

    res.writeHead(200, { 'Content-type': 'text/html;charset=utf8' })
    res.end('<h1> 두번째 페이지</h>')
})
// 3. 웹서버 실행하기
// 7001번 포트로 웹서버가 대기하게 됨
http.createServer(app).listen(7001, () => {
    console.log(`웹서버 실행됨`);
})