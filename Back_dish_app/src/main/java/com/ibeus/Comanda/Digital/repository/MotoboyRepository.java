package com.ibeus.Comanda.Digital.repository;

import com.ibeus.Comanda.Digital.model.Motoboy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MotoboyRepository extends JpaRepository<Motoboy, Long> {
    Optional<Motoboy> findByCpf(String cpf);
}
