import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../types/navigation';
import { Header } from '../../components/Header';
import { useTheme } from '../../hooks/useTheme';
import { useTasks } from '../../hooks/useTasks';
import { fetchDailyQuote, QuoteResponse } from '../../services/api';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const { tasks } = useTasks();

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loadingQuote, setLoadingQuote] = useState<boolean>(true);
  const [quoteError, setQuoteError] = useState<string>('');

  const loadQuote = useCallback(async () => {
    try {
      setLoadingQuote(true);
      setQuoteError('');
      const data = await fetchDailyQuote();
      setQuote(data);
    } catch (err) {
      setQuoteError(err instanceof Error ? err.message : 'Erro ao buscar frase.');
    } finally {
      setLoadingQuote(false);
    }
  }, []);

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  const pendingCount = tasks.filter((t) => t.status === 'pendente').length;
  const inProgressCount = tasks.filter((t) => t.status === 'em_andamento').length;
  const completedCount = tasks.filter((t) => t.status === 'concluida').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Card de API Pública */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Inspiração do Dia (API)</Text>
          {loadingQuote ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 16 }} />
          ) : quoteError ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: colors.error }]}>{quoteError}</Text>
              <Pressable
                onPress={loadQuote}
                style={[styles.retryBtn, { backgroundColor: colors.primary }]}
                accessibilityRole="button"
                accessibilityLabel="Tentar carregar a frase novamente"
              >
                <Text style={styles.retryText}>Tentar novamente</Text>
              </Pressable>
            </View>
          ) : quote ? (
            <>
              <Text style={[styles.quoteText, { color: colors.text }]}>"{quote.quote}"</Text>
              <Text style={[styles.authorText, { color: colors.textSecondary }]}>— {quote.author}</Text>
              <Pressable
                onPress={loadQuote}
                style={styles.refreshLink}
                accessibilityRole="button"
                accessibilityLabel="Carregar outra frase motivacional"
              >
                <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>
                  Nova frase ↻
                </Text>
              </Pressable>
            </>
          ) : null}
        </View>

        {/* Resumo de Tarefas */}
        <Text style={[styles.heading, { color: colors.text }]}>Resumo das Suas Tarefas</Text>
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.warning }]}>{pendingCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pendentes</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{inProgressCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Em Andamento</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statNumber, { color: colors.success }]}>{completedCount}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Concluídas</Text>
          </View>
        </View>

        {/* Ações Rápidas */}
        <Pressable
          onPress={() => navigation.navigate('Tasks', { screen: 'TaskList' })}
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Ir para a lista de tarefas"
        >
          <Text style={styles.actionBtnText}>Ver Minhas Tarefas</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Tasks', { screen: 'TaskForm', params: {} })}
          style={[styles.actionBtnOutline, { borderColor: colors.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Cadastrar nova tarefa"
        >
          <Text style={[styles.actionBtnOutlineText, { color: colors.primary }]}>+ Nova Tarefa</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 24 },
  sectionTitle: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 },
  quoteText: { fontSize: 16, fontStyle: 'italic', lineHeight: 22 },
  authorText: { fontSize: 13, textAlign: 'right', marginTop: 8, fontWeight: '600' },
  refreshLink: { marginTop: 10, alignSelf: 'flex-start' },
  errorContainer: { alignItems: 'center', paddingVertical: 8 },
  errorText: { fontSize: 14, marginBottom: 10, textAlign: 'center' },
  retryBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6 },
  retryText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  heading: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 24 },
  statBox: { flex: 1, padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 12, marginTop: 4, fontWeight: '600' },
  actionBtn: { padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  actionBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  actionBtnOutline: { padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1.5 },
  actionBtnOutlineText: { fontSize: 16, fontWeight: '700' },
});