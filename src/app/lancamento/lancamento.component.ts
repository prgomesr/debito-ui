import { Component, OnInit } from '@angular/core';
import {LancamentoService} from './lancamento.service';
import {Lancamento} from '../core/models/model';

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
  constructor(private service: LancamentoService) { }

  ngOnInit() {
    this.listar();
  }

  private listar() {
    this.service.list().subscribe(dados => this.lancamentos = dados);
  }

  open() {
    this.dialog = true;
    this.lancamento = new Lancamento();
  }

}
