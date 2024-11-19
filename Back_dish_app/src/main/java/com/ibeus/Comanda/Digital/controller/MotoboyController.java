package com.ibeus.Comanda.Digital.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ibeus.Comanda.Digital.model.Motoboy;
import com.ibeus.Comanda.Digital.service.MotoboyService;

@RestController
@RequestMapping("/motoboy")
@CrossOrigin(origins = "http://localhost:4200")
public class MotoboyController {

    @Autowired
    private MotoboyService motoboyService;


    @PostMapping
    public Motoboy criarMotoboy(@RequestBody Motoboy motoboy) {
        return motoboyService.salvarMotoboy(motoboy);
    }


    @GetMapping
     public List<Motoboy> listarMotoboy() {
        return motoboyService.listarMotoboy();
    }
   

    @GetMapping("/{id}")
    public Optional<Motoboy> buscarMotoboyPorId(@PathVariable Long id) {
        return motoboyService.buscarMotoboyPorId(id);
    }
    @PutMapping("/finalizarEntrega")
    public ResponseEntity<String> finalizarEntrega(@RequestParam String cpfInicio) {
        motoboyService.finalizarEntrega(cpfInicio);
        return ResponseEntity.ok("Entrega finalizada com sucesso.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Motoboy> atualizarMotoboy(@PathVariable Long id, @RequestBody Motoboy motoboy) {
        try {
            Motoboy motoboyAtualizado = motoboyService.atualizarMotoboy(id, motoboy);
            return ResponseEntity.ok(motoboyAtualizado);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirMotoboy(@PathVariable Long id) {
        try {
            motoboyService.excluirMotoboy(id);
            return ResponseEntity.ok("Motoboy excluído com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao excluir o motoboy: " + e.getMessage());
        }
    }
}
