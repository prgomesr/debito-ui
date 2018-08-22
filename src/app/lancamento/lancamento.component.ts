import {Component, OnInit, TemplateRef} from '@angular/core';
import {LancamentoService} from './lancamento.service';
import {Filtro, Lancamento} from '../core/models/model';
import {ClienteService} from '../cliente/cliente.service';
import {ConvenioService} from '../convenio/convenio.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LazyLoadEvent, MessageService} from 'primeng/api';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ErrorHandlerService} from '../core/error-handler.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  lancamentos = [];
  lancamentosFiltro = [];
  lancamento = new Lancamento();
  convenios = [];
  conveniosFiltros = [];
  clientes = [];
  valor = true;
  filtro = new Filtro();
  modalRef: BsModalRef;
  vencimento: Date;
  totalRegistros = 0;

  constructor(private service: LancamentoService,
              private convenioService: ConvenioService,
              private clienteService: ClienteService,
              private spinner: NgxSpinnerService,
              private toasty: MessageService,
              private modalService: BsModalService,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
  }

  private listarClientes() {
    this.spinner.show();
    this.clienteService.list().subscribe(dados => {
        this.clientes = dados
          .map(d => ({label: d.nome, value: d.id}));
        this.spinner.hide();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  listarComPaginacao(pagina = 0) {
    this.filtro.pagina = pagina;
    this.spinner.show();
    this.service.filterComPaginacao(this.filtro).subscribe(data => {
        this.spinner.hide();
        this.lancamentos = data.registros;
        this.totalRegistros = data.total;
      },
      error => {
        this.spinner.hide();
        this.errorHandler.handle(error);
      });
  }

  private listarConvenios() {
    this.convenioService.list().subscribe(dados => this.convenios = dados
        .map(d => ({label: d.numero, value: d.id})),
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  private listarConveniosFiltro() {
    this.convenioService.list().subscribe(dados => this.conveniosFiltros = dados
        .map(d => ({label: d.numero, value: d})),
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  public listar() {
    this.spinner.show();
    this.service.filter(this.filtro).subscribe(dados => {
        this.lancamentosFiltro = dados;
        this.valor = false;
        this.spinner.hide();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  openFormModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarConvenios();
    this.listarClientes();
    if (id) {
      this.listarPorId(id);
    } else {
      this.lancamento = new Lancamento();
    }
  }

  onSubmit(f) {
    if (this.editando) {
      this.update(f);
    } else {
      this.save(f);
    }
  }

  private update(f: any) {
    this.spinner.show();
    this.service.update(this.lancamento).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Lançamento atualizado'});
        this.listarPorId(this.lancamento.id);
        this.listarComPaginacao();
      },
      error => {
        this.spinner.hide();
        this.errorHandler.handle(error);
      });
  }

  private save(f) {
    this.spinner.show();
    this.service.create(this.lancamento).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Lançamento salvo'});
        f.reset();
        this.listarComPaginacao();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  private listarPorId(id: number) {
    this.spinner.show();
    this.service.read(id).subscribe(dado => {
        this.lancamento = dado;
        this.spinner.hide();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  openSearchModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarConveniosFiltro();
  }

  openLancamentoPorLote(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.filtro = new Filtro();
    this.listarConveniosFiltro();
  }

  gerarPorLote(f) {
    this.spinner.show();
    this.service.lancamentoPorLote(this.filtro, this.vencimento).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Lançamento (s) gerado (s)'});
        this.filtro = new Filtro();
        setTimeout(() => {
          this.modalRef.hide();
          this.listarComPaginacao();
        }, 100);
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.listarComPaginacao(pagina);
  }

  limparFiltro() {
    this.filtro = new Filtro();
    this.lancamentosFiltro = [];
    this.valor = true;
  }

  get editando(): any {
    return Boolean(this.lancamento.id);
  }

}
