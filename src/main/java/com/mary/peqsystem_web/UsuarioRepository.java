package com.mary.peqsystem_web;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    
    Usuario findByNome(String nome);

}