import http from "../http-common";

class AlunoDataService {
  getAll() {
    return http.get("/alunos");
  }

  get(id) {
    return http.get(`/alunos/${id}`);
  }

  create(data) {
    return http.post("/alunos", data);
  }

  update(id, data) {
    return http.put(`/alunos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/alunos/${id}`);
  }

  deleteAll() {
    return http.delete(`/alunos`);
  }

  findByNome(data) {
    return http.get(`/alunos?nome=${data}`);
  }
}

export default new AlunoDataService();