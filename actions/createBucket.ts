'use server';

import { createServer } from '@/utils/supabase';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const createBucket = async () => {
  const cookieStore = await cookies();
  const supabase = await createServer(cookieStore);
  const res = await supabase.storage.createBucket('files', {
    public: false,
    allowedMimeTypes: ['image/png', 'image/jpg'],
    fileSizeLimit: 1024 * 1024 * 10,
  });

  console.log(res);

  revalidatePath('/');
};

export default createBucket;
