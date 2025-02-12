import { GrSubscript } from 'react-icons/gr';
import Task from '../Task/Task';
import ActionButton from '../ActionButton/ActionButton';
import { IList, ITask } from '../../types';
import { useTypedDispatch } from '../../hooks/redux';
import { deleteList, setModalActive } from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 } from 'uuid';
import { setModalData } from '../../store/slices/modalSlice';
import { deleteButton, header, listWrapper, name } from './List.css';
import { FC } from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";

type TListProps = {
  boardId: string;
  list: IList;
};

const List: FC<TListProps> = ({ list, boardId }) => {
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "user",
        logTimestamp: String(Date.now())
      })
    );
  };

  const handleTaskChange = (
    boardId: string,
    listId: string,
    task: ITask
  ) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  return (
    <Droppable droppableId={list.listId}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={listWrapper}>
          {/* 리스트 헤더 */}
          <div className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubscript
              className={deleteButton}
              onClick={(e) => {
                e.stopPropagation(); // ✅ 드래그 이벤트 방지
                handleListDelete(list.listId);
              }}
            />
          </div>

          {/* 리스트 내부의 Task들 */}
          {list.tasks?.map((task, index) => (
            <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onClick={() => handleTaskChange(boardId, list.listId, task)}
                >
                  <Task 
                    taskName={task.taskName}
                    taskDescription={task.taskDescription}
                    boardId={boardId}
                    id={task.taskId}
                    index={index}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {/* 드래그 앤 드롭이 정상 동작하도록 placeholder 추가 */}
          {provided.placeholder}

          {/* 리스트에 새로운 Task 추가 버튼 */}
          <ActionButton boardId={boardId} listId={list.listId} />
        </div>
      )}
    </Droppable>
  );
};

export default List;
