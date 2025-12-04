package com.mary.peqsystem_web;

import org.springframework.data.jpa.repository.JpaRepository;



public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    
    Cliente findByCpf(String cpf);



}