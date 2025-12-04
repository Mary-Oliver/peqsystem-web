package com.mary.peqsystem_web;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDate;

@Entity
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idVenda")
    private Integer idVenda;

    @Column(name = "Data")
    private LocalDate data;

    @Column(name = "Quantidade")
    private Integer quantidade;

    @Column(name = "Preco")
    private Double preco;

    @Column(name = "Metodo_Pagamento")
    private String metodoPagamento;

    
    @ManyToOne
    @JoinColumn(name = "Cliente_idCliente") 
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "Produto_idProduto") 
    private Produto produto;

  
    public Venda() { }

    

    public Integer getIdVenda() { return idVenda; }
    public void setIdVenda(Integer idVenda) { this.idVenda = idVenda; }

    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }

    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }

    public Double getPreco() { return preco; }
    public void setPreco(Double preco) { this.preco = preco; }

    public String getMetodoPagamento() { return metodoPagamento; }
    public void setMetodoPagamento(String metodoPagamento) { this.metodoPagamento = metodoPagamento; }
    
    @Column(name = "cpf_na_nota")
    private String cpfNaNota;

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Produto getProduto() { return produto; }
    public void setProduto(Produto produto) { this.produto = produto; }
    
    public String getCpfNaNota() { return cpfNaNota; }
    public void setCpfNaNota(String cpfNaNota) { this.cpfNaNota = cpfNaNota; }
}