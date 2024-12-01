import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-dialog-entregador-pedido-atribuido',
  standalone: true,
  imports: [],
  templateUrl: './dialog-entregador-pedido-atribuido.component.html',
  styleUrl: './dialog-entregador-pedido-atribuido.component.css'
})
export class DialogEntregadorPedidoAtribuidoComponent implements OnInit {
  pedidoId!: number;
  pedidoValido: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEntregadorPedidoAtribuidoComponent>,
    private pedidoService: PedidoService,
    @Inject(MAT_DIALOG_DATA) public data: { pedidoId: number }
  ) {}

  ngOnInit(): void {
    if (!this.data?.pedidoId) {
      console.error('ID do pedido não foi fornecido.');
      this.dialogRef.close();
      return;
    }
  
    this.pedidoService.getPedidoById(this.data.pedidoId).subscribe(
      (pedido) => {
        if (!pedido || pedido.status === 'pedido finalizado') {
          console.log('Pedido já finalizado. Fechando o diálogo.');
          this.dialogRef.close();
        }
      },
      (error) => {
        console.error('Erro ao verificar o status do pedido:', error);
        this.dialogRef.close();
      }
    );
  }

  verificarPedido(pedidoId: number): void {
    console.log(`Verificando pedido com ID: ${pedidoId}`);
  }

  iniciar(): void {
    this.dialogRef.close('iniciar');
  }
}