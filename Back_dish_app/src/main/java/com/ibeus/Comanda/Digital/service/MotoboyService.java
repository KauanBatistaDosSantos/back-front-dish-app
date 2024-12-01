package com.ibeus.Comanda.Digital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibeus.Comanda.Digital.model.Motoboy;
import com.ibeus.Comanda.Digital.model.Pedido;
import com.ibeus.Comanda.Digital.repository.MotoboyRepository;
import com.ibeus.Comanda.Digital.repository.PedidoRepository;

@Service
public class MotoboyService {

    @Autowired
    private MotoboyRepository motoboyRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    public boolean cpfExists(String cpf) {
        return motoboyRepository.findByCpf(cpf).isPresent();
    }

    public Optional<Motoboy> findByCpf(String cpf) {
        return motoboyRepository.findByCpf(cpf);
    }

    public Motoboy salvarMotoboy(Motoboy motoboy) {
        Optional<Motoboy> motoboyExistente = motoboyRepository.findByCpf(motoboy.getCpf());

        // Verifica se o CPF já existe e não pertence ao próprio entregador
        if (motoboyExistente.isPresent() &&
                (motoboy.getId() == null || !motoboyExistente.get().getId().equals(motoboy.getId()))) {
            throw new RuntimeException("CPF já cadastrado!");
        }

        return motoboyRepository.save(motoboy);
    }
    
    public Optional<Motoboy> buscarMotoboyPorId(Long id) {
        return motoboyRepository.findById(id);
    }
    public List<Motoboy> listarMotoboy() {
        return motoboyRepository.findAll();
    }

    public void finalizarEntrega(String cpfInicio) {
        Pedido pedido = pedidoRepository.findByClienteCpfInicio(cpfInicio)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado ou já entregue"));
    
        pedido.setStatus("Entregue");
        pedidoRepository.save(pedido);
    }

    public Motoboy atualizarMotoboy(Long id, Motoboy motoboyAtualizado) {
        Motoboy motoboyExistente = motoboyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Motoboy não encontrado."));

        Optional<Motoboy> motoboyComMesmoCpf = motoboyRepository.findByCpf(motoboyAtualizado.getCpf());
        if (motoboyComMesmoCpf.isPresent() && !motoboyComMesmoCpf.get().getId().equals(id)) {
            throw new RuntimeException("CPF já cadastrado para outro motoboy.");
        }

        // Atualiza os campos
        motoboyExistente.setNome(motoboyAtualizado.getNome());
        motoboyExistente.setEndereco(motoboyAtualizado.getEndereco());
        motoboyExistente.setCpf(motoboyAtualizado.getCpf());
        motoboyExistente.setStatus(motoboyAtualizado.getStatus());

        return motoboyRepository.save(motoboyExistente);
    }

    public void excluirMotoboy(Long id) {
        if (motoboyRepository.existsById(id)) {
            motoboyRepository.deleteById(id);
        } else {
            throw new RuntimeException("Motoboy não encontrado.");
        }
    }
}
