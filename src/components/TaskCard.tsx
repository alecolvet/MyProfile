import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Task } from '../types/task';
import { useTheme } from '../hooks/useTheme';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatDate';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Tarefa ${task.title}, status ${task.status}`}
      accessibilityHint="Toque para abrir os detalhes desta tarefa"
    >
      <View style={styles.headerRow}>
        <View style={styles.categoryWrap}>
          <Image source={{ uri: task.categoryIcon }} style={styles.icon} />
          <Text style={[styles.categoryText, { color: colors.textSecondary }]}>{task.category}</Text>
        </View>
        <StatusBadge status={task.status} />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>

      <View style={styles.badgeRow}>
        <StatusBadge priority={task.priority} />
      </View>

      <View style={[styles.datesContainer, { borderTopColor: colors.border }]}>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          Criada: {formatDate(task.createdAt)}
        </Text>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          Atualizada: {formatDate(task.updatedAt)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  badgeRow: {
    marginBottom: 10,
  },
  datesContainer: {
    borderTopWidth: 1,
    paddingTop: 8,
    gap: 2,
  },
  dateText: {
    fontSize: 11,
  },
});