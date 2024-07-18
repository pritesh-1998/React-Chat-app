import Chat from "./components/chat/chat"
import Details from "./components/detail/Details"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"



const App = () => {
    const user = false;
    return (
        <div className='container'>
            {user ? (
                <>
                    <List></List>
                    <Chat></Chat>
                    <Details></Details>
                </>
            ) : (
                <Login></Login>
            )}
            <Notification />
        </div>
    )
}

export default App
