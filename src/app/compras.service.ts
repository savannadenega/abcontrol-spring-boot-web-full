import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Compra } from './compra';
import { HOST } from './app.component';

import { MessageService } from './message.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  base_url = HOST + '/compra';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getCompras(itemsPerPage: number, page: number) : Observable<Compra[]> {

    let params = new HttpParams()
                .set("itemsPerPage", itemsPerPage.toString())
                .set("page", page.toString());
              
    return this.http.get<Compra[]>(this.base_url, {params: params})
      .pipe(
        tap(materials => {
          this.messageService.add("Successo", "Obteve lista de compras");
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Listar compras: erro ${err.status}`,
                                  `O servidor retornou status ${err.status} listando as compras.`);
          }
        } )
      );
  }

  getCompra (id :number) : Observable<Compra> {
    let params = new HttpParams()
      .set("id", id.toString());
    
    return this.http.get<Compra>(this.base_url + "/" + id.toString()) //, {params: params})
      .pipe(
        tap(compras => {
          this.messageService.add("Successo", `Obteve compra ${id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Obter compra: erro ${err.status}`,
                                  `O servidor retornou status ${err.status} obtendo detalhes da compra.`);
          }
        } )
      );
  }

  update(compra : Compra) {
    return this.http.put<any>(this.base_url, compra)
      .pipe(
        tap(categories => {
          this.messageService.add("Successo!", `Atualizou compra ${compra.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Atualizar compra: ${err.status} error`,
                                  `O servidor retornou status ${err.status} atualizando a compra.`);
          }
        } )
      )
      ;
  }

  save(compra : Compra) {
    return this.http.post<Compra>(this.base_url, compra)
      .pipe(
        tap(forma_pg => {
          this.messageService.add("Successo!", `Criou compra ${compra.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Criar Compra: ${err.status} error`,
                                  `O servidor retornou status ${err.status} criando a compra.`);
          }
          console.log(err);
        } )
      );
  }

  delete(compra : Compra) {
    let params = new HttpParams()
                  .set("id", compra.id.toString());

    return this.http.delete<any>(this.base_url, {params : params})
      .pipe(
        tap( status => {
          this.messageService.add("Successo!", `Deletou compra ${compra.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Deletar Compra: ${err.status} error`,
                                  `O servidor retornou status ${err.status} ao deletar a compra.`);
          }
        })
      );
  }

  sendEmail(compra : Compra) {
    let params = new HttpParams()
                  .set("id", compra.id.toString());

    return this.http.post<any>(this.base_url + '/enviarEmailCompra/' + compra.id, undefined)
      .pipe(
        tap(result => {
          this.messageService.add("Successo!", `Enviou email para ${compra.emailFornecedor}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Enviar e-mail: ${err.status} error`,
                                  `O servidor retornou status ${err.status} ao enviar e-mail para o fornecedor.`);
          }
          console.log(err);
        } )
      );
  }
}
