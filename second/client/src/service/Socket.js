import socketio from 'socket.io-client';

export const socket = socketio.connect('http://localhost:5000');


