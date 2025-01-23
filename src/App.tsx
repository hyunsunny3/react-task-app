import { useState } from "react"
import { appContainer, board, buttons } from "./App.css"
import BoardList from "./components/BoardList/BoardList"

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');

  return (

    <div className={appContainer}>
      <BoardList 
        activeBoardId={activeBoardId} 
        setActiveBoardId={setActiveBoardId} 
      />

      <div className={board}>
      </div>
      
      <div className={buttons}>
        <button>게시판 삭제</button>
        <button></button>
      </div>
    </div>
  )
}

export default App
