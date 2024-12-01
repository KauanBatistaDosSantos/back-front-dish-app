import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EntregadorService, Entregador } from '../../services/entregador.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CpfUtils } from '../cpf-utils';

@Component({
  selector: 'app-entregador-modelo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './entregador-modelo.component.html',
  styleUrl: './entregador-modelo.component.css'
})
export class EntregadorModeloComponent {
  @Input() entregador!: Entregador;
  @Output() statusAlterado = new EventEmitter<void>();
  @Output() excluido = new EventEmitter<void>();

  erro: string = '';

  constructor(
    private entregadorService: EntregadorService,
    private router: Router,
  ) {}

  get cpfFormatado(): string {
    return CpfUtils.formatarCpf(this.entregador.cpf);
  }

  editar(entregadorId?: number) {
    if (entregadorId !== undefined) {
      this.router.navigate(['/cadastro-entregadores', entregadorId]);
    } else {
      this.erro = 'ID do entregador não está definido para edição';
    }
  }

  excluirEntregador(): void {
    if (this.entregador.id !== undefined) {
      this.entregadorService.deleteEntregador(this.entregador.id).subscribe(
        () => this.excluido.emit(),
        (error) => this.erro = 'Erro ao excluir entregador'
      );
    } else {
      this.erro = 'ID do entregador não está definido';
    }
  }
}