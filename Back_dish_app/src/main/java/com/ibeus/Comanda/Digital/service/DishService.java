package com.ibeus.Comanda.Digital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ibeus.Comanda.Digital.model.Dish;
import com.ibeus.Comanda.Digital.repository.DishRepository;

import java.util.List;

@Service
public class DishService {

    @Autowired
    private DishRepository dishRepository;

    public List<Dish> findAll() {
        return dishRepository.findAll();
    }

    public Dish findById(Long id) {
        return dishRepository.findById(id).orElseThrow(() -> new RuntimeException("Dish not found"));
    }
 
    public Dish create(Dish dish) {
//        if (dish.getQuantity()>0) {dish.setStock(true);}
        if (dish.getStock() < 0 || dish.getStock() >1) { throw new IllegalArgumentException("Invalido, use 1 para em estoque ou 0 para sem estoque");}
        return dishRepository.save(dish);}

    public Dish update(Long id, Dish dishDetails) {
        Dish dish = findById(id);
        dish.setName(dishDetails.getName());
        dish.setDescription(dishDetails.getDescription());
        dish.setPrice(dishDetails.getPrice());
        dish.setCategory(dishDetails.getCategory());
        dish.setImage(dishDetails.getImage());
        if (dishDetails.getStock() < 0 || dishDetails.getStock() >1) { throw new IllegalArgumentException("Invalido, use 1 para em estoque ou 0 para sem estoque");}
        dish.setStock(dishDetails.getStock());
//        dish.setQuantity(dishDetails.getQuantity());
//        if (dish.getQuantity()>0) {dish.setStock(true);}
//        if (dish.getQuantity()==0) {dish.setStock(false);}
//        if (dish.getQuantity()<0) { throw new RuntimeException("Quantidade insuficiente");}
        return dishRepository.save(dish);
    }

    public void delete(Long id) {
        Dish dish = findById(id);
        dishRepository.delete(dish);
    }

    public Dish atualizarStock(Long id, int valor) {
        Dish dish = findById(id);
        if (valor < 0 || valor >1) { throw new IllegalArgumentException("Invalido, use 1 para em estoque ou 0 para sem estoque");}
        dish.setStock(valor);
        return dishRepository.save(dish);
    }

    public List<Dish> findByCategory(String category){
        return dishRepository.findByCategory(category);
    }

    public Long getNextId() {
        Dish lastDish = dishRepository.findTopByOrderByIdDesc(); // Busca o prato com o maior ID
        return lastDish != null ? lastDish.getId() + 1 : 1L; // Incrementa o ID ou retorna 1 se nenhum prato existir
    }
//    public Dish diminuirQuantidade(Long id, int valor) {
//        Dish dish = findById(id);
////        if (dish.getQuantity() - valor < 0) {
////            throw new RuntimeException("Quantidade insuficiente");
////        }
////        dish.setQuantity(dish.getQuantity() - valor);
////        if (dish.getQuantity() == 0) {
////            dish.setStock(false);
////        }
//        return dishRepository.save(dish);
//    }

//    public Dish aumentarQuantidade(Long id, int valor) {
//        if (valor <= 0){
//            throw new RuntimeException("Quantidade inválida");
//        }
//        Dish dish = findById(id);
//        dish.setQuantity(dish.getQuantity() + valor);
//        if (dish.getQuantity() > 0) {
//            dish.setStock(true);
//        }
//        return dishRepository.save(dish);
//    }

}