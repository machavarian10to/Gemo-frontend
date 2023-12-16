import UserAvatar from '@/components/shared/UserAvatar';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function Post() {
  return (
    <div className='user-post'>
      <div className='user-post__group'>
        <PeopleAltOutlinedIcon style={{ color: '#ccc', fontSize: '15px' }} />
        <div className='user-post__group-name'>#food</div>
      </div>

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
                }}
              />
              <div className='user-post__user-level-name'>Novice Cook</div>
            </div>
          </div>
        </div>

        <div className='user-post__date'>
          <span>•</span>
          <span>1d ago</span>
        </div>

        <div className='user-post__menu'>
          <MoreHorizIcon style={{ color: '#828282' }} />
        </div>
      </div>

      <div className='user-post__body'>
        <h3>Whats hardest food to swallow?</h3>
      </div>

      <div className='user-post__footer'>
        <AddReactionOutlinedIcon style={{ fontSize: '19px' }} />
        <SmsOutlinedIcon style={{ fontSize: '19px' }} />
        <ReplyOutlinedIcon style={{ fontSize: '19px' }} />
        <StarBorderOutlinedIcon style={{ fontSize: '19px' }} />
      </div>
    </div>
  );
}

export default Post;
