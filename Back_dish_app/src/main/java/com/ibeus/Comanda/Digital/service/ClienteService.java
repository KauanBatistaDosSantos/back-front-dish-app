package com.ibeus.Comanda.Digital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibeus.Comanda.Digital.model.Cliente;
import com.ibeus.Comanda.Digital.model.Dish;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.repository.ClienteRepository;
import com.ibeus.Comanda.Digital.repository.PedidoRepository;

@Service
public class ClienteService {  
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PedidoRepository pedidoRepository;


    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }


    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }


    
    public String acompanharPedido(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    
        StringBuilder detalhesPedido = new StringBuilder("Status do pedido: " + pedido.getStatus() + "\nDetalhes do pedido:\n");
    
        
        for (Dish dish : pedido.getDish()) {
            detalhesPedido.append("Nome: ").append(dish.getName())
                .append(", Preço: ").append(dish.getPrice())
                .append(", Descrição: ").append(dish.getDescription())
                .append("\n");
        }
    
        return detalhesPedido.toString();
    }
    public void finalizarUltimoPedido(Cliente clienteInfo) {
        // Busca o último pedido sem cliente associado
        Pedido pedido = pedidoRepository.findTopByClienteIsNullOrderByIdDesc()
                .orElseThrow(() -> new RuntimeException("Nenhum pedido pendente encontrado"));

        // Verifica se o cliente já existe com base no CPF
        Cliente cliente = clienteRepository.findByCpf(clienteInfo.getCpf())
                .orElseGet(() -> clienteRepository.save(clienteInfo));

        // Associa o cliente ao pedido e salva
        pedido.setCliente(cliente);
        pedidoRepository.save(pedido);
    }

    public Cliente buscarOuCriarCliente(Cliente clienteInfo) {
        // Busca o cliente pelo CPF
        return clienteRepository.findByCpf(clienteInfo.getCpf())
                .orElseGet(() -> clienteRepository.save(clienteInfo)); // Cria o cliente, se não existir
    }

    public Cliente buscarPorCpf(String cpf) {
        return clienteRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }
 }