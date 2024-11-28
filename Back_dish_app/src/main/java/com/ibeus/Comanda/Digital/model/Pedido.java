package com.ibeus.Comanda.Digital.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pedidos")
@Data
@EqualsAndHashCode(exclude = {"itens"})
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;

    private String data;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id", nullable = false)
    private Cliente cliente;
    
    @ManyToOne
    @JoinColumn(name = "motoboy_id")  
    private Motoboy motoboy;

    @ManyToMany
    @JoinTable(
            name = "pedido_pratos",
            joinColumns = @JoinColumn(name = "pedido_id"),
            inverseJoinColumns = @JoinColumn(name = "prato_id")
    )
    private List<Dish> dish;

    private double precoTotal;

    private String observacao;

    private Integer tempoEstimado;
}
