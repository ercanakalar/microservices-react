import PostCreate from './post-create';
import PostList from './post-list';

export default function Home() {
  return (
    <main className='flex justify-center flex-col mx-16'>
      <h1 className='flex justify-center text-2xl font-bold'>Create Post</h1>
      <PostCreate />
      <hr />
      <h1 className='flex justify-center text-2xl font-bold'>Posts</h1>
      <PostList />
    </main>
  );
}
