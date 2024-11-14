'use client';

import { Fragment, useState } from 'react';

const Index = () => {
  const [uid, setUid] = useState('');

  return (
    <Fragment>
      <input
        type="text"
        name="uid"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
      <button type="submit">enter</button>
    </Fragment>
  );
};

export default Index;
