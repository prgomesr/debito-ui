import { Component, OnInit } from '@angular/core';
import {LancamentoService} from './lancamento.service';
import {Lancamento} from '../core/models/model';
import {ContaService} from '../conta/conta.service';
import {ClienteService} from '../cliente/cliente.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  lancamentos = []
  lancamento = new Lancamento();
  contas = [];
  clientes = [];
  dialog = false;
  constructor(private service: LancamentoService,
              private contaService: ContaService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.listar();
    this.listarContas();
    this.listarClientes();
  }

  private listarClientes() {
    this.clienteService.list().subscribe(dados => this.clientes = dados
      .map(d => ({label: d.nome, value: d.id})));
  }

  private listarContas() {
    this.contaService.list().subscribe(dados => this.contas = dados);
  }

  private listar() {
    this.service.list().subscribe(dados => this.lancamentos = dados);
  }

  open() {
    this.dialog = true;
    this.lancamento = new Lancamento();
  }

}
