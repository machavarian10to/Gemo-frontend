import UserAvatar from '@/components/shared/UserAvatar';

function Post() {
  return (
    <div className='user-post'>
      <div className='user-post-user-info'>
        <UserAvatar
          size='30'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
        />
        <div>
          <div className='username'>@machavarian10to</div>
          <div>Novice Cook</div>
        </div>
      </div>

      <div className='user-post-date'>
        <span>•</span>
        <span>1d</span>
      </div>
    </div>
  );
}

export default Post;
