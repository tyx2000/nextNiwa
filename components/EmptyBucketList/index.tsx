'use client';

import styles from './index.module.css';
import recordScreenAndAudio from '@/utils/recordScreen';

const Index = ({}) => {
  return (
    <div className={styles.empty}>
      <div className={styles.createIcon}></div>
      <div className={styles.createText}>Create Bucket</div>
    </div>
  );
};

export default Index;
