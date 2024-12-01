import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InserirCpfComponent } from '../inserir-cpf/inserir-cpf.component';
import { InserirEnderecoComponent } from '../inserir-endereco/inserir-endereco.component';
import { PedidoService } from '../../services/pedido.service';
import { NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InserirNomeComponent } from '../inserir-nome/inserir-nome.component';
import { ClienteService } from '../../services/cliente.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-tela-cliente-finalizar-pedido',
  standalone: true,
  imports: [MatIcon, NgClass, CommonModule, FormsModule],
  templateUrl: './tela-cliente-finalizar-pedido.component.html',
  styleUrl: './tela-cliente-finalizar-pedido.component.css'
})
export class TelaClienteFinalizarPedidoComponent implements OnInit {
  enderecoSalvo: any = null;
  cpfSalvo: string = '';
  nomeSalvo: string = '';
  isButtonEnabled: boolean = false;
  subtotal: number = 0;
  taxaEntrega: number = 15;
  total: number = 0;
  observacao: string = '';
  cartItems: any[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    const cliente = this.clienteService.carregarDadosLocais();
    this.nomeSalvo = cliente.nome;
    this.cpfSalvo = cliente.cpf;
    this.enderecoSalvo = cliente.endereco;

    this.observacao = localStorage.getItem('observacaoCliente') || '';
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    this.calcularTotal();
    this.verificarCampos();
  }

  abrirDialogoInserirNome(): void {
    const dialogRef = this.dialog.open(InserirNomeComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nomeSalvo = result;
        localStorage.setItem('nomeCliente', this.nomeSalvo);
        this.verificarCampos();
      }
    });
  }

  abrirDialogCpf(): void {
    const dialogRef = this.dialog.open(InserirCpfComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cpfSalvo = result;
        localStorage.setItem('cpfCliente', this.cpfSalvo);
        this.verificarCampos();
      }
    });
  }

  abrirDialogoInserirEndereco(): void {
    const dialogRef = this.dialog.open(InserirEnderecoComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enderecoSalvo = result;
        localStorage.setItem('enderecoCliente', JSON.stringify(this.enderecoSalvo));
        this.verificarCampos();
      }
    });
  }

  verificarCampos(): void {
    if (this.cpfSalvo && this.enderecoSalvo && this.nomeSalvo) {
      this.isButtonEnabled = true;
    } else {
      this.isButtonEnabled = false;
    }
  }

  calcularTotal(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantidade || 1)), 0);
    this.total = this.subtotal + this.taxaEntrega;
}

  navegarParaOutroComponente() {
    if (this.isButtonEnabled) {
        const cliente = {
            nome: this.nomeSalvo,
            cpf: this.cpfSalvo,
            endereco: `${this.enderecoSalvo.logradouro}, ${this.enderecoSalvo.numero} - ${this.enderecoSalvo.bairro}`
        };

        this.clienteService.buscarOuCriarCliente(cliente).subscribe({
            next: (clienteCriadoOuExistente) => {
                console.log('Cliente processado:', clienteCriadoOuExistente);
                this.criarPedido(clienteCriadoOuExistente.id);
            },
            error: (err) => {
                console.error('Erro ao processar cliente:', err);
                alert('Erro ao processar cliente. Tente novamente.');
            }
        });
    }
}

private criarPedido(clienteId: number): void {
  const itensParaEnvio = this.cartItems.flatMap(item =>
      Array(item.quantidade || 1).fill({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category,
          stock: item.stock,
      })
  );

  const novoPedido = {
      cliente: { id: clienteId },
      dish: itensParaEnvio,
      precoTotal: this.total,
      observacao: this.observacao,
      status: 'não aceito',
      data: new Date().toISOString(),
  };

  console.log('Novo Pedido:', novoPedido);
  this.pedidoService.fazerPedido(novoPedido).subscribe(
      (pedidoCriado) => {
          this.pedidoService.setCodigoConfirmacao(this.cpfSalvo, pedidoCriado.id);

          localStorage.setItem('pedidoId', pedidoCriado.id);
          localStorage.setItem('codigoConfirmacao', this.pedidoService.getCodigoConfirmacao());

          localStorage.removeItem('cartItems');
          this.carrinhoService.clearCart();
          localStorage.removeItem('nomeCliente');
          localStorage.removeItem('cpfCliente');
          localStorage.removeItem('enderecoCliente');
          localStorage.removeItem('observacaoCliente');

          setTimeout(() => {
              this.router.navigate(['/acompanhar-pedido']);
          }, 100);
      },
      (error) => {
          console.error('Erro ao criar pedido:', error);
          alert('Erro ao processar pedido. Tente novamente.');
      }
  );
}

  ajustarAltura(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  
    this.observacao = textarea.value.slice(0, 280);
    localStorage.setItem('observacaoCliente', this.observacao);
  }

  voltar() {
    this.router.navigate(['/carrinho']);
  }
}