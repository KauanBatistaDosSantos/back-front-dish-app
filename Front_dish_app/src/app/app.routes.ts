import { Routes } from '@angular/router';
import { TelaInicialCozinhaComponent } from './components/tela-inicial-cozinha/tela-inicial-cozinha.component';
import { TelaInicialDirecionamentoEntregaComponent } from './components/tela-inicial-direcionamento-entrega/tela-inicial-direcionamento-entrega.component';
import { TelaEscolherEntregadorComponent } from './components/tela-escolher-entregador/tela-escolher-entregador.component';
import { TelaInicialEntregadorComponent } from './components/tela-inicial-entregador/tela-inicial-entregador.component';
import { TelaClienteFinalizarPedidoComponent } from './components/tela-cliente-finalizar-pedido/tela-cliente-finalizar-pedido.component';
import { AcompanharPedidoComponent } from './components/acompanhar-pedido/acompanhar-pedido.component';
import { PainelEntregadorComponent } from './components/painel-entregador/painel-entregador.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { ExecutivosComponent } from './components/cardapio/executivos/executivos.component';
import { BebidasComponent } from './components/cardapio/bebidas/bebidas.component';
import { PorcoesComponent } from './components/cardapio/porcoes/porcoes.component';
import { TestePedidoComponent } from './components/teste-pedido/teste-pedido.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { GerenciaComponent } from './components/gerencia/gerencia.component';
import { CadastroEntregadorComponent } from './components/cadastro-entregador/cadastro-entregador.component';
import { ListaEntregadoresComponent } from './components/lista-entregadores/lista-entregadores.component';
import { PedidoComponent } from './components/main-gerente/pedido/pedido.component';
import { DetalhesPedidoComponent } from './components/main-gerente/detalhes-pedido/detalhes-pedido.component';

export const routes: Routes = [
    { path: '', component: InicioComponent},
    { path: 'tela-cozinha', component: TelaInicialCozinhaComponent},
    { path: 'tela-dir-entrega', component: TelaInicialDirecionamentoEntregaComponent},
    { path: 'tela-escolher-entregador', component: TelaEscolherEntregadorComponent},
    { path: 'tela-entregador', component: TelaInicialEntregadorComponent},
    { path: 'finalizar-pedido', component: TelaClienteFinalizarPedidoComponent},
    { path: 'acompanhar-pedido', component: AcompanharPedidoComponent},
    { path: 'tela-escolher-entregador/:id', component: TelaEscolherEntregadorComponent},
    { path: 'painel-entregadores', component: PainelEntregadorComponent},
    { path: 'tela-inicial-entregador/:id', component: TelaInicialEntregadorComponent },
    { path: 'inicio', component: InicioComponent },

    { path: 'cardapio', component: CardapioComponent },
    { path: 'dish-form', component: DishFormComponent }, 
    { path: 'dish-form/:id', component: DishFormComponent }, 
    { path: 'dish-list', component: DishListComponent },
    { path: 'cardapio/executivos', component: ExecutivosComponent },
    { path: 'cardapio/bebidas', component: BebidasComponent },
    { path: 'cardapio/porcoes', component: PorcoesComponent },
    { path: 'cardapio/fazer-pedido/:id/:categoria', component: TestePedidoComponent },
    { path: 'dish-list/edit-dish/:id', component: DishFormComponent },
    { path: 'carrinho', component: CarrinhoComponent },

    { path: 'gerencia', component: GerenciaComponent},
    { path: 'cadastro-entregadores', component: CadastroEntregadorComponent},
    { path: 'cadastro-entregadores/:id', component: CadastroEntregadorComponent },
    { path: 'lista-entregadores', component: ListaEntregadoresComponent},

    { path: 'todos-os-pedidos', component: PedidoComponent},
    { path: 'ver-detalhes/:id', component: DetalhesPedidoComponent}

];
