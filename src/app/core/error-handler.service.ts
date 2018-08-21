import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: MessageService) {
  }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof Response
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;

      try {
        errors = errorResponse;

        msg = errors.error[0].mensagemUsuario;
      } catch (e) {
      }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = errorResponse.error[0].mensagemUsuario;
      if (msg == null ) {
        msg = 'Tente novamente ou entre em contato com o administrador do sistema';
      }
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.add({severity: 'error', summary: 'Erro!', detail: msg, life: 7000});
  }

}
