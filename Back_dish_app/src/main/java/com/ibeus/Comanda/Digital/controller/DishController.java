package com.ibeus.Comanda.Digital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ibeus.Comanda.Digital.model.Dish;
import com.ibeus.Comanda.Digital.service.DishService;

import java.util.List;

@RestController
@RequestMapping("/dishes")
@CrossOrigin(origins = "http://localhost:4200")
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping
    public List<Dish> getAllDishes() {
        return dishService.findAll();
    }

    @GetMapping("/{id}")
    public Dish getDishById(@PathVariable Long id) {
        return dishService.findById(id);
    }

    @GetMapping("category/{category}")
    public List<Dish> getDishesByCategory(@PathVariable String category) {
        return dishService.findByCategory(category);
    }

    @PostMapping
    public Dish createDish(@RequestBody Dish dish) {
        return dishService.create(dish);
    }

    @PutMapping("/{id}/atualizarPrato")
    public Dish updateDish(@PathVariable Long id, @RequestBody Dish dish) {
        return dishService.update(id, dish);
    }

    @PutMapping("/{id}/atualizarEstoque")
    public Dish atualizarStock(@PathVariable Long id, @RequestParam int valor) {
        return dishService.atualizarStock(id, valor);
    }

//    @PutMapping("/{id}/diminuirQuantidade")
//    public Dish diminuirQuantidadeDish(@PathVariable Long id, @RequestParam int value) {return dishService.diminuirQuantidade(id, value);}
//
//    @PutMapping("/{id}/aumentarQuantidade")
//    public Dish aumentarQuantidadeDish(@PathVariable Long id, @RequestParam int value) {return dishService.aumentarQuantidade(id, value);}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDish(@PathVariable Long id) {
        dishService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/nextId")
    public Long getNextId() {
        return dishService.getNextId(); // Chama o método do service
    }
}