import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent implements OnInit {
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  filtroAtual: string = 'todos';

  constructor(private pedidoService: PedidoService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(
      (pedidos) => {
        console.log('Pedidos recebidos:', pedidos);
        this.pedidos = pedidos.map(pedido => ({
          id: pedido.id,
          nomeCliente: pedido.cliente.nome,
          status: pedido.status
        }));
        this.pedidosFiltrados = [...this.pedidos];
      },
      (error) => {
        console.error('Erro ao buscar pedidos:', error);
      }
    );
  }

  filtrarPedidos(filtro: string) {
    this.filtroAtual = filtro;

    this.pedidosFiltrados = this.pedidos.filter(pedido => {
      if (filtro === 'finalizados') {
        return pedido.status === 'pedido finalizado';
      } else if (filtro === 'em preparo') {
        return pedido.status === 'em preparo';
      } else if (filtro === 'não aceito') {
        return pedido.status === 'não aceito';
      }
      return true;
    });
  }

  verDetalhes(id: string) {
    this.router.navigate(['/ver-detalhes', id]);
  }

  voltar() {
    this.router.navigate(['/gerencia']);
  }
}