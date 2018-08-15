import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LancamentoService} from './lancamento.service';
import {Lancamento} from '../core/models/model';
import {ClienteService} from '../cliente/cliente.service';
import {ConvenioService} from '../convenio/convenio.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  lancamentos = []
  lancamento = new Lancamento();
  convenios = [];
  clientes = [];
  formModal = false;
  searchModal = false;
  pegarForm: NgForm;
  constructor(private service: LancamentoService,
              private convenioService: ConvenioService,
              private clienteService: ClienteService,
              private spinner: NgxSpinnerService,
              private toasty: MessageService) { }

  ngOnInit() {
    this.listar();
    this.listarConvenios();
    this.listarClientes();
  }

  private listarClientes() {
    this.spinner.show();
    this.clienteService.list().subscribe(dados => {
      this.clientes = dados
        .map(d => ({label: d.nome, value: d.id}));
      this.spinner.hide();
    });
  }

  private listarConvenios() {
    this.convenioService.list().subscribe(dados => this.convenios = dados
      .map(d => ({label: d.numero, value: d.id})));
  }

  private listar() {
    this.spinner.show();
    this.service.list().subscribe(dados => {
      this.lancamentos = dados;
      this.spinner.hide();
    });
  }

  openFormModal(id: number) {
    this.formModal = true;
    this.lancamento = new Lancamento();
  }

  onSubmit(f) {
    if (this.editando) {
    console.log('editando');
    } else {
      this.save(f);
    }
  }

  search(f) {

  }

  private save(f) {
    this.spinner.show();
    this.service.create(this.lancamento).subscribe(() => {
      this.spinner.hide();
      this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Lançamento salvo'})
      f.reset();
      this.formModal = false;
      this.listar();
    });
  }

  private listarPorId(id: number) {
    this.service.read(id).subscribe(dado => this.lancamento = dado);
  }

  get editando(): any {
    return Boolean (this.lancamento.id);
  }

}
