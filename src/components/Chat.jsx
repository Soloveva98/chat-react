import React, { useRef, useState } from 'react';
import socket from '../socket';


const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
	const [messageValue, setMessageValue] = useState('');
	const messagesRef = useRef(null);


	const onSendMessage = () => {
		socket.emit('ROOM:NEW_MESSAGE', {
			userName,
			roomId,
			text: messageValue,
		});
		onAddMessage({ userName, text: messageValue });
		setMessageValue('');
	};

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 99999);
	}, [messages]);

	return (
		<div className="chat">
			<div className="chat-users">
				Комната: <b>{roomId}</b>
				<hr />
				<b>Онлайн ({users.length}):</b>
				<ul>
					{
						users.map((userName, i) => <li key={i}>{userName}</li>)
					}
				</ul>
			</div>
			<div className="chat-messages">
				<div ref={messagesRef} className="messages">
					{
						messages.map((message) => (
							<div className="message">
								<p>{message.text}</p>
								<div>
									<span>{message.userName}</span>
								</div>
							</div>
						))
					}
				</div>
				<form>
					<textarea
						value={messageValue}
						onChange={(e) => setMessageValue(e.target.value)}
						className="form-control"
						rows="3"></textarea>
					<button onClick={onSendMessage} type="button" className="btn btn-primary">
						Отправить
					</button>
				</form>
			</div>
		</div>
	)
};

export default Chat;