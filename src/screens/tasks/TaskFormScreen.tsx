import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, Image, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { TaskPriority, TaskStatus } from '../../types/task';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { validateTaskForm } from '../../utils/validation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

const CATEGORIES = [
  { name: 'Trabalho', icon: 'https://img.icons8.com/fluency/48/briefcase.png' },
  { name: 'Estudos', icon: 'https://img.icons8.com/fluency/48/graduation-cap.png' },
  { name: 'Pessoal', icon: 'https://img.icons8.com/fluency/48/user-male-circle.png' },
  { name: 'Saúde', icon: 'https://img.icons8.com/fluency/48/heart-with-pulse.png' },
];

export const TaskFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const taskId = route.params?.taskId;
  const isEditing = Boolean(taskId);

  const { getTaskById, createTask, updateTask } = useTasks();
  const { colors } = useTheme();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [category, setCategory] = useState<string>(CATEGORIES[0].name);
  const [categoryIcon, setCategoryIcon] = useState<string>(CATEGORIES[0].icon);
  const [errors, setErrors] = useState<{ title?: string; description?: string; category?: string }>({});
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (taskId) {
      const existing = getTaskById(taskId);
      if (existing) {
        setTitle(existing.title);
        setDescription(existing.description);
        setStatus(existing.status);
        setPriority(existing.priority);
        setCategory(existing.category);
        setCategoryIcon(existing.categoryIcon);
      }
    }
  }, [taskId]);

  const handleSave = async () => {
    const formData = { title, description, status, priority, category, categoryIcon };
    const validation = validateTaskForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setSaving(true);
      if (isEditing && taskId) {
        await updateTask(taskId, formData);
        Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
      } else {
        await createTask(formData);
        Alert.alert('Sucesso', 'Tarefa cadastrada com sucesso!');
      }
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erro', err instanceof Error ? err.message : 'Falha ao salvar tarefa.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.label, { color: colors.text }]}>Título da Tarefa *</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: errors.title ? colors.error : colors.border, backgroundColor: colors.surface }]}
          placeholder="Mínimo de 3 caracteres"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setErrors((prev) => ({ ...prev, title: undefined }));
          }}
        />
        {errors.title ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.title}</Text> : null}

        <Text style={[styles.label, { color: colors.text }]}>Descrição *</Text>
        <TextInput
          style={[styles.textArea, { color: colors.text, borderColor: errors.description ? colors.error : colors.border, backgroundColor: colors.surface }]}
          placeholder="Mínimo de 5 caracteres"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            setErrors((prev) => ({ ...prev, description: undefined }));
          }}
        />
        {errors.description ? <Text style={[styles.errorText, { color: colors.error }]}>{errors.description}</Text> : null}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <View style={styles.optionsRow}>
          {CATEGORIES.map((cat) => {
            const selected = category === cat.name;
            return (
              <Pressable
                key={cat.name}
                onPress={() => {
                  setCategory(cat.name);
                  setCategoryIcon(cat.icon);
                }}
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Image source={{ uri: cat.icon }} style={styles.catIcon} />
                <Text style={{ color: selected ? '#FFF' : colors.text, fontSize: 13, fontWeight: '600' }}>
                  {cat.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Prioridade</Text>
        <View style={styles.optionsRow}>
          {(['baixa', 'media', 'alta'] as TaskPriority[]).map((p) => {
            const selected = priority === p;
            return (
              <Pressable
                key={p}
                onPress={() => setPriority(p)}
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ color: selected ? '#FFF' : colors.text, fontWeight: '600', textTransform: 'capitalize' }}>
                  {p}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Status</Text>
        <View style={styles.optionsRow}>
          {(['pendente', 'em_andamento', 'concluida'] as TaskStatus[]).map((s) => {
            const selected = status === s;
            const labels: Record<TaskStatus, string> = {
              pendente: 'Pendente',
              em_andamento: 'Em Andamento',
              concluida: 'Concluída',
            };
            return (
              <Pressable
                key={s}
                onPress={() => setStatus(s)}
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={{ color: selected ? '#FFF' : colors.text, fontWeight: '600', fontSize: 12 }}>
                  {labels[s]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={handleSave}
          disabled={saving}
          style={[styles.saveBtn, { backgroundColor: colors.primary, opacity: saving ? 0.7 : 1 }]}
          accessibilityRole="button"
          accessibilityLabel="Salvar tarefa"
        >
          <Text style={styles.saveBtnText}>{isEditing ? 'Salvar Alterações' : 'Cadastrar Tarefa'}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  label: { fontSize: 14, fontWeight: '700', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 15 },
  textArea: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 15, minHeight: 90, textAlignVertical: 'top' },
  errorText: { fontSize: 12, marginTop: 4, fontWeight: '600' },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1 },
  catIcon: { width: 18, height: 18 },
  saveBtn: { padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 28 },
  saveBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});