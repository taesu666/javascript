// 웹서버 만들기

// 1. 다른 개발자가 만든 모듈 불러오기
const http = require(`http`);
const express = require(`express`);
const mariadb = require(`mariadb`);

const pool = mariadb.createPool({
    host: 'localhost',
    port: 4406,
    user: 'root',
    password: 'admin'
})

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

const router = express.Router();
app.use('/', router);

router.route(`/page/main`).get((req, res) => {
    console.log(`/page/main 요청됨`);

    let conn;
    const context = {
    }
    req.app.render('main', context, (err, html) => {
        if (err) {
            console.error(`뷰 처리중 에러 발생 -> ${err}`);
            return;
        }
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
        res.end(html);
    })

})

router.route('/page/select').get(async (req, res) => {
    console.log(`/page/select 요청됨`);

    let conn;
    try {
        // 데이터베이스로 sql문 실행 요청하기
        conn = await pool.getConnection();

        const params = req.query;
        selectText = params.selectText;
        const sql = `select ${selectText} from test.person`;
        const rows = await conn.query(sql, []);

        const context = {
            selectText: params.selectText,
            result: rows[0].name
        }

        req.app.render('select', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리중 에러 발생 -> ${err}`);
                return;
            }
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`요청 처리중 에러 -> ${err}`);
    } finally {
        if (conn) { conn.end(); }
    }
})

router.route('/page/insert').get(async (req, res) => {
    console.log(`/page/insert 요청됨`);

    let conn;
    try {
        // 데이터베이스로 sql문 실행 요청하기
        conn = await pool.getConnection();

        const params = req.query;
        insertName = params.insertName;
        insertAgeString = params.insertAge;
        insertAge = Number(insertAgeString);
        insertMoblie = params.insertMoblie;

        const sql = `insert into test.person(name, age, mobile) values('${insertName}',${insertAge} ,'${insertMoblie}')`;
        const rows = await conn.query(sql, []);

        const context = {
            insertName: params.insertName,
            insertAge: params.insertAge,
            insertMoblie: params.insertMoblie,
            result: rows[0].name
        }

        req.app.render('insert', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리중 에러 발생 -> ${err}`);
                return;
            }
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`요청 처리중 에러 -> ${err}`);
    } finally {
        if (conn) { conn.end(); }
    }
})


router.route('/page/select').get(async (req, res) => {
    console.log(`/page/select 요청됨`);

    let conn;
    try {
        // 데이터베이스로 sql문 실행 요청하기
        conn = await pool.getConnection();

        const params = req.query;
        selectText = params.selectText;
        const sql = `select ${selectText} from test.person`;
        const rows = await conn.query(sql, []);

        const context = {
            selectText: params.selectText,
            result: rows[0].name
        }

        req.app.render('select', context, (err, html) => {
            if (err) {
                console.error(`뷰 처리중 에러 발생 -> ${err}`);
                return;
            }
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.end(html);
        })
    } catch (err) {
        console.error(`요청 처리중 에러 -> ${err}`);
    } finally {
        if (conn) { conn.end(); }
    }
})


const port = 7001;
http.createServer(app).listen(port, () => {
    console.log(`웹서버가 실행됨 -> port: ${port}`);
})

