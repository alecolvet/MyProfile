import React from 'react';
import { View, Text, Switch, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { TreatmentPreference } from '../../types/user';

export const SettingsScreen: React.FC = () => {
  const { user, treatment, updateTreatment } = useAuth();
  const { isDark, toggleTheme, colors } = useTheme();

  const treatments: TreatmentPreference[] = ['', 'Sr.', 'Sra.', 'Srta.'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Dados do Perfil</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Nome: <Text style={{ color: colors.text, fontWeight: '700' }}>{user?.name}</Text>
          </Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Usuário: <Text style={{ color: colors.text, fontWeight: '700' }}>{user?.username}</Text>
          </Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Permissão: <Text style={{ color: colors.primary, fontWeight: '700' }}>{user?.role}</Text>
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Preferência de Tratamento</Text>
          <View style={styles.row}>
            {treatments.map((item) => {
              const active = treatment === item;
              const label = item === '' ? 'Nenhum' : item;
              return (
                <Pressable
                  key={label}
                  onPress={() => updateTreatment(item)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active ? colors.primary : colors.background,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Definir tratamento como ${label}`}
                >
                  <Text style={{ color: active ? '#FFF' : colors.text, fontWeight: '600' }}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.themeRow}>
            <View>
              <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 2 }]}>Modo Escuro</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                Alternar entre tema claro e escuro
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              accessibilityLabel="Alternar tema escuro"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 16 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  infoText: { fontSize: 14, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  themeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});