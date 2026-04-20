import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atualizarTarefa, getTarefa, removerTarefa } from "@/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TarefaDetalhesPage() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: tarefa, isLoading } = useQuery({
    queryKey: ["tarefa", id],
    queryFn: () => getTarefa(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: atualizarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      queryClient.invalidateQueries({ queryKey: ["tarefa", id] });
      Alert.alert("Sucesso", "Tarefa atualizada com sucesso!");
      router.back();
    },
    onError: (error) => {
      console.log("Erro ao atualizar:", error?.response?.data || error?.message || error);
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: removerTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      Alert.alert("Sucesso", "Tarefa removida com sucesso!");
      router.back();
    },
    onError: (error) => {
      console.log("Erro ao excluir:", error?.response?.data || error?.message || error);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    },
  });

  const [descricao, setDescricao] = useState("");
  const [concluida, setConcluida] = useState(false);

  useEffect(() => {
    if (tarefa) {
      setDescricao(tarefa.descricao);
      setConcluida(tarefa.concluida || false);
    }
  }, [tarefa]);

  function handleUpdate() {
    if (!id) {
      Alert.alert("Erro", "ID da tarefa não encontrado.");
      return;
    }

    if (descricao.trim() === "") {
      Alert.alert("Erro", "A descrição não pode estar vazia.");
      return;
    }

    updateMutation.mutate({ id, descricao, concluida });
  }

  function handleDelete() {
    if (!id) {
      Alert.alert("Erro", "ID da tarefa não encontrado.");
      return;
    }

    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => deleteMutation.mutate(id),
        },
      ]
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Tarefa #${id}` }} />
      <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Concluída:</Text>
          <Switch value={concluida} onValueChange={setConcluida} />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Salvar Alterações"
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          />
          <View style={{ height: 10 }} />
          <Button
            title="Excluir Tarefa"
            onPress={handleDelete}
            color="red"
            disabled={deleteMutation.isPending}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});