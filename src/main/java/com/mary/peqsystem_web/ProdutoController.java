package com.mary.peqsystem_web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;

@Controller
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

   
    @GetMapping("/listar-produtos")
    public String listarProdutos() {
        System.out.println("-----------------------------------");
        System.out.println("📦 BUSCANDO PRODUTOS NO BANCO...");

        List<Produto> lista = repository.findAll();

        System.out.println("✅ Encontrados: " + lista.size() + " produtos.");
        for (Produto p : lista) {
            System.out.println("   -> " + p.getDescricao() + " | R$ " + p.getPreco());
        }
        System.out.println("-----------------------------------");

        return "redirect:/produto.html";
    }

 
    @PostMapping("/cadastrar-produto")
    public String cadastrarProduto(Produto produto) {
        System.out.println("-----------------------------------");
        System.out.println("💾 SALVANDO NOVO PRODUTO...");
        System.out.println("Nome: " + produto.getDescricao());
        System.out.println("Preço: " + produto.getPreco());
        
        repository.save(produto);
        
        System.out.println("✅ Produto salvo com sucesso!");
        System.out.println("-----------------------------------");

        return "redirect:/listar-produtos";
    }

    
    @GetMapping("/api/produtos")
    @ResponseBody
    public List<Produto> apiListarProdutos() {
        return repository.findAll();
    }

   @GetMapping("/api/produto/buscar")
    @ResponseBody
    public List<Produto> buscarPorCodigo(@RequestParam String termo) {
       
        Produto p = repository.findByCodigoDeBarras(termo);
        
        if (p != null) {
           
            return List.of(p);
        }
        
       
        return repository.findByDescricaoContainingIgnoreCase(termo);
    }
}