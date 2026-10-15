import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../types/navigation';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { TaskFormScreen } from '../screens/tasks/TaskFormScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';
import { useTheme } from '../hooks/useTheme';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export const TaskStackRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={({ route }) => ({
          title: route.params?.taskId ? 'Editar Tarefa' : 'Nova Tarefa',
        })}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{ title: 'Detalhes da Tarefa' }}
      />
    </Stack.Navigator>
  );
};