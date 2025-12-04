package com.mary.peqsystem_web;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    

    Produto findByCodigoDeBarras(String codigoDeBarras);

List<Produto> findByDescricaoContainingIgnoreCase(String descricao);
}