import { createServer } from '@/utils/supabase';
import styles from './page.module.css';
import { cookies } from 'next/headers';
import { login } from '@/actions/user';
import LoginContent from '@/components/LoginContent';
import Chat from '@/components/Chat';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('temp_token');

  const isLogin = !!(token && token.value);

  return (
    <div className={styles.page} id="gridPage">
      {isLogin && token?.value}
      {isLogin ? (
        <Chat token={token.value} />
      ) : (
        <form action={login}>
          <div></div>
          <LoginContent />
        </form>
      )}
    </div>
  );
}
