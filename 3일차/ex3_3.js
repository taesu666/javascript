// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈(라이브러리) 불러오기
const http = require('http');
const express = require('express');
const { hrtime } = require('process');

// 2. express를 이용해서 웹서버를 위한 객체 만들기
const app = express();

// 6. 뷰(웹페이지를 파일로 받았다가) 사용하기 위해 설정
app.set('views','./views');
app.set('view engine','ejs');

// 4. 미들웨어(중간에 가로챈다) 추가하기

// 5. 라우터 추가하기
const router = express.Router();
app.use(`/`, router);

router.route('/page/first').get((req, res) => {
    console.log(`/page/first 요청됨`);

    const context = {
        username: '홍길동1'
    }
    req.app.render('first', context, (err, html) => {
        if(err) {
            console.error(`뷰 처리중 에러 ${err}`);
            return;
        }

        res.writeHead(200, {'Content-type':'text/html;charest=utf8'});
        res.end(html);
    });
})

router.route('/page/second').get((req, res) => {
    console.log(`/page/second 요청됨`);

    const params = req.query;

    const context = {
        name: params.name
    }
    req.app.render('second',context,(err,html) => {
        if(err) {
            console.error(`뷰 처리중 에러 -> ${err}`);
            return;
        }

        res.writeHead(200, {'Content-type':'text/html;charset=utf8'});
        res.end(html);
    })
})
// 3. 웹서버 실행하기
// 7001번 포트로 웹서버가 대기하게 됨
http.createServer(app).listen(7001, () => {
    console.log(`웹서버 실행됨`);
})