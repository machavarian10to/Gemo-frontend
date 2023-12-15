import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Post() {
  return (
    <div className='user-post'>
      <div className='user-post__header'>
        <div className='user-post__user-info'>
          <UserAvatar
            size='30'
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSK2EoGu0XOWgOd8Oj5AA8WOE1JS___K5T3QZWO2rVgQ&s'
          />
          <div className='user-post__details'>
            <div className='user-post__username'>@machavarian10to</div>
            <div className='user-post__user-level'>
              <LocalPoliceOutlinedIcon
                style={{
                  color: '#62baac',
                  fontSize: '9px',
                  fontWeight: '800',
                }}
              />
              <div>Novice Cook</div>
            </div>
          </div>
        </div>

        <div className='user-post__date'>
          <span>•</span>
          <span>1d</span>
        </div>

        <div className='user-post__menu'>
          <MoreHorizIcon style={{ color: '#828282' }} />
        </div>
      </div>

      <div className='user-post__body'>
        <h3>IDT-1238 add embed prop and dynamic titles for images</h3>
      </div>
    </div>
  );
}

export default Post;
