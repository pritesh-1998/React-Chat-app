
import Chatlist from "./Chatlist/Chatlist";
import Userinfo from "./Userinfo/Userinfo";
import "./list.css";
const List = () => {
  return (
    <div className='list'>
        <Userinfo></Userinfo>
        <Chatlist></Chatlist>
    </div>
  )
}

export default List