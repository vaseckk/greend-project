import {CommentState} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createComments,deleteComments, getAllComments,updateComment} from '../api-actions.ts';

const initialState: CommentState = {
  createComment: null,
  updateComment: null,
  getAllComments: [],
  status: CreationStatus.Idle,
  error: null,
  loading: false,
};

const commentSlice = createSlice({
  name: NameSpace.Comment,
  initialState,
  reducers: {
    resetCommentStatus: (state) => {
      state.status = CreationStatus.Idle;
      state.error = null;
    },
    clearCommentsData: (state) => {
      state.getAllComments = [];
      state.createComment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComments.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(createComments.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.createComment = action.payload;
        state.loading = false;
      })
      .addCase(createComments.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to create comment';
        state.loading = false;
      })
      .addCase(updateComment.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.updateComment = action.payload;
        state.loading = false;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to update comment';
        state.loading = false;
      })
      .addCase(deleteComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.getAllComments = state.getAllComments.filter((comment) => comment.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteComments.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete comment';
        state.loading = false;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.getAllComments = action.payload;
        state.loading = false;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch comments';
        state.loading = false;
      });
  },
});

export const { resetCommentStatus, clearCommentsData } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
export default commentSlice.reducer;
