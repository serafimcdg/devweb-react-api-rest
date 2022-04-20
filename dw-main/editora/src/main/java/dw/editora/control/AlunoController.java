package dw.editora.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.CrossOrigin;

import dw.editora.model.Aluno;
import dw.editora.repository.AlunoRepository;

//CORS
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class AlunoController {

    @Autowired
    AlunoRepository rep;
    

    /*
    * GET /api/alunos : listar todos os alunos
    */
    @GetMapping("/alunos")
    public  ResponseEntity<List<Aluno>> getAllAlunos(@RequestParam(required = false) String nome)
    {
        try
        {
            List<Aluno> la = new ArrayList<Aluno>();

            if (nome == null)
                rep.findAll().forEach(la::add);
            else
                rep.findByNomeContaining(nome).forEach(la::add);

            if (la.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            
            return new ResponseEntity<>(la, HttpStatus.OK);


        }
         catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

     /*
    * POST /api/alunos : criar aluno
    */
    @PostMapping("/alunos")
    public ResponseEntity<Aluno> createAluno(@RequestBody Aluno ar)
    {   
        try {
            Aluno _a = rep.save(new Aluno(ar.getNome(), ar.getEmail(), ar.isAtivo()));

            return new ResponseEntity<>(_a, HttpStatus.CREATED);
            
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

     /*
    * GET /api/alunos/:id : listar aluno dado um id
    */
    @GetMapping("/alunos/{id}")
    public ResponseEntity<Aluno> getAlunoById(@PathVariable("id") long id)
    {
        Optional<Aluno> data = rep.findById(id);

        if (data.isPresent())
            return new ResponseEntity<>(data.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

     /*
    * PUT /api/alunos/:id : atualizar aluno dado um id
    */
    @PutMapping("/alunos/{id}")
    public ResponseEntity<Aluno> updateAluno(@PathVariable("id") long id, @RequestBody Aluno a)
    {
        Optional<Aluno> data = rep.findById(id);

        if (data.isPresent())
        {
            Aluno ar = data.get();
            ar.setAtivo(a.isAtivo());
            ar.setEmail(a.getEmail());
            ar.setNome(a.getNome());

            return new ResponseEntity<>(rep.save(ar), HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

     /*
    * DEL /api/alunos/:id : remover aluno dado um id
    */
    @DeleteMapping("/alunos/{id}")
    public ResponseEntity<HttpStatus> deleteAluno(@PathVariable("id") long id)
    {
        try {
            rep.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

     /*
    * DEL /api/alunos : remover todos os alunos
    */
    @DeleteMapping("/alunos")
    public ResponseEntity<HttpStatus> deleteAllAluno()
    {
        try {
            rep.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }


}
