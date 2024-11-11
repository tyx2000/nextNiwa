import styles from './index.module.css';
import EmptyBucketList from '@/components/EmptyBucketList';

const Index = ({ buckets }: { buckets: any[] }) => {
  console.log('============', buckets);
  const emptyBucketList = buckets.length === 0;
  return (
    <div className={styles.wrapper}>
      {emptyBucketList && <EmptyBucketList />}
    </div>
  );
};

export default Index;
