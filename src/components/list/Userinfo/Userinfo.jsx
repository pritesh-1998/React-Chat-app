import { useUserStore } from "../../../lib/userStore";
import "./userinfo.css";
const Userinfo = () => {
    const {curruser} = useUserStore();

  return (
    <div className='userinfo'>
        <div className='user'>
            <img src={curruser.avatar ||"./avatar.png" }></img>
            <h2 >{curruser.username} </h2>

        </div>
        <div className='icons'>
            <img src="./more.png"></img>
            <img src="./video.png"></img>
            <img src="./edit.png"></img>

        </div>

    </div>
  )
}

export default Userinfo