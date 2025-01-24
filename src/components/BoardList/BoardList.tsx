import React, {FC, useEffect, useRef, useState} from 'react'
import { useTypedSelector } from '../../hooks/redux';
import SideForm from './SideForm/SideForm';
import { FiPlusCircle } from 'react-icons/fi';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>
}

const BoardList : FC<TBoardListProps> = ({activeBoardId, setActiveBoardId}) => {
  const {boardArray} = useTypedSelector((state) => state.boards || {});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(isFormOpen){
      inputRef.current?.focus();
    }
  }, [isFormOpen]);

  const handleClick = () => setIsFormOpen((prev) => !prev)

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      
      {boardArray.length > 0 ? (
        boardArray.map((board) => {
          const isActive = board.boardId === activeBoardId;

          return (
            <div
              key={board.boardId}
              onClick={() => setActiveBoardId(board.boardId)}
              className={clsx(isActive ? boardItemActive : boardItem)}
            >
              <div>{board.boardName}</div>
            </div>
          );
        })
      ) : (
        <div>게시판이 없습니다.</div>
      )}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm inputRef={inputRef} setFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
      </div>
    </div>
  );
}

export default BoardList