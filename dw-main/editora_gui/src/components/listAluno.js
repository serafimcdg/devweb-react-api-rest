import React, { Component } from "react";
import AlunoDataService from "../services/alunoDataService";
import { Link } from "react-router-dom";


export default class ListAluno extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveAlunos = this.retrieveAlunos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setAlunoSel = this.setAlunoSel.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.searchNome = this.searchNome.bind(this);

    this.state = {
      alunos: [],
      alunoSel: null,
      indice: -1,
      nome: ""
    };
  }

  componentDidMount() {
    this.retrieveAlunos();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      nome: searchNome
    });
  }

  retrieveAlunos() {
    AlunoDataService.getAll()
      .then(response => {
        this.setState({
          alunos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAlunos();
    this.setState({
      alunoSel: null,
      indice: -1
    });
  }

  setAlunoSel(aluno, index) {
    this.setState({
      alunoSel: aluno,
      indice: index
    });
  }

  removeAll() {
    AlunoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    this.setState({
      alunoSel: null,
      indice: -1
    });

    AlunoDataService.findByNome(this.state.nome)
      .then(response => {
        this.setState({
          alunos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { nome, alunos, alunoSel, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          {/* <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por título"
              value={nome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Buscar
              </button>
            </div>
          </div> */}
        </div>
        <div className="col-md-6">
          <h4>Alunos</h4>

          <ul className="list-group">
            {alunos &&
              alunos.map((aluno, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "")
                  }
                  onClick={() => this.setAlunoSel(aluno, index)}
                  key={index}
                >
                  {aluno.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button>
        </div>
        <div className="col-md-6">
          {alunoSel ? (
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {alunoSel.nome}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {alunoSel.email}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {alunoSel.ativo ? "Ativo" : "Pendente"}
              </div>

              <Link
                to={"/list/" + alunoSel.id}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um aluno.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}