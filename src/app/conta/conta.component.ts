import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ContaService} from './conta.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {ErrorHandlerService} from '../core/error-handler.service';
import {Conta} from '../core/models/model';
import {EmpresaService} from '../empresa/empresa.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  modalRef: BsModalRef;
  contas: Conta[];
  conta = new Conta();
  empresas = [];
  bancos = [
    {label: 'Banco do Brasil', value: 'BANCO_DO_BRASIL'},
    {label: 'Santander', value: 'SANTANDER'}
  ];

  constructor(private service: ContaService,
              private empresaService: EmpresaService,
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
        this.contas = data;
      },
      error => {
        this.spinner.hide();
        this.errorHandler.handle(error);
      });
  }

  openFormModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-devllop'});
    this.listarEmpresas();
    if (id) {
      this.readOnly(id);
    } else {
      this.conta = new Conta();
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
    this.service.update(this.conta).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Conta atualizada'});
        this.listar();
        this.readOnly(this.conta.id);
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  create(form) {
    this.spinner.show();
    this.service.create(this.conta).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Conta cadastrada'});
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
        this.conta = data;
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  listarEmpresas() {
    this.spinner.show();
    this.empresaService.list().subscribe(data => {
        this.spinner.hide();
        this.empresas = data
          .map(d => ({label: d.nome, value: d.id}));
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  get editando(): any {
    return Boolean(this.conta.id);
  }

}
