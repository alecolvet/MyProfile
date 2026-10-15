import { NavigatorScreenParams } from '@react-navigation/native';

export type TaskStackParamList = {
  TaskList: { filter?: 'todas' | 'pendente' | 'em_andamento' | 'concluida' } | undefined;
  TaskForm: { taskId?: string };
  TaskDetail: { taskId: string };
};

export type TabParamList = {
  Home: undefined;
  Tasks: NavigatorScreenParams<TaskStackParamList>;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
};