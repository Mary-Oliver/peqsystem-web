package com.mary.peqsystem_web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDate;
import java.util.List;

@Controller
public class VendaController {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository; 

    @Autowired
    private ProdutoRepository produtoRepository; 

  @GetMapping("/listar-vendas")
    public String listarVendas() {
        System.out.println("-----------------------------------");
        System.out.println("💰 BUSCANDO VENDAS NO BANCO...");

        List<Venda> lista = vendaRepository.findAll();

        System.out.println("✅ Encontradas: " + lista.size() + " vendas.");
        for (Venda v : lista) {
            System.out.println("   -> Venda ID: " + v.getIdVenda());
            
       
            if (v.getCliente() != null) {
                System.out.println("      Cliente: " + v.getCliente().getNome());
            } else {
                System.out.println("      Cliente: [Não Cadastrado] CPF na nota: " + v.getCpfNaNota());
            }

            System.out.println("      Produto: " + v.getProduto().getDescricao());
            System.out.println("      Total: R$ " + (v.getPreco() * v.getQuantidade()));
            System.out.println("---");
        }
        System.out.println("-----------------------------------");

        return "redirect:/vendas.html";
    }
 
   @PostMapping("/cadastrar-venda")
    public String cadastrarVenda(
            @RequestParam(required = false) String cpfCliente, 
            @RequestParam Integer idProduto,
            @RequestParam Integer quantidade,
            @RequestParam Double preco,
            @RequestParam String metodoPagamento) {
        
        System.out.println("-----------------------------------");
        System.out.println("🛒 PROCESSANDO VENDA (CPF)...");

        Venda novaVenda = new Venda();
        novaVenda.setData(LocalDate.now());
        novaVenda.setQuantidade(quantidade);
        novaVenda.setPreco(preco);
        novaVenda.setMetodoPagamento(metodoPagamento);
        
       
        novaVenda.setCpfNaNota(cpfCliente);

      
        if (cpfCliente != null && !cpfCliente.isEmpty()) {
            Cliente clienteEncontrado = clienteRepository.findByCpf(cpfCliente);
            if (clienteEncontrado != null) {
                novaVenda.setCliente(clienteEncontrado);
                System.out.println("✅ Cliente identificado: " + clienteEncontrado.getNome());
            } else {
                System.out.println("⚠️ Cliente não cadastrado. Seguindo apenas com CPF na nota.");
            }
        }

        novaVenda.setProduto(produtoRepository.findById(idProduto).get());

        vendaRepository.save(novaVenda);
        
        System.out.println("✅ Venda registrada com sucesso!");
        System.out.println("-----------------------------------");

        return "redirect:/listar-vendas";
    }
}