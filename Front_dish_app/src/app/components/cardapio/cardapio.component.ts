import { Component, OnInit } from '@angular/core';
import { DishService, Dish } from '../../services/dish.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PedidoService } from '../../services/pedido.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [MatIcon, CommonModule, MatBadgeModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit {
  dishes: Dish[] = [];
  loading = true;
  totalItens: number = 0;

  categoriasDisponiveis: { [categoria: string]: boolean } = {
    executivos: false,
    bebidas: false,
    porcoes: false
  };

  constructor(
    private dishService: DishService, 
    private router: Router, 
    private location: Location,
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.verificarCategoriasAtivas();

    // Atualizar a quantidade de itens no carrinho
    this.totalItens = this.carrinhoService.getCartItems().length;
  }

  verificarCategoriasAtivas() {
    const categorias = Object.keys(this.categoriasDisponiveis);

    categorias.forEach(categoria => {
      this.dishService.getDishesByCategory(categoria).subscribe(
        (dishes) => {
          // Marca a categoria como disponível se houver pratos ativos
          this.categoriasDisponiveis[categoria] = dishes && dishes.length > 0;
        },
        (error) => {
          console.error(`Erro ao carregar a categoria ${categoria}:`, error);
        }
      );
    });
  }

  irParaExecutivo() {
    this.router.navigate(['/cardapio/executivos']);
  }

  irParaBebidas(){
    this.router.navigate(['/cardapio/bebidas']);
  }

  irParaPorcoes(){
    this.router.navigate(['/cardapio/porcoes'])
  }

  navegarParaPrato(id: string) {
    this.router.navigate(['/prato', id]);
  }

  voltar() {
    this.router.navigate(['/inicio']);
  }

  irParaCarrinho(){
    this.router.navigate(['/carrinho']);
   }
}
