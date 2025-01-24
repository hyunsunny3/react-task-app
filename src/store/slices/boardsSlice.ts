import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
}

type TAddBoardAction = {
  board: IBoard;
}

const initialState : TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "List 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescription: "Description",
              taskOwner: "hs"
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescription: "Description",
              taskOwner: "hs"
            }
          ]
        },
        {
          listId: "list-1",
          listName: "List 2",
          tasks: [
            {
              taskId: "task-3",
              taskName: "Task 3",
              taskDescription: "Description",
              taskOwner: "hs"
            }
          ]
        }
      ]
    }
  ]
}

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, {payload}: PayloadAction<TAddBoardAction>) => {
      state.boardArray.push(payload.board);
    }
  }
})

export const boardsReducer = boardsSlice.reducer;
export const {addBoard} = boardsSlice.actions;