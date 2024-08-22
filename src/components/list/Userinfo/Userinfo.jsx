import { auth } from "../../../lib/firebse";
import { useUserStore } from "../../../lib/userStore";
import "./userinfo.css";
const Userinfo = () => {
  const { curruser } = useUserStore();

  return (
    <div className='userinfo'>
      <div className='user'>
        <img src={curruser.avatar || "./avatar.png"}></img>
        <h2 >{curruser.username} </h2>

      </div>
      <div className='icons'>

        <button className="logout" onClick={() => auth.signOut()}>Logout</button>

      </div>

    </div>
  )
}

export default Userinfo