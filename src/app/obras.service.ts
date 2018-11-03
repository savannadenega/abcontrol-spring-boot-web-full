import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Obra } from './obra';
import { HOST } from './app.component';

import { MessageService } from './message.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

  base_url = HOST + '/obra';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getObras(itemsPerPage: number, page: number) : Observable<Obra[]> {

    let params = new HttpParams()
                .set("itemsPerPage", itemsPerPage.toString())
                .set("page", page.toString());
              
    return this.http.get<Obra[]>(this.base_url, {params: params})
      .pipe(
        tap(materials => {
          this.messageService.add("Successo", "Obteve lista de obras");
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Listar obras: erro ${err.status}`,
                                  `O servidor retornou status ${err.status} listando as formas de pagamento.`);
          }
        } )
      );
  }

  update(obra : Obra) {
    return this.http.put<any>(this.base_url, obra)
      .pipe(
        tap(categories => {
          this.messageService.add("Successo!", `Atualizou obra ${obra.idObra}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Atualizar obra: ${err.status} error`,
                                  `O servidor retornou status ${err.status} atualizando a obra.`);
          }
        } )
      )
      ;
  }

  save(obra : Obra) {
    return this.http.post<Obra>(this.base_url, obra)
      .pipe(
        tap(forma_pg => {
          this.messageService.add("Successo!", `Criou obra ${obra.idObra}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Criar Obra: ${err.status} error`,
                                  `O servidor retornou status ${err.status} criando a obra.`);
          }
          console.log(err);
        } )
      );
  }

  delete(obra : Obra) {
    let params = new HttpParams()
                  .set("id", obra.idObra.toString());

    return this.http.delete<any>(this.base_url, {params : params})
      .pipe(
        tap( status => {
          this.messageService.add("Successo!", `Deletou obra ${obra.idObra}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Deletar Obra: ${err.status} error`,
                                  `O servidor retornou status ${err.status} ao deletar a obra.`);
          }
        })
      );
  }
}
