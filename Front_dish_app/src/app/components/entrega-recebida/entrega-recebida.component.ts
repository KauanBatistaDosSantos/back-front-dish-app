import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogConfirmeOPagamentoComponent } from '../dialog-confirme-o-pagamento/dialog-confirme-o-pagamento.component';
import { InserirCodigoClienteComponent } from '../inserir-codigo-cliente/inserir-codigo-cliente.component';
import { PrevisaoDeEntregaComponent } from '../previsao-de-entrega/previsao-de-entrega.component';
import { FinalizarEntregaComponent } from '../finalizar-entrega/finalizar-entrega.component';  // Importação do novo diálogo
import { EntregaService } from '../../services/entrega.service';
import { EntregadorInfoClienteEPedidoComponent } from '../entregador-info-cliente-e-pedido/entregador-info-cliente-e-pedido.component';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-entrega-recebida',
  standalone: true,
  imports: [NgIf, 
    RouterModule,  
    PrevisaoDeEntregaComponent,
    EntregadorInfoClienteEPedidoComponent
  ],
  templateUrl: './entrega-recebida.component.html',
  styleUrl: './entrega-recebida.component.css'
})
export class EntregaRecebidaComponent {
  @Input() pedido: any;
  @Output() entregaFinalizada = new EventEmitter<void>();
  
  mostrarPrevisaoEntrega: boolean = true;
  mostrarDiaPagamento: boolean = false;
  esconderH2: boolean = false;
  pagamentoConfirmado: boolean = false;
  codigoClienteConfirmado: boolean = false;

  constructor(public dialog: MatDialog,  private entregaService: EntregaService,  private pedidoService: PedidoService) {}

  openDialog(): void {
    if (!this.pagamentoConfirmado) {
      const dialogRef = this.dialog.open(InserirCodigoClienteComponent, {
        width: '396px',
        data: { 
          cpf: this.pedido.cliente.cpf,
          cliente: this.pedido.cliente.nome,
          id: this.pedido.id 
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'codigoConfirmado') {
          this.codigoClienteConfirmado = true;
          this.abrirPagamentoDialog();
        }
      });
    } else {
      this.abrirFinalizacaoDialog();
    }
  }

  abrirPagamentoDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmeOPagamentoComponent, {
      width: '396px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'pagamentoConfirmado') {
        this.pagamentoConfirmado = true;
        this.mostrarPrevisaoEntrega = false;
        this.mostrarDiaPagamento = true;
        this.esconderH2 = true;
      }
    });
  }

  abrirFinalizacaoDialog(): void {
    const dialogRef = this.dialog.open(FinalizarEntregaComponent, {
      width: '396px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'entregaFinalizada') {
        this.finalizarEntrega();
      }
    });
  }

  finalizarEntrega(): void {
    this.mostrarPrevisaoEntrega = false;
    this.mostrarDiaPagamento = false;
    this.esconderH2 = true;

    this.atualizarStatusPedidoFinalizado();
    this.entregaFinalizada.emit();
  }

  atualizarStatusPedidoFinalizado(): void {
    if (this.pedido && this.pedido.id) {
      this.pedidoService.finalizarPedidoEntregador(this.pedido.id).subscribe({
        next: () => {
          console.log('Status do pedido atualizado para "pedido finalizado".');
          const entregadorId = this.pedido.entregador?.id;
          if (!entregadorId) {
            console.error('ID do entregador não definido.');
            return;
          }
          this.pedidoService.getPedidoMaisAntigoParaEntregador(entregadorId).subscribe({
            next: (pedidoMaisAntigo) => {
              if (!pedidoMaisAntigo) {
                this.entregaService.finalizarEntrega();
              }
            },
            error: (err) => {
              console.error('Erro ao buscar o pedido mais antigo:', err);
            }
          });
        },
        error: (err) => console.error('Erro ao atualizar o status do pedido:', err)
      });
    } else {
      console.error('Pedido inválido ou ID não encontrado.');
    }
  }

  abrirRota() {
    if (this.pedido?.cliente?.endereco) {
        console.log('Endereço:', this.pedido.cliente.endereco);
        const enderecoFormatado = encodeURIComponent(this.pedido.cliente.endereco);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${enderecoFormatado}`;
        window.open(url, '_blank');
    } else {
        console.error('Endereço não disponível para o pedido.');
    }
}
}