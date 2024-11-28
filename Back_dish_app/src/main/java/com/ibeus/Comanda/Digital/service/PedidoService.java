package com.ibeus.Comanda.Digital.service;

import java.util.ArrayList;
import java.util.List;

import com.ibeus.Comanda.Digital.model.Cliente;
import com.ibeus.Comanda.Digital.model.Motoboy;
import com.ibeus.Comanda.Digital.repository.ClienteRepository;
import com.ibeus.Comanda.Digital.repository.MotoboyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibeus.Comanda.Digital.model.Dish;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.repository.DishRepository;
import com.ibeus.Comanda.Digital.repository.PedidoRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private MotoboyRepository motoboyRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ClienteRepository clienteRepository;
    // @Autowired
    // private ItemPedidoRepository itemPedidoRepository;

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public Pedido findById(Long id) {
        return pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    public Dish findByIdDish(Long id) {
        return dishRepository.findById(id).orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

//    public Pedido criarPedido(Pedido pedido){
//        return pedidoRepository.save(pedido);
//    }

    public Pedido criarPedido(Pedido pedido) {
        if (pedido.getCliente() == null || pedido.getCliente().getId() == null) {
            throw new RuntimeException("Cliente ou ID do cliente não informado no pedido");
        }

        // Busca o cliente pelo ID
        Cliente cliente = clienteRepository.findById(pedido.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com o ID informado"));

        pedido.setCliente(cliente);

        // Log para verificação
        System.out.println("Cliente encontrado: " + cliente);

        pedido.setCliente(cliente);
        return pedidoRepository.save(pedido);
    }

    public void delete(Long id) {
        Pedido pedido = findById(id);
        pedidoRepository.delete(pedido);
    }


/*Plano A*/
/*  public Pedido addItem(Long idpedido, Long idprato, int quantidade) {
        Dish dish = dishRepository.findById(idprato).orElseThrow();
        Pedido pedido = pedidoRepository.findById(idpedido).orElseThrow();
        *//*ItemPedido item = new ItemPedido(dish, quantidade)*//*;
  *//*      pedido.addItem(item);*//*
        List<Integer> ListaId = new ArrayList<>();
        Integer idPrato = dish.getId();
        Long LongIdPrato = idPrato.longValue();
        ListaId.add(dish.getId());
        pedido.setItens(ListaId);


        return pedidoRepository.save(pedido);}*/


/*Plano B*/
/*  public Pedido addItem(Long idpedido, Long idprato, int quantidade) {
        Dish dish = dishRepository.findById(idprato).orElseThrow();
        Pedido pedido = pedidoRepository.findById(idpedido).orElseThrow();
        List<Integer> ListaId = new ArrayList<>();
        Integer idPrato = dish.getId();
        Long LongIdPrato = idPrato.longValue();
        ListaId.add(dish.getId());
        pedido.setItens(ListaId);


        return pedidoRepository.save(pedido);
}*/
    public Pedido addItem(Long id, Long idPrato){
        Pedido pedido = findById(id);
        Dish dish = findByIdDish(idPrato);
        List<Dish> listaItens = pedido.getDish();
        listaItens.add(dish);
        pedido.setDish(listaItens);
        pedido.setPrecoTotal(pedido.getPrecoTotal()+dish.getPrice());

        return pedidoRepository.save(pedido);
    }

    public Pedido update(Long id, Pedido detalhesPedido) {
        Pedido pedido = findById(id);
        pedido.setStatus(detalhesPedido.getStatus());
        pedido.setCliente(detalhesPedido.getCliente());
        pedido.setDish(detalhesPedido.getDish());

        List<Dish> pratos = pedido.getDish();
        if (pratos != null) {
            for (Dish x : pratos) {
                pedido.setPrecoTotal(pedido.getPrecoTotal() + x.getPrice());
            }
        }else{
            pedido.setPrecoTotal(0);
        }
        return pedidoRepository.save(pedido);
    }

    public Pedido deletarItem(Long id, Long idPrato){
        Pedido pedido = findById(id);

        for (Dish x: pedido.getDish()){
            if (idPrato == x.getId()) {
                pedido.getDish().remove(x);
                pedido.setPrecoTotal(pedido.getPrecoTotal() - x.getPrice());
                break;
            }
        }
        return pedidoRepository.save(pedido);
    }

    public Pedido setObs(Long id, String obs){
        Pedido pedido = findById(id);

        pedido.setObservacao(obs);
        return  pedidoRepository.save(pedido);
    }

    public Pedido atualizarStatus(Long id, String status) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(status); // Atualiza o status
        return pedidoRepository.save(pedido); // Salva no banco de dados
    }

    public Pedido atribuirEntregadorAoPedido(Long pedidoId, Long motoboyId, Integer tempoEstimado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        Motoboy motoboy = motoboyRepository.findById(motoboyId)
                .orElseThrow(() -> new RuntimeException("Motoboy não encontrado"));

        pedido.setMotoboy(motoboy);
        pedido.setTempoEstimado(tempoEstimado);
        pedido.setStatus("pedido enviado para entrega");

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> findPedidosByMotoboy(Long motoboyId, String status) {
        if (status != null && !status.isEmpty()) {
            return pedidoRepository.findByMotoboyIdAndStatusOrderByDataAsc(motoboyId, status);
        } else {
            return pedidoRepository.findByMotoboyIdOrderByDataAsc(motoboyId);
        }
    }
}
