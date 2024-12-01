import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { CommonModule, Location } from '@angular/common';
import { Dish } from '../../services/dish.service';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatIcon],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  cart: (Dish & { quantidade: number })[] = [];
  loading: boolean = true;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router, 
    private location: Location
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.loading = false;
  }

  loadCartItems() {
    this.cart = this.carrinhoService.getCartItems();
  }

  incrementarQuantidade(dish: Dish & { quantidade: number }): void {
    this.carrinhoService.updateQuantity(dish.id, dish.quantidade + 1);
    this.loadCartItems();
  }

  decrementarQuantidade(dish: Dish & { quantidade: number }): void {
    if (dish.quantidade > 1) {
      this.carrinhoService.updateQuantity(dish.id, dish.quantidade - 1);
    } else {
      this.removeFromCart(dish.id);
    }
    this.loadCartItems();
  }

  removeFromCart(id: string): void {
    this.carrinhoService.removeFromCart(id);
    this.loadCartItems();
  }

  get total(): number {
    return this.cart.reduce((sum, dish) => sum + (dish.price * dish.quantidade || 0), 0);
  }

  voltar() {
    this.router.navigate(['/cardapio']);
  }

  finalizar() {
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
    this.router.navigate(['/finalizar-pedido']);
  }
}
