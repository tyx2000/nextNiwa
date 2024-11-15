'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { chat } from '@/actions/user';

const Index = ({ token }: { token: string }) => {
  const socketRef = useRef<any>();
  const [targetId, setTargetId] = useState('');
  const [socketId, setSocketId] = useState<string>();
  const [targetSocketId, setTargetSocketId] = useState<string>();

  const [chatContent, setChatContent] = useState('');

  useEffect(() => {
    if (token) {
      const socket = io('http://localhost:8080?userId=' + token);
      socketRef.current = socket;
      socket.on('connect', () => {
        console.log(socket.id);
        setSocketId(socket.id);
      });
      socket.on('receiveMessage', (msg) => {
        console.log('mmmmmmmmmmmmmm', msg);
      });
      socket.on('disconnect', () => {});
      socket.on('close', () => {
        console.log('close');
      });
      socket.on('error', () => {
        console.log('error');
      });
    }
  }, []);

  const connect = async () => {
    const { data } = await chat(targetId);
    if (data && data?.targetSocketId) {
      setTargetSocketId(data?.targetSocketId);
    }
  };

  const sendMessage = () => {
    console.log('---------', chatContent);
    socketRef.current.emit('transferCenter', {
      targetSocketId,
      message: chatContent,
    });
  };

  return (
    <Fragment>
      <br />
      <input
        type="text"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
      />
      <button onClick={connect}>chat</button>
      <br />
      我的socketId - {socketId}
      <br />
      对方socketId - {targetSocketId}
      <br />
      <div>
        <input
          type="text"
          value={chatContent}
          onChange={(e) => setChatContent(e.target.value)}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </Fragment>
  );
};

export default Index;
