import React, { Component } from "react";
import AlunoDataService from "../services/alunoDataService";


export default class AddAluno extends Component {

    constructor(props) {
        super(props);

        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveAluno = this.saveAluno.bind(this);
        this.newAluno = this.newAluno.bind(this);    
    
        this.state = {
            id: null,
            Nome: "",
            email: "", 
            ativo: false,      
            enviado: false
          };
    }

    onChangeNome(e) {
        this.setState({
          nome: e.target.value
        });
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }

      saveAluno() {
        var data = {
          nome: this.state.nome,
          email: this.state.email
        };
    
        AlunoDataService.create(data)
          .then(response => {
            this.setState({
              id: response.data.id,
              nome: response.data.nome,
              email: response.data.email,
              ativo: response.data.ativo,
    
              enviado: true
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

    newAluno() {
        this.setState({
          id: null,
          nome: "",
          email: "",
          ativo: false,
    
          enviado: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                { this.state.enviado ? (
                              <div>
                              <h4>Aluno adicionado</h4>
                              <button className="btn btn-success" onClick={this.newAluno}>
                                Adicionar outro aluno
                              </button>
                            </div>
                  
                ) : (
                    <div>
                    <div className="form-group">
                      <label htmlFor="nome"><strong>Nome</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        name="nome"
                      />
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="email"><strong>Email</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        name="email"
                      />
                    </div>
                   <p></p>
                    <button onClick={this.saveAluno} className="btn btn-success">
                      Adicionar
                    </button>
                  </div>
                )}
            </div>
        )
    } 
}