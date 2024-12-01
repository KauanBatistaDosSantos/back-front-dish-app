import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntregadorService, Entregador } from '../../services/entregador.service';
import { EntregadorModeloComponent } from '../entregador-modelo/entregador-modelo.component';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-entregadores',
  standalone: true,
  imports: [EntregadorModeloComponent, MatIcon, NgIf, NgForOf, CommonModule],
  templateUrl: './lista-entregadores.component.html',
  styleUrl: './lista-entregadores.component.css'
})
export class ListaEntregadoresComponent implements OnInit {
  entregadores: Entregador[] = [];
  todosEntregadores: Entregador[] = [];
  erro: string = '';
  filtroCategoria: number | null = null;

  constructor(
    private router: Router,
    private entregadorService: EntregadorService
  ) {}

  ngOnInit(): void {
    this.carregarEntregadores();
  }

  voltar() {
    this.router.navigate(['/gerencia']);
  }

  cadastrar() {
    this.router.navigate(['/cadastro-entregadores']);
  }

  carregarEntregadores(): void {
    this.entregadorService.getEntregadores().subscribe(
      (data) => {
        this.todosEntregadores = data;
        this.aplicarFiltro(this.filtroCategoria);
      },
      (error) => {
        this.erro = 'Erro ao carregar entregadores';
        console.error(error);
      }
    );
  }

  aplicarFiltro(categoria: number | null): void {
    this.filtroCategoria = categoria;
    if (categoria === null) {
      this.entregadores = [...this.todosEntregadores];
    } else {
      this.entregadores = this.todosEntregadores.filter(
        (entregador) => entregador.status === categoria
      );
    }
  }
}