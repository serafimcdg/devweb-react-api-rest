package dw.editora.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "aluno")
public class Aluno {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

	@Column
    private String nome;

	@Column
    private String email;

	@Column
    private boolean ativo;
    
    public Aluno() {

	}

	public Aluno(String nome, String email, boolean ativo) {
		this.nome = nome;
		this.email = email;
		this.ativo = ativo;
	}

	public long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean isativo) {
		this.ativo = isativo;
	}

	@Override
	public String toString() {
		return "Aluno [id=" + id + ", nome=" + nome + ", email=" + email + ", ativo=" + ativo + "]";
	}
}

