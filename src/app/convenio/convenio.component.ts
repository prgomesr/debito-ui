import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ErrorHandlerService} from '../core/error-handler.service';
import {ConvenioService} from './convenio.service';
import {Conta, Convenio} from '../core/models/model';
import {ContaService} from '../conta/conta.service';

@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.css']
})
export class ConvenioComponent implements OnInit {
  convenios: Convenio[];
  convenio = new Convenio();
  modalRef: BsModalRef;
  contas = [];

  constructor(private service: ConvenioService,
              private contaService: ContaService,
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
    this.service.list().subscribe(data => {
        this.spinner.hide();
        this.convenios = data;
      },
      error => {
        this.spinner.hide();
        this.errorHandler.handle(error);
      });
  }

  openFormModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarContas();
    if (id) {
      this.readOnly(id);
    } else {
      this.convenio = new Convenio();
    }
  }

  onSubmit(form) {
    if (this.editando) {
      this.update(form);
    } else {
      this.create(form);
    }
  }

  update(form) {
    this.spinner.show();
    this.service.update(this.convenio).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Convênio atualizado'});
        this.listar();
        this.readOnly(this.convenio.id);
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  create(form) {
    this.spinner.show();
    this.service.create(this.convenio).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Convênio cadastrado'});
        form.reset();
        this.listar();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  readOnly(id: number) {
    this.spinner.show();
    this.service.read(id).subscribe(data => {
        this.spinner.hide();
        this.convenio = data;
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  listarContas() {
    this.spinner.show();
    this.contaService.list().subscribe(data => {
        this.spinner.hide();
        this.contas = data
          .map(d => ({label: d.numero, value: d.id}));
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  get editando(): any {
    return Boolean(this.convenio.id);
  }

}
