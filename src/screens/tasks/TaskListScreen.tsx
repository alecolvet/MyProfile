import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { TaskStatus } from '../../types/task';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/Header';
import { TaskCard } from '../../components/TaskCard';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;
type FilterOption = 'todas' | TaskStatus;

export const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, isLoadingTasks } = useTasks();
  const { colors } = useTheme();
  const [filter, setFilter] = useState<FilterOption>('todas');

  const filteredTasks = tasks.filter((task) =>
    filter === 'todas' ? true : task.status === filter
  );

  const filters: { key: FilterOption; label: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'pendente', label: 'Pendentes' },
    { key: 'em_andamento', label: 'Em Andamento' },
    { key: 'concluida', label: 'Concluídas' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.topRow}>
        <Text style={[styles.screenTitle, { color: colors.text }]}>Minhas Tarefas</Text>
        <Pressable
          onPress={() => navigation.navigate('TaskForm', {})}
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Criar nova tarefa"
        >
          <Text style={styles.addBtnText}>+ Nova</Text>
        </Pressable>
      </View>

      {/* Barra de Filtros */}
      <View style={styles.filterBar}>
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: active ? colors.primary : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Filtrar por ${f.label}`}
            >
              <Text style={{ color: active ? '#FFFFFF' : colors.textSecondary, fontSize: 12, fontWeight: '600' }}>
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isLoadingTasks ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhuma tarefa encontrada</Text>
              <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
                Não há tarefas para o filtro selecionado. Que tal criar uma nova?
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 14 },
  screenTitle: { fontSize: 20, fontWeight: '800' },
  addBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  addBtnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  filterBar: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12, flexWrap: 'wrap' },
  filterChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  emptyBox: { alignItems: 'center', marginTop: 60, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 17, fontWeight: '700', marginBottom: 6 },
  emptyDesc: { fontSize: 14, textAlign: 'center' },
});