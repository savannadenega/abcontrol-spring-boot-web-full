import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormaPagamento } from './forma-pagamento';
import { HOST } from './app.component';

import { MessageService } from './message.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FormasPagamentoService {

  base_url = HOST + '/formaPagamento';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFormasPagamento(itemsPerPage: number, page: number) : Observable<FormaPagamento[]> {

    let params = new HttpParams()
                .set("itemsPerPage", itemsPerPage.toString())
                .set("page", page.toString());
              
    return this.http.get<FormaPagamento[]>(this.base_url, {params: params})
      .pipe(
        tap(materials => {
          this.messageService.add("Successo", "Obteve lista de formas de pagamento");
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Listar Formas de Pagamento: ${err.status} error`,
                                  `O servidor retornou status ${err.status} listando as formas de pagamento.`);
          }
        } ),
   //     catchError(this.handleError('getMaterials', []))
      );
  }

  updateFormaPagamento(forma_pg : FormaPagamento) {
    return this.http.put<any>(this.base_url, forma_pg)
      .pipe(
        tap(categories => {
          this.messageService.add("Successo!", `Atualizou forma de pagamento ${forma_pg.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Atualizar Forma de Pagamento: ${err.status} error`,
                                  `O servidor retornou status ${err.status} atualizando a forma de pagamento.`);
          }
        } ),
      //  catchError(this.handleError('updateMaterial', []))
      )
      ;
  }

  saveFormaPagamento (forma_pg : FormaPagamento) {
    return this.http.post<FormaPagamento>(this.base_url, forma_pg)
      .pipe(
        tap(forma_pg => {
          this.messageService.add("Successo!", `Criou forma de pagamento ${forma_pg.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Criar Forma de Pagamento: ${err.status} error`,
                                  `O servidor retornou status ${err.status} criando a forma de pagamento.`);
          }
          console.log(err);
        } ),
      //  catchError(this.handleError('saveMaterial', []))
      );
  }

  deleteFormaPagamento(forma_pg : FormaPagamento) {
    //let params = new HttpParams()
    //              .set("id", forma_pg.id.toString());

    return this.http.delete<any>(this.base_url + `/${forma_pg.id}`)
      .pipe(
        tap( status => {
          this.messageService.add("Successo!", `Deletou forma de pagamento ${forma_pg.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Deletar Forma de Pagamento: ${err.status} error`,
                                  `O servidor retornou status ${err.status} ao deletar a forma de pagamento.`);
          }
        }),
     //   catchError(this.handleError('deleteMaterial', []))
      );
  }
}
