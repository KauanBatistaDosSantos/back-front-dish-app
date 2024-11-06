package com.ibeus.Comanda.Digital.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;


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
    @OneToOne
    @JoinColumn(name="cliente_id",
    referencedColumnName = "id")
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

}