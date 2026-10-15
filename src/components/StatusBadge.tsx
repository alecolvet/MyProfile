import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskPriority, TaskStatus } from '../types/task';

interface Props {
  status?: TaskStatus;
  priority?: TaskPriority;
}

export const StatusBadge: React.FC<Props> = ({ status, priority }) => {
  if (status) {
    const config: Record<TaskStatus, { label: string; bg: string; color: string }> = {
      pendente: { label: 'Pendente', bg: '#FEF3C7', color: '#D97706' },
      em_andamento: { label: 'Em Andamento', bg: '#DBEAFE', color: '#2563EB' },
      concluida: { label: 'Concluída', bg: '#D1FAE5', color: '#059669' },
    };
    const current = config[status];
    return (
      <View style={[styles.badge, { backgroundColor: current.bg }]}>
        <Text style={[styles.text, { color: current.color }]}>{current.label}</Text>
      </View>
    );
  }

  if (priority) {
    const config: Record<TaskPriority, { label: string; bg: string; color: string }> = {
      baixa: { label: 'Prioridade Baixa', bg: '#E0F2FE', color: '#0284C7' },
      media: { label: 'Prioridade Média', bg: '#FFEDD5', color: '#EA580C' },
      alta: { label: 'Prioridade Alta', bg: '#FEE2E2', color: '#DC2626' },
    };
    const current = config[priority];
    return (
      <View style={[styles.badge, { backgroundColor: current.bg }]}>
        <Text style={[styles.text, { color: current.color }]}>{current.label}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});