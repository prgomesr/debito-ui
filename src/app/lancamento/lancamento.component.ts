import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LancamentoService} from './lancamento.service';
import {Filtro, Lancamento} from '../core/models/model';
import {ClienteService} from '../cliente/cliente.service';
import {ConvenioService} from '../convenio/convenio.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  lancamentos = [];
  lancamento = new Lancamento();
  convenios = [];
  conveniosFiltros = [];
  clientes = [];
  formModal = false;
  pegarForm: NgForm;
  filtro = new Filtro();
  modalRef: BsModalRef;
  habilitarRemessa = false;
  vencimento: Date;
  constructor(private service: LancamentoService,
              private convenioService: ConvenioService,
              private clienteService: ClienteService,
              private spinner: NgxSpinnerService,
              private toasty: MessageService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.listar();
    this.listarConvenios();
    this.listarConveniosFiltro();
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

  private listarConveniosFiltro() {
    this.convenioService.list().subscribe(dados => this.conveniosFiltros = dados
      .map(d => ({label: d.numero, value: d})));
  }

  public listar() {
    this.spinner.show();
    this.service.filter(this.filtro).subscribe(dados => {
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
      this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Lançamento salvo'});
      f.reset();
      this.formModal = false;
      this.listar();
    });
  }

  private listarPorId(id: number) {
    this.service.read(id).subscribe(dado => this.lancamento = dado);
  }

  openSearchModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
  }

  openLancamentoPorLote(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
  }

  get editando(): any {
    return Boolean (this.lancamento.id);
  }

  gerarPorLote(f) {
    this.spinner.show();
    this.service.lancamentoPorLote(this.filtro, this.vencimento).subscribe(() => {
      this.spinner.hide();
      this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Lançamento (s) gerado (s)'});
      this.filtro = new Filtro();
      setTimeout(() => {
        this.modalRef.hide();
        this.listar();
      }, 100);
    });
  }

}
