import React, { Component } from "react";
import AlunoDataService from "../services/alunoDataService";


import { useParams } from 'react-router-dom';

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

class Aluno extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getAluno = this.getAluno.bind(this);
    this.updateAtivo = this.updateAtivo.bind(this);
    this.updateAluno = this.updateAluno.bind(this);
    this.deleteAluno = this.deleteAluno.bind(this);

    this.state = {
      alunoAtual: {
        id: null,
        nome: "",
        email: "",
        ativo: false
      },
      mensagem: ""
    };
  }
  
  componentDidMount() {

    this.getAluno(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        alunoAtual: {
          ...prevState.alunoAtual,
          nome: nome
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      alunoAtual: {
        ...prevState.alunoAtual,
       email: email
      }
    }));
  }

  getAluno(id) {
    AlunoDataService.get(id)
      .then(response => {
        this.setState({
          alunoAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        
        console.log("Erro: "+e);
      });
  }

  updateAtivo(status) {
    var data = {
      id: this.state.alunoAtual.id,
      nome: this.state.alunoAtual.nome,
      email: this.state.alunoAtual.email,
      ativo: status
    };

    AlunoDataService.update(this.state.alunoAtual.id, data)
      .then(response => {
        this.setState(prevState => ({
          alunoAtual: {
            ...prevState.alunoAtual,
            ativo: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAluno() {
    AlunoDataService.update(
      this.state.alunoAtual.id,
      this.state.alunoAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          mensagem: "Aluno atualizado"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAluno() {    
    AlunoDataService.delete(this.state.alunoAtual.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/list')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { alunoAtual } = this.state;

    return (
      <div>
        {alunoAtual ? (
          <div className="edit-form">
            <h4>Aluno</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome"><strong>Nome</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={alunoAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={alunoAtual.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <br />
                <label>
                  <strong>Status:</strong>
                </label>
                    <b>
                    {alunoAtual.ativo ? "Ativo" : " não ativo"}
                    </b>
              </div>
            </form>
            

            {alunoAtual.ativo ? (
              <button
                className="m-2 btn btn-sm btn-primary mr-2"
                onClick={() => this.updateAtivo(false)}
              >
                Alterar status
              </button>
            ) : (
              <button
                className="m-2 btn btn-sm btn-primary mr-2"
                onClick={() => this.updateAtivo(true)}
              >
                Alterar status
              </button>
            )}

            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteAluno}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateAluno}
            >
              Atualizar
            </button>
            <p>{this.state.mensagem}</p>
          </div>
        ) : (
          <div>
            <br />
            <p><i>Selecione um Aluno</i></p>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Aluno);