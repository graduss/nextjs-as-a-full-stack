import PersonIcon from '@mui/icons-material/Person';
import { TUserOut } from '../../types';

export default function UserAvatar({user}: {user: TUserOut}) {
  return (
    <div className="">
      <PersonIcon />
      <label>{user.username}</label>
    </div>
  );
}