const express = require('express');
const app = express();

app.listen(1111);

const youtuber1 = {
	channelTitle: '십오야',
	sub: '593만명',
	videoNum: '993개',
};

const youtuber2 = {
	channelTitle: '침착맨',
	sub: '227만명',
	videoNum: '6.6천개',
};

const youtuber3 = {
	channelTitle: '테오',
	sub: '54.8만명',
	videoNum: '726개',
};

const db = new Map();

db.set('십오야', youtuber1);
db.set('침착맨', youtuber2);
db.set('테오', youtuber3);

// 등록
app.use(express.json()); // http 외 모듈인 '미들웨어':json 설정
app.post('/youtubers', (req, res) => {
	const key = req.body.channelTitle;
	const youtuberInfo = req.body;
	db.set(key, youtuberInfo);
	// res.json(youtuberInfo);
	res.send(`${key}님 유튜브 시작을 환영합니다!`);
	console.log(db);
});

// 개별조회
app.get('/youtubers/:id', function (req, res) {
	let { id } = req.params;
	// id = parseInt(id);

	const idInfo = db.get(id);
	if (idInfo === undefined) {
		res.json({ message: '찾으시는 유튜버가 없습니다.' });
	} else {
		res.json({
			...idInfo,
		});
	}
});

// 전체조회
app.get('/youtubers', function (req, res) {
	const data = [...db].map((d) => d[1]);
	res.json(data);
});
