import { useState } from "react"
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from "./App.css"
import BoardList from "./components/BoardList/BoardList"
import ListsContainer from "./components/ListContainer/ListsContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard, sort } from "./store/slices/boardsSlice";
import { v4 } from "uuid";
import { addLog } from "./store/slices/loggerSlice";
import { DragDropContext } from '@hello-pangea/dnd';


function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector(state => state.boards.modalActive);
  const boards = useTypedSelector(state => state.boards.boardArray);

  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if(boards.length > 1){
      dispatch(
        deleteBoard({boardId: getActiveBoard.boardId})
      )
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 삭제 : ${getActiveBoard.boardName}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now())
        })
      )

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          board => board.boardId === activeBoardId
        )

        return indexToBeDeleted === 0 ? indexToBeDeleted + 1 : indexToBeDeleted - 1
      }

      setActiveBoardId(boards[newIndexToSet()].boardId)
      
    }else{
      alert('최소 게시판 개수는 한 개입니다.');
    }
  }

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    
    const sourceList = lists.find(list => list.listId === source.droppableId);
    const targetList = lists.find(list => list.listId === destination.droppableId);

    // 목적지가 없으면 (예: 드래그 도중 취소) 함수 종료
    if (!destination) return;
    if (!sourceList) return;

    dispatch(
      sort({
        boardIndex: boards.findIndex(board => board.boardId === activeBoardId),
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId
      })
    )

    if (targetList) {
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `
          리스트 "${sourceList.listName}"에서 
          리스트 "${targetList.listName}"으로 
          "${sourceList.tasks.find(task => task.taskId === draggableId)?.taskName || "알 수 없음"}"을 옮김`,
          logAuthor: "User",
          logTimestamp: String(Date.now()),
        })
      );
    }
  }

  return (

    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList 
        activeBoardId={activeBoardId} 
        setActiveBoardId={setActiveBoardId} 
      />

      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>
      
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>게시판 삭제</button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  )
}

export default App
