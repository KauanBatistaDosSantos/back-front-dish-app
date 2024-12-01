import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-entrega-pedido',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, MatTooltipModule],
  templateUrl: './entrega-pedido.component.html',
  styleUrl: './entrega-pedido.component.css'
})
export class EntregaPedidoComponent {
  @Input() pedido: any;

  constructor(private pedidoService: PedidoService) {}

  getItensAgrupados(): { name: string; description: string; quantidade: number }[] {
    const agrupados: { [key: string]: { name: string; description: string; quantidade: number } } = {};
  
    this.pedido.dish.forEach((item: any) => {
      if (agrupados[item.name]) {
        agrupados[item.name].quantidade += 1;
      } else {
        agrupados[item.name] = { 
          name: item.name, 
          description: item.description, 
          quantidade: 1 
        };
      }
    });
  
    return Object.values(agrupados);
  }
}
