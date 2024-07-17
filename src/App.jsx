import Chat from "./components/chat/chat"
import Details from "./components/detail/Details"
import List from "./components/list/List"

const App = () => {
  return (
    <div className='container'>
        <List></List>
        <Chat></Chat>
        <Details></Details>
    </div>
  )
}

export default App
