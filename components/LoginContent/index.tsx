'use client';

import { Fragment, useState } from 'react';

const Index = () => {
  const [uid, setUid] = useState('');
  const randomUid = () => {
    const uid = Math.random().toString(36).slice(2, 20);
    console.log(uid);
    setUid(uid);
  };

  return (
    <Fragment>
      <input
        type="text"
        name="uid"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
      <button onClick={randomUid}>random</button>
      <button type="submit">登录</button>
    </Fragment>
  );
};

export default Index;
