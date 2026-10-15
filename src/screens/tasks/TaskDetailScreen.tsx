import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { StatusBadge } from '../../components/StatusBadge';
import { formatDate } from '../../utils/formatDate';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export const TaskDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { getTaskById, deleteTask, toggleTaskStatus } = useTasks();
  const { colors } = useTheme();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Tarefa não encontrada.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    const executeDelete = async () => {
      try {
        await deleteTask(task.id);
        if (Platform.OS === 'web') {
          window.alert('A tarefa foi removida com sucesso.');
        } else {
          Alert.alert('Excluída', 'A tarefa foi removida com sucesso.');
        }
        navigation.goBack();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao excluir.';
        if (Platform.OS === 'web') {
          window.alert(message);
        } else {
          Alert.alert('Erro', message);
        }
      }
    };

    // No navegador Web (Chrome/Edge/Firefox)
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`);
      if (confirmed) {
        executeDelete();
      }
      return;
    }

    // No celular / emulador (Android e iOS)
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a tarefa "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: executeDelete,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.catRow}>
            <Image source={{ uri: task.categoryIcon }} style={styles.icon} />
            <Text style={[styles.category, { color: colors.textSecondary }]}>{task.category}</Text>
          </View>

          <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>

          <View style={styles.badges}>
            <StatusBadge status={task.status} />
            <StatusBadge priority={task.priority} />
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Descrição</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{task.description}</Text>

          <View style={[styles.metaBox, { borderTopColor: colors.border }]}>
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              Criada em: {formatDate(task.createdAt)}
            </Text>
            <Text style={[styles.metaText, { color: colors.textSecondary }]}>
              Última atualização: {formatDate(task.updatedAt)}
            </Text>
          </View>
        </View>

        {/* Alteração rápida de status */}
        <Text style={[styles.actionHeader, { color: colors.text }]}>Alterar Status Rápido</Text>
        <View style={styles.statusButtons}>
          <Pressable
            onPress={() => toggleTaskStatus(task.id, 'pendente')}
            style={[styles.statusBtn, { borderColor: colors.warning }]}
          >
            <Text style={{ color: colors.warning, fontWeight: '700', fontSize: 12 }}>Pendente</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleTaskStatus(task.id, 'em_andamento')}
            style={[styles.statusBtn, { borderColor: colors.primary }]}
          >
            <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 12 }}>Em Andamento</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleTaskStatus(task.id, 'concluida')}
            style={[styles.statusBtn, { borderColor: colors.success }]}
          >
            <Text style={{ color: colors.success, fontWeight: '700', fontSize: 12 }}>Concluída</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
          style={[styles.editBtn, { backgroundColor: colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Editar tarefa"
        >
          <Text style={styles.btnText}>Editar Tarefa</Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={[styles.deleteBtn, { backgroundColor: colors.error }]}
          accessibilityRole="button"
          accessibilityLabel="Excluir tarefa"
        >
          <Text style={styles.btnText}>Excluir Tarefa</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16 },
  card: { padding: 18, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  icon: { width: 26, height: 26 },
  category: { fontSize: 14, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  badges: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
  metaBox: { borderTopWidth: 1, paddingTop: 12, gap: 4 },
  metaText: { fontSize: 12 },
  actionHeader: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  statusButtons: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  statusBtn: { flex: 1, paddingVertical: 10, borderWidth: 1.5, borderRadius: 8, alignItems: 'center' },
  editBtn: { padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  deleteBtn: { padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});