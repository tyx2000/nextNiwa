import { createServer } from '@/utils/supabase';
import styles from './page.module.css';
import { cookies } from 'next/headers';
import BucketWrapper from '@/components/BucketWrapper';

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = await createServer(cookieStore);
  const { data = [] } = await supabase.storage.listBuckets();

  return (
    <div className={styles.page} id="gridPage">
      <BucketWrapper buckets={data} />
    </div>
  );
}
