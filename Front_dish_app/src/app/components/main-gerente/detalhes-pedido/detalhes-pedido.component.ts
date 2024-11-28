import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './detalhes-pedido.component.html',
  styleUrl: './detalhes-pedido.component.css'
})
export class DetalhesPedidoComponent implements OnInit {
  pedido: any | null = null;
  loading: boolean = true;

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pedidoService.getPedidoById(+id).subscribe(
        (pedido) => {
          this.pedido = pedido;
          this.loading = false;
        },
        (error) => {
          console.error('Erro ao buscar detalhes do pedido:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('ID do pedido não fornecido na rota');
      this.loading = false;
    }
  }
  
  voltar() {
    this.router.navigate(['/todos-os-pedidos']);
  }
}