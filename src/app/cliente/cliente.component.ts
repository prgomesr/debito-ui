import {Component, OnInit, TemplateRef} from '@angular/core';
import {ClienteService} from './cliente.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ErrorHandlerService} from '../core/error-handler.service';
import {Cliente} from '../core/models/model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];
  cliente = new Cliente();
  modalRef: BsModalRef;
  bancos = [
    {label: 'Banco do Brasil', value: 'BANCO_DO_BRASIL'},
    {label: 'Santander', value: 'SANTANDER'}
  ];

  constructor(private service: ClienteService,
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
        this.spinner.hide();
        this.clientes = dados;
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  openFormModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    if (id) {
      this.readOnly(id);
    } else {
      this.cliente = new Cliente();
    }
  }

  atualizarAtivo(id: number, valor: boolean) {
    this.spinner.show();
    this.service.updateStatus(id, valor).subscribe(() => {
        this.spinner.hide();
        this.listar();
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
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
    this.service.update(this.cliente).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Cliente atualizado'});
        this.listar();
        this.readOnly(this.cliente.id);
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  create(form) {
    this.spinner.show();
    this.service.create(this.cliente).subscribe(() => {
        this.spinner.hide();
        this.toasty.add({severity: 'success', summary: 'Sucesso!', detail: 'Cliente cadastrado'});
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
        this.cliente = data;
      },
      error => {
        this.errorHandler.handle(error);
        this.spinner.hide();
      });
  }

  get editando(): any {
    return Boolean(this.cliente.id);
  }

}
