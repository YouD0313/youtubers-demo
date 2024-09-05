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
	const youtubers = {};
	[...db].map((d) => {
		youtubers[d[0]] = d[1];
	});

	// const arr = Object.fromEntries(db)

	res.json(youtubers);
});

// 개별삭제
app.delete('/youtubers/:id', (req, res) => {
	const { id } = req.params;
	const idCheck = db.delete(id);
	if (!idCheck) {
		res.json({
			message: `${id}님 계정이 존재하지 않습니다.`,
		});
	} else {
		res.json({
			message: `${id}님 계정이 삭제되었습니다.`,
		});
	}
});

// 전체삭제
app.delete('/youtubers', (req, res) => {
	const size = db.size;
	let msg;
	if (size > 0) {
		db.clear();
		msg = `모든 계정이 삭제되었습니다.`;
	} else {
		msg = `삭제할 계정이 없습니다.`;
	}
	res.json({
		message: msg,
	});
});

// 개별수정
app.put('/youtubers/:id', (req, res) => {
	const { id } = req.params;
	let msg;
	[...db].map((data) => {
		if (data[0] === id) {
			const { channelTitle } = req.body;
			db.set(channelTitle, { ...data[1], channelTitle });
			msg = `${id}님의 계정이 ${channelTitle}로 변경되었습니다.`;
			db.delete(id);
		} else {
			msg = `변경할 유튜버의 계정이 존재하지 않습니다.`;
		}
	});
	console.log(db);

	res.json({
		message: msg,
	});
});
