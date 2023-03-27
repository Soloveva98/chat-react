const express = require('express');


const app = express();
const port = process.env.PORT || 4444;

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

const cors = require("cors");

const rooms = new Map();


app.use(express.json());
app.use(cors());

app.get('/rooms', (req, res) => {
	res.json(rooms);
});

io.on('connection', socket => {
	console.log('user connected', socket.id);
});


server.listen(port, (error) => {
	if (error) console.log(error);
	console.log("Server OK");
});