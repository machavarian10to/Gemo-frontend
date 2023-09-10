import Search from '@/components/UserHome/Search';
import PostContainer from '@/components/UserHome/PostContainer';

function UserHome() {
  return (
    <div className='user-home'>
      <div className='container-wrapper'>
        <PostContainer />
        <Search />
      </div>
    </div>
  );
}
export default UserHome;
