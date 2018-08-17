import {Component, OnInit, TemplateRef} from '@angular/core';
import {RemessaService} from './remessa.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LancamentoService} from '../lancamento/lancamento.service';
import {Filtro} from '../core/models/model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MessageService} from 'primeng/api';
import {ConvenioService} from '../convenio/convenio.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-remessa',
  templateUrl: './remessa.component.html',
  styleUrls: ['./remessa.component.css']
})
export class RemessaComponent implements OnInit {

  remessas = [];
  lancamentos = [];
  convenios = [];
  filtro = new Filtro();
  modalRef: BsModalRef;
  constructor(private service: RemessaService,
              private lancamentoService: LancamentoService,
              private convenioService: ConvenioService,
              private spinner: NgxSpinnerService,
              private toasty: MessageService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.listar();
  }

  private listar() {
    this.spinner.show();
    this.service.list().subscribe(dados => {
      this.remessas = dados;
      this.spinner.hide();
    });
  }

  listarLancamentos() {
    this.spinner.show();
    this.lancamentoService.filter(this.filtro).subscribe(dados => {
      this.spinner.hide();
      this.lancamentos = dados;
    });
  }

  listarConvenios() {
    this.spinner.show();
    this.convenioService.list().subscribe(dados => {
      this.spinner.hide();
      this.convenios = dados
        .map(d => ({label: d.numero, value: d}));
    });
  }

  openSearchModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarLancamentos();
    this.listarConvenios();
  }

  baixar(id: number) {
    this.lancamentoService.baixarRemessa(id).subscribe(dado => (dado));
    setTimeout(() => {
      this.listar();
    }, 300);
  }

  gerarRemessa() {
    this.spinner.show();
    this.lancamentoService.filterRemessa(this.filtro).subscribe(dados => {
      this.spinner.hide();
      this.lancamentos = dados;
      this.listar();
      this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Remessa gerada'});
      this.modalRef.hide();
    });
  }

  nomeArquivo(nome: string) {
    environment.nomeArquivoRemessa = nome;
  }

}
