import {Component, OnInit, TemplateRef} from '@angular/core';
import {ConvenioService} from '../../convenio/convenio.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {LancamentoService} from '../../lancamento/lancamento.service';
import * as moment from 'moment';

@Component({
  selector: 'app-relatorios-lancamentos',
  templateUrl: './relatorios-lancamentos.component.html',
  styleUrls: ['./relatorios-lancamentos.component.css']
})
export class RelatoriosLancamentosComponent implements OnInit {
  periodoInicio: Date;
  periodoFim: Date;
  convenioId: number;
  nome: string;
  convenios = [];
  modalRef: BsModalRef;

  constructor(private convenioService: ConvenioService,
              private lancamentoService: LancamentoService,
              private spinner: NgxSpinnerService,
              private toasty: MessageService,
              private modalService: BsModalService,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit() {
  }

  private listarConvenios() {
    this.spinner.show();
    this.convenioService.list().subscribe(data => {
        this.convenios = data
          .map(d => ({label: d.numero, value: d.id}));
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.errorHandler.handle(error);
      });
  }

  openLancamentoRecebidoModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarConvenios();
  }

  openLancamentoNaoRecebidoModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarConvenios();
  }

  gerarRelatorioRecebido(f) {
    const inicio = moment(this.periodoInicio).format('DD-MM-YYYY');
    const fim = moment(this.periodoFim).format('DD-MM-YYYY');
    const relatorio = 'REL_RECEBIMENTO_' + inicio + '_' + fim;
    this.spinner.show();
    this.lancamentoService.relatorioRecebidosPorCliente(relatorio, this.periodoInicio, this.periodoFim, this.convenioId).subscribe(() => {
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.errorHandler.handle(error);
      });
  }

  gerarRelatorioNaoRecebido(f) {
    const inicio = moment(this.periodoInicio).format('DD-MM-YYYY');
    const fim = moment(this.periodoFim).format('DD-MM-YYYY');
    const relatorio = 'REL_NAO_RECEBIMENTO_' + inicio + '_' + fim;
    this.spinner.show();
    this.lancamentoService.relatorioNaoRecebidosPorCliente(relatorio, this.periodoInicio, this.periodoFim, this.convenioId)
      .subscribe(() => {
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.errorHandler.handle(error);
        });
  }

}
