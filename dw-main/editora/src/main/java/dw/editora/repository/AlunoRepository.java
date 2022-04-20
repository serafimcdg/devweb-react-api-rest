package dw.editora.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import dw.editora.model.Aluno;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Long>{

    List<Aluno> findByAtivo(boolean ativo);

    List<Aluno> findByNomeContaining(String nome);
    
}
