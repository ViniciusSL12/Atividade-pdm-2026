import axios from "axios";

const urlBase = "https://aos-2026-1-mu.vercel.app/api/tarefas";

const headersJson = {
  "Content-Type": "application/json",
};

export async function getTarefas() {
  const response = await axios.get(urlBase);
  return response.data;
}

export async function getTarefa(id) {
  const response = await axios.get(`${urlBase}/${id}`);
  return response.data;
}

export async function adicionarTarefa(descricao) {
  const response = await axios.post(
    urlBase,
    {
      title: descricao,
      completed: false,
    },
    {
      headers: headersJson,
    }
  );
  return response.data;
}

export async function atualizarTarefa(tarefaAtualizada) {
  const response = await axios.put(
    `${urlBase}/${tarefaAtualizada.id}`,
    tarefaAtualizada,
    {
      headers: headersJson,
    }
  );
  return response.data;
}

export async function removerTarefa(id) {
  const response = await axios.delete(`${urlBase}/${id}`);
  return response.data;
}