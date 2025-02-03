import { useState } from "react"
import { appContainer, board, buttons } from "./App.css"
import BoardList from "./components/BoardList/BoardList"
import ListsContainer from "./components/ListContainer/ListsContainer";
import { useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector(state => state.boards.modalActive);
  const boards = useTypedSelector(state => state.boards.boardArray);

  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;

  return (

    <div className={appContainer}>
      {modalActive ? <EditModal /> : null}
      <BoardList 
        activeBoardId={activeBoardId} 
        setActiveBoardId={setActiveBoardId} 
      />

      <div className={board}>
        <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
      </div>
      
      <div className={buttons}>
        <button>게시판 삭제</button>
        <button></button>
      </div>
    </div>
  )
}

export default App
