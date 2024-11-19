package com.ibeus.Comanda.Digital.controller;

import com.ibeus.Comanda.Digital.model.Dish;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

//    @GetMapping
//    public List<Pedido> getAllPedidos(){ return pedidoService.findAll();}

    @GetMapping
    public List<Pedido> getAllPedidos() {
        List<Pedido> pedidos = pedidoService.findAll();
        pedidos.forEach(pedido -> System.out.println("Pedido carregado: " + pedido));
        return pedidos;
    }

    @PostMapping
    public Pedido criarPedido(@RequestBody Pedido pedido){ return pedidoService.criarPedido(pedido);}

    @PutMapping("/{id}/{idPrato}/addItemPedido")
    public Pedido addItem(@PathVariable Long id, @PathVariable Long idPrato){ return pedidoService.addItem(id, idPrato); }

    @PutMapping("/{id}/updateItemPedido")
    public Pedido updateItem(@PathVariable Long id, @RequestBody Pedido detalhesPedido){ return pedidoService.update(id, detalhesPedido); }

    @PutMapping("/{id}/{idPrato}/delItemPedido")
    public Pedido deletItem(@PathVariable Long id, @PathVariable Long idPrato){ return pedidoService.deletarItem(id, idPrato); }

    @PutMapping("/{id}/obs")
    public Pedido addObs(@RequestBody String obs, @PathVariable Long id){ return pedidoService.setObs(id, obs);}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> apagarPedido(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> getPedidoById(@PathVariable Long id) {
        Pedido pedido = pedidoService.findById(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Pedido> atualizarStatusPedido(@PathVariable Long id, @RequestParam String status) {
        Pedido pedido = pedidoService.atualizarStatus(id, status);
        return ResponseEntity.ok(pedido);
    }

    @PatchMapping("/{pedidoId}/atribuirMotoboy/{motoboyId}")
    public ResponseEntity<Pedido> atribuirEntregadorAoPedido(
            @PathVariable Long pedidoId,
            @PathVariable Long motoboyId,
            @RequestParam int tempoEstimado) {
        System.out.println("Pedido ID: " + pedidoId);
        System.out.println("Motoboy ID: " + motoboyId);
        System.out.println("Tempo Estimado: " + tempoEstimado);

        Pedido pedidoAtualizado = pedidoService.atribuirEntregadorAoPedido(pedidoId, motoboyId, tempoEstimado);
        return ResponseEntity.ok(pedidoAtualizado);
    }

    @GetMapping("/entregador/{motoboyId}")
    public ResponseEntity<List<Pedido>> getPedidosPorEntregador(
            @PathVariable Long motoboyId,
            @RequestParam(value = "status", required = false) String status) {
        List<Pedido> pedidos = pedidoService.findPedidosByMotoboy(motoboyId, status);
        return ResponseEntity.ok(pedidos);
    }
}
