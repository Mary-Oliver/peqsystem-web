package com.mary.peqsystem_web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;

@Controller
public class FornecedorController {

    @Autowired
    private FornecedorRepository repository;

   
    @GetMapping("/listar-fornecedores")
    public String listarFornecedores() {
        System.out.println("-----------------------------------");
        System.out.println("🚚 BUSCANDO FORNECEDORES NO BANCO...");

        List<Fornecedor> lista = repository.findAll();

        System.out.println("✅ Encontrados: " + lista.size() + " fornecedores.");
        for (Fornecedor f : lista) {
            System.out.println("   -> " + f.getNome() + " | " + f.getContato());
        }
        System.out.println("-----------------------------------");

        return "redirect:/fornecedores.html";
    }

   
    @PostMapping("/cadastrar-fornecedor")
    public String cadastrarFornecedor(Fornecedor fornecedor) {
        System.out.println("-----------------------------------");
        System.out.println("💾 SALVANDO NOVO FORNECEDOR...");
        System.out.println("Nome: " + fornecedor.getNome());
        System.out.println("Contato: " + fornecedor.getContato());
        
        repository.save(fornecedor);
        
        System.out.println("✅ Fornecedor salvo com sucesso!");
        System.out.println("-----------------------------------");

        return "redirect:/listar-fornecedores";
    }
}