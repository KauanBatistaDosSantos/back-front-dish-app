import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  activeDishes: Dish[] = [];
  inactiveDishes: Dish[] = [];
  filtroCategoria: string | null = null;
  mostrarAtivos: boolean = true; // Controla se os pratos ativos são exibidos
  mostrarInativos: boolean = true;

  constructor(private dishService: DishService, private router: Router, private location:Location) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.filterDishes();
    });
  }

  filterDishes() {
    const categoria = this.filtroCategoria;

    this.activeDishes = this.dishes.filter(
      (dish) => dish.stock === 1 && (!categoria || dish.category === categoria)
    );
    this.inactiveDishes = this.dishes.filter(
      (dish) => dish.stock === 0 && (!categoria || dish.category === categoria)
    );
  }

  aplicarFiltro(categoria: string | null) {
    this.filtroCategoria = categoria;
    this.filterDishes();
  }

  toggleAtivosInativos(mostrarAtivos: boolean, mostrarInativos: boolean) {
    this.mostrarAtivos = mostrarAtivos;
    this.mostrarInativos = mostrarInativos;
  }

  toggleStatus(dish: Dish) {
    const updatedStock = dish.stock === 1 ? 0 : 1;
    this.dishService.mudarStock(updatedStock, dish.id).subscribe((updatedDish) => {
      dish.stock = updatedDish.stock;
      this.filterDishes();
    });
  }
  

  deleteDish(id: string) {
    this.dishService.deleteDish(id).subscribe(() => {
      this.loadDishes();
    });
  }

  editDish(id: string) {
    this.router.navigate(['/dish-form', id]);
  }

  voltar() {
    this.router.navigate(['/gerencia']);
  }
}