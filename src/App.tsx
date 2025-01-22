import { appContainer, board, buttons } from "./App.css"

function App() {

  return (
    <div className={appContainer}>
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
