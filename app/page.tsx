import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page} id="gridPage">
      {new Array(1600).fill(1).map((d, i) => (
        <div key={d + i}></div>
      ))}
    </div>
  );
}
