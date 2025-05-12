import {CreateProjectData, ProjectState} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createProject, fetchProjectsAction, getAllProject, updateProject} from '../api-actions.ts';

const initialState: ProjectState = {
  projects: null,
  projectsAll: [],
  projectDetails: null,
  currentProject: null,
  status: CreationStatus.Idle,
  error: null,
  loading: false,
};

const projectSlice = createSlice({
  name: NameSpace.Project,
  initialState,
  reducers: {
    resetProjectStatus: (state) => {
      state.status = CreationStatus.Idle;
      state.error = null;
    },
    setCurrentProject: (state, action: PayloadAction<CreateProjectData | null>) => {
      state.currentProject = action.payload;
    },
    clearProjectsData: (state) => {
      state.projectsAll = [];
      state.projectDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Создание проекта
      .addCase(createProject.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        state.currentProject = action.payload;
        state.loading = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to create project';
        state.loading = false;
      })

      // Получение всех проектов
      .addCase(getAllProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        state.projectsAll = [action.payload]; // Просто сохраняем полученные данные
        state.loading = false;
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch projects';
        state.loading = false;
      })

      // Получение проекта по ID
      .addCase(fetchProjectsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsAction.fulfilled, (state, action) => {
        state.projectDetails = action.payload[0]; // Берем первый элемент массива
        state.loading = false;
      })
      .addCase(fetchProjectsAction.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch project details';
        state.loading = false;
      })

      // Обновление проекта
      .addCase(updateProject.pending, (state) => {
        state.status = CreationStatus.Creating;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.status = CreationStatus.Created;
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to update project';
        state.loading = false;
      });
  }
});

export const { resetProjectStatus, setCurrentProject, clearProjectsData } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
export default projectSlice.reducer;
