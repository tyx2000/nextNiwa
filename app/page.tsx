import { createServer } from '@/utils/supabase';
import styles from './page.module.css';
import { cookies } from 'next/headers';
import BucketWrapper from '@/components/BucketWrapper';
import Badge from '@/components/Badge';
import queryMessage from '@/actions/queryMessage';
import { login } from '@/actions/user';
import LoginContent from '@/components/LoginContent';

export default async function Home() {
  // const cookieStore = await cookies();
  // const supabase = await createServer(cookieStore);
  // const { data = [] } = await supabase.storage.listBuckets();

  await queryMessage();

  return (
    <div className={styles.page} id="gridPage">
      {/*<BucketWrapper buckets={data} />*/}
      <form action={login}>
        <LoginContent />
      </form>
    </div>
  );
}
