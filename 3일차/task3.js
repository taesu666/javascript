// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈(라이브러리) 불러오기
const http = require('http');
const express = require('express');
const { hrtime } = require('process');

// 2. express를 이용해서 웹서버를 위한 객체 만들기
const app = express();

// 6. 뷰(웹페이지를 파일로 받았다가) 사용하기 위해 설정
app.set('views', './views');
app.set('view engine', 'ejs');

// 4. 미들웨어(중간에 가로챈다) 추가하기

// 5. 라우터 추가하기
const router = express.Router();
app.use(`/`, router);

router.route('/page/login').get((req, res) => {

    console.log(`/page/login 요청됨`);

    const params =req.query;
    console.log(`요청 파라미터 -> ${JSON.stringify(params)}`);

    const context = {
        name: params.username
    }

    req.app.render('login', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리중 에러 ${err}`);
            return;
        }

        res.writeHead(200, { 'Content-type': 'text/html;charest=utf8' });
        res.end(html);
    })

})
router.route('/page/mypage').get((req, res) => {
    console.log(`/page/mypage 요청됨`);

    const params = req.query;
    console.log(`요청파라미터 -> ${JSON.stringify(params)}`);
    const context = {
        name: params.username,
        prevPage: params.prevPage   
    }
    req.app.render('mypage', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리중 에러 ${err}`);
            return;
        }

        res.writeHead(200, { 'Content-type': 'text/html;charest=utf8' });
        res.end(html);
    });
})
router.route('/page/cus').get((req, res) => {
    console.log(`/page/cus 요청됨`);

    const params = req.query;
    console.log(`요청파라미터 -> ${JSON.stringify(params)}`);
    const context = {
         name: params.username 
    }
    req.app.render('cus', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리중 에러 ${err}`);
            return;
        }

        res.writeHead(200, { 'Content-type': 'text/html;charest=utf8' });
        res.end(html);
    });
})
router.route('/page/pro').get((req, res) => {
    console.log(`/page/pro 요청됨`);

    const params = req.query;
    console.log(`요청파라미터 -> ${JSON.stringify(params)}`);
    const context = {
        name: params.username 
    }
    req.app.render('pro', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리중 에러 ${err}`);
            return;
        }

        res.writeHead(200, { 'Content-type': 'text/html;charest=utf8' });
        res.end(html);
    });
})
router.route('/page/rev').get((req, res) => {
    console.log(`/page/rev 요청됨`);

    const params = req.query;
    console.log(`요청파라미터 -> ${JSON.stringify(params)}`);
    const context = {
        name: params.username 
    }
    req.app.render('rev', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리중 에러 ${err}`);
            return;
        }

        res.writeHead(200, { 'Content-type': 'text/html;charest=utf8' });
        res.end(html);
    });
})

// 3. 웹서버 실행하기
// 7001번 포트로 웹서버가 대기하게 됨
http.createServer(app).listen(7001, () => {
    console.log(`웹서버 실행됨`);
})