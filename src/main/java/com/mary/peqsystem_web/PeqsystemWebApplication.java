package com.mary.peqsystem_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PeqsystemWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(PeqsystemWebApplication.class, args);
    }

}

@org.springframework.stereotype.Controller
class LoginController {

    @org.springframework.beans.factory.annotation.Autowired
    private UsuarioRepository repository;

    @org.springframework.web.bind.annotation.PostMapping("/login")
    public String receberLogin(@org.springframework.web.bind.annotation.RequestParam String usuario,
            @org.springframework.web.bind.annotation.RequestParam String senha) {

        System.out.println("-----------------------------------");
        System.out.println("🔎 Procurando no banco: " + usuario);

        Usuario userBanco = repository.findByNome(usuario);

        if (userBanco != null && userBanco.getSenha().equals(senha)) {
            System.out.println("✅ SENHA CORRETA! Entrando...");
            System.out.println("-----------------------------------");
            return "redirect:/Principal.html";
        } else {
            System.out.println("❌ USUÁRIO OU SENHA INVÁLIDOS!");
            System.out.println("-----------------------------------");

            return "redirect:/index.html";
        }
    }
}
