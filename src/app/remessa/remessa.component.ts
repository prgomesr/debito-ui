import {Component, OnInit, TemplateRef} from '@angular/core';
import {RemessaService} from './remessa.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LancamentoService} from '../lancamento/lancamento.service';
import {Convenio, Filtro} from '../core/models/model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MessageService} from 'primeng/api';
import {ConvenioService} from '../convenio/convenio.service';
import {environment} from '../../environments/environment';
import {ErrorHandlerService} from '../core/error-handler.service';

@Component({
  selector: 'app-remessa',
  templateUrl: './remessa.component.html',
  styleUrls: ['./remessa.component.css']
})
export class RemessaComponent implements OnInit {

  remessas = [];
  lancamentos = [];
  convenios = [];
  convenio = new Convenio();
  filtro = new Filtro();
  modalRef: BsModalRef;
  valor = true;
  progressBar = false;
  arquivoEnviado = false;
  convenioId: number;

  constructor(private service: RemessaService,
              private lancamentoService: LancamentoService,
              private convenioService: ConvenioService,
              private spinner: NgxSpinnerService,
              private toasty: MessageService,
              private modalService: BsModalService,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
    this.listar();
  }

  private listar() {
    this.spinner.show();
    this.service.list().subscribe(dados => {
        this.remessas = dados;
        this.spinner.hide();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  listarLancamentos() {
    this.spinner.show();
    this.lancamentoService.filter(this.filtro).subscribe(dados => {
        this.spinner.hide();
        this.lancamentos = dados;
        this.valor = false;
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  listarConveniosValueId() {
    this.spinner.show();
    this.convenioService.list().subscribe(dados => {
        this.spinner.hide();
        this.convenios = dados
          .map(d => ({label: d.numero, value: d.id}));
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  listarConvenios() {
    this.spinner.show();
    this.convenioService.list().subscribe(dados => {
        this.spinner.hide();
        this.convenios = dados
          .map(d => ({label: d.numero, value: d}));
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  openSearchModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarConvenios();
  }

  openUploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarConveniosValueId();
    this.arquivoEnviado = false;
    this.convenioId = null;
  }

  baixar(id: number) {
    this.spinner.show();
    this.lancamentoService.baixarRemessa(id).subscribe(() => {
        this.spinner.hide();
        this.listar();
        // setTimeout(() => {
        //   this.listar();
        // }, 300);
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  gerarRemessa() {
    this.spinner.show();
    this.lancamentoService.filterRemessa(this.filtro).subscribe(dados => {
        this.spinner.hide();
        this.lancamentos = dados;
        this.listar();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Remessa gerada'});
        this.modalRef.hide();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  limparFiltro() {
    this.filtro = new Filtro();
    this.lancamentos = [];
    this.valor = true;
  }

  nomeArquivo(nome: string) {
    environment.nomeArquivoRemessa = nome;
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Basic YWRtaW46YWRtaW4=');
    this.progressBar = true;
    this.arquivoEnviado = false;
  }

  erroDeUpload(event) {
    this.progressBar = false;
    this.arquivoEnviado = false;
    this.toasty.add({
      severity: 'error', summary: 'Erro!',
      detail: 'Erro ao tentar enviar o arquivo. Tente novamente!', life: 7000
    });
  }

  aoTerminarUpload(event) {
    this.progressBar = false;
    this.arquivoEnviado = true;
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo(this.convenioId);
  }

}
