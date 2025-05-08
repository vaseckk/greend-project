import {CreateProjectData, ProjectState} from '../../types/types.ts';
import {CreationStatus, NameSpace} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {createProject, fetchProjectsAction, getAllProject, updateProject} from '../api-actions.ts';

const initialState: ProjectState = {
  projects: [],
  projectsAll: null,
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
    setCurrentProject: (state, action: {payload: CreateProjectData | null}) => {
      state.currentProject = action.payload;
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
        state.projects.push(action.payload);
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
        state.projectsAll = action.payload;
        state.loading = false;
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch projects';
        state.loading = false;
      })

      // Получение проектов по ID
      .addCase(fetchProjectsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectsAction.fulfilled, (state, action) => {
        state.projectDetails = action.payload[0]; // Предполагаем, что возвращается массив
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
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = CreationStatus.Created;
        if (state.currentProject) {
          state.currentProject = {
            ...state.currentProject,
            ...action.payload
          };
        }
        state.loading = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = CreationStatus.Failed;
        state.error = action.error.message || 'Failed to update project';
        state.loading = false;
      });
  }
});


export const projectReducer = projectSlice.reducer;
export default projectSlice.reducer;
