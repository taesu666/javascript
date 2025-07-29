// 웹서버 만들기

// 다른 개발자가 만들어둔 모듈 불러오기
const http = require('http');
const express = require('express');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin'
})

// 웹서비스를 위한 객체 만들기
const app = express();

// 웹페이지 파일을 저장해두고 불러와서 사용하기 위해 사용되는 모듈에 대한 설정
app.set('views', './views');
app.set('view engine', 'ejs');

// 라우터 설정하기
// 클라이언트(요청을 하는 쪽, 웹 브라우저)에서 요청경로로 
// 요청하는 것을 어떤 함수로 실행시켜서 응답을 보내줄지를 결정해주는 것
// 요청경로 -> 함수 매칭
const router = express.Router();
app.use('/', router);

// /person/list 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/list').get(async (req, res) => {
    console.log('person/list 요청됨');

    let conn;

    try {
        // 데이터 베이스에서 데이터 조회하기
        const sql = `select id, name, age, mobile from test.person`;
        conn = await pool.getConnection();
        let rows = await conn.query(sql, []);
        const context = {
            persons: rows
        }

        // views 폴더 안에 있는 list.ejs 웹페이지 파일을 읽어오고
        // context 객체(붕어빵) 안에 있는 속성들을 웹페이지와 결합해서
        // 콜백함수의 두번째 구멍으로 전달
        req.app.render('list', context, (err, html) => {
            // 만약 첫번째 구멍을 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리중 에러 : ${err}`);
                return;
            }
            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트 (요청한 쪽, 웹브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})

router.route('/person/add').get(async (req, res) => {
    console.log('person/add 요청됨');

    // 클라이언트로 부터 전달받은 요청 파라미터 확인
    const params = req.query;
    console.log(`요청파라미터 -> params: ${JSON.stringify(params)}`);

    try {
        // 클라이언트가 보내중 요청 파라미터를 sql문과 합쳐서 업데이트 실행
        const context = {
            params: params
        }

        // views 폴더 안에 있는 add.ejs 웹페이지 파일을 읽어와서 요청 파라미터로 전달받은 데이터를 결합한 후
        // 콜백함수의 두번째 구멍으로 전달
        req.app.render('add', context, (err, html) => {
            // 만약 첫번째 구멍을 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리중 에러 : ${err}`);
                return;
            }
            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트 (요청한 쪽, 웹브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})
router.route('/person/insert').get(async (req, res) => {
    console.log('person/insert 요청됨');

    // 클라이언트로 부터 전달받은 요청 파라미터 확인
    const params = req.query;
    console.log(`요청파라미터 -> params: ${JSON.stringify(params)}`);

    let conn;

    try {
        // 클라이언트가 보내중 요청 파라미터를 sql문과 합쳐서 업데이트 실행
        let sql = `INSERT into test.person(NAME, age, mobile) VALUES('${params.name}', ${params.age},'${params.mobile}')`;

        conn = await pool.getConnection();
        let rows = await conn.query(sql, []);

        // 업데이트한 결과로 고객 목록을 볼 수있도록 list.ejs 웹페이지 파일을 불러온 후 db의 데이터와 결합해서 응답 보내기
        sql = `select id, name, age, mobile from test.person`;
        rows = await conn.query(sql, []);

        const context = {
            persons: rows
        }

        // views 폴더 안에 있는 list.ejs 웹페이지 파일을 읽어오고
        // context 객체(붕어빵) 안에 있는 속성들을 웹페이지와 결합해서
        // 콜백함수의 두번째 구멍으로 전달
        req.app.render('list', context, (err, html) => {
            // 만약 첫번째 구멍을 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리중 에러 : ${err}`);
                return;
            }
            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트 (요청한 쪽, 웹브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})

// /person/update 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/update').get(async (req, res) => {
    console.log('person/update 요청됨');

    // 클라이언트로 부터 전달받은 요청 파라미터 확인
    const params = req.query;
    console.log(`요청파라미터 -> params: ${JSON.stringify(params)}`);

    try {
        // 클라이언트가 보내중 요청 파라미터를 sql문과 합쳐서 업데이트 실행
        const context = {
            params: params
        }

        // views 폴더 안에 있는 update.ejs 웹페이지 파일을 읽어와서 요청 파라미터로 전달받은 데이터를 결합한 후
        // 콜백함수의 두번째 구멍으로 전달
        req.app.render('update', context, (err, html) => {
            // 만약 첫번째 구멍을 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리중 에러 : ${err}`);
                return;
            }
            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트 (요청한 쪽, 웹브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})
// /person/modify 요청경로로 요청이 들어오면 설정한 콜백함수를 실행함
router.route('/person/modify').get(async (req, res) => {
    console.log('person/modify 요청됨');

    // 클라이언트로 부터 전달받은 요청 파라미터 확인
    const params = req.query;
    console.log(`요청파라미터 -> params: ${JSON.stringify(params)}`);

    let conn;

    try {
        // 클라이언트가 보내중 요청 파라미터를 sql문과 합쳐서 업데이트 실행
        let sql = `update test.person set name = '${params.name}', age = ${params.age}, mobile = '${params.mobile}'
                     where id = ${params.id}`;

        conn = await pool.getConnection();
        let rows = await conn.query(sql, []);

        // 업데이트한 결과로 고객 목록을 볼 수있도록 list.ejs 웹페이지 파일을 불러온 후 db의 데이터와 결합해서 응답 보내기
        sql = `select id, name, age, mobile from test.person`;
        rows = await conn.query(sql, []);

        const context = {
            persons: rows
        }

        // views 폴더 안에 있는 list.ejs 웹페이지 파일을 읽어오고
        // context 객체(붕어빵) 안에 있는 속성들을 웹페이지와 결합해서
        // 콜백함수의 두번째 구멍으로 전달
        req.app.render('list', context, (err, html) => {
            // 만약 첫번째 구멍을 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리중 에러 : ${err}`);
                return;
            }
            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트 (요청한 쪽, 웹브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})

router.route('/person/delete').get(async (req, res) => {
    console.log('person/delete 요청됨');

    // 클라이언트로 부터 전달받은 요청 파라미터 확인
    const params = req.query;
    console.log(`요청파라미터 -> params: ${JSON.stringify(params)}`);

    let conn;

    try {
        // 클라이언트가 보내중 요청 파라미터를 sql문과 합쳐서 업데이트 실행
        let sql = `delete from test.person where id =${params.id}`;

        conn = await pool.getConnection();
        let rows = await conn.query(sql, []);

        // 업데이트한 결과로 고객 목록을 볼 수있도록 list.ejs 웹페이지 파일을 불러온 후 db의 데이터와 결합해서 응답 보내기
        sql = `select id, name, age, mobile from test.person`;
        rows = await conn.query(sql, []);

        const context = {
            persons: rows
        }

        // views 폴더 안에 있는 list.ejs 웹페이지 파일을 읽어오고
        // context 객체(붕어빵) 안에 있는 속성들을 웹페이지와 결합해서
        // 콜백함수의 두번째 구멍으로 전달
        req.app.render('list', context, (err, html) => {
            // 만약 첫번째 구멍을 에러가 전달된다면
            if (err) {
                console.error(`뷰 처리중 에러 : ${err}`);
                return;
            }
            // 정상적으로 두번째 구멍으로 웹페이지가 전달된다면
            // 클라이언트 (요청한 쪽, 웹브라우저) 쪽으로 응답을 보내줌
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`에러발생 -> err ${err}`);
    } finally {
        if (conn) conn.end();
    }
})

// 웹서버 실행하기
const port = 7001;
http.createServer(app).listen(port, () => {
    console.log(`웹서버 실행됨 : ${port}`);
})

