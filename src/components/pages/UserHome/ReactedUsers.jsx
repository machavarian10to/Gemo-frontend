import PropTypes from 'prop-types';
import UserAvatar from '@/components/shared/UserAvatar';

function ReactedUsers({ reactUsers }) {
  return (
    <div>
      {reactUsers.users?.map((user) => (
        <div key={user._id} className='user-gem__emoji-usernames-wrapper'>
          <UserAvatar src={user.profilePhoto} width={17} height={17} />
          <div className='user-gem__emoji-username'>@{user.username}</div>
        </div>
      ))}

      {reactUsers.totalReacts > 3 && (
        <div className='user-gem__emoji-total-reacts'>
          and <span>{reactUsers.totalReacts - 3}</span> more reacted
        </div>
      )}
    </div>
  );
}

ReactedUsers.propTypes = {
  reactUsers: PropTypes.object.isRequired,
};

export default ReactedUsers;
