package com.mary.peqsystem_web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

   
    @GetMapping("/listar-clientes")
    public String listarClientes() {
        System.out.println("-----------------------------------");
        System.out.println("👥 BUSCANDO CLIENTES NO BANCO...");

        List<Cliente> lista = repository.findAll();

        System.out.println("✅ Encontrados: " + lista.size() + " clientes.");
        for (Cliente c : lista) {
            System.out.println("   -> " + c.getNome() + " | " + c.getEmail());
        }
        System.out.println("-----------------------------------");

        return "redirect:/clientes.html";
    }

   
    @PostMapping("/cadastrar-cliente")
    public String cadastrarCliente(Cliente cliente) {
        System.out.println("-----------------------------------");
        System.out.println("💾 SALVANDO NOVO CLIENTE...");
        System.out.println("Nome: " + cliente.getNome());
        System.out.println("Email: " + cliente.getEmail());
        
        repository.save(cliente);
        
        System.out.println("✅ Cliente salvo com sucesso!");
        System.out.println("-----------------------------------");

        return "redirect:/listar-clientes";
    }



    @GetMapping("/api/clientes")
    @ResponseBody
    public List<Cliente> apiListarClientes() {
        return repository.findAll();
    }
}