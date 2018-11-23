import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Projeto } from './projeto';
import { HOST } from './app.component';

import { MessageService } from './message.service';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  base_url = HOST + '/projeto';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProjetos(itemsPerPage: number, page: number) : Observable<Projeto[]> {

    let params = new HttpParams()
                .set("itemsPerPage", itemsPerPage.toString())
                .set("page", page.toString());
              
    return this.http.get<Projeto[]>(this.base_url, {params: params})
      .pipe(
        tap(projetos => {
          this.messageService.add("Successo", "Obteve lista de projetos");
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Listar projetos: erro ${err.status}`,
                                  `O servidor retornou status ${err.status} listando as projetos.`);
          }
        } )
      );
  }

  getProjeto (id :number) : Observable<Projeto> {
    let params = new HttpParams()
      .set("id", id.toString());
    
    return this.http.get<Projeto>(this.base_url + "/" + id.toString()) //, {params: params})
      .pipe(
        tap(projetos => {
          this.messageService.add("Successo", `Obteve projeto ${id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Obter projeto: erro ${err.status}`,
                                  `O servidor retornou status ${err.status} obtendo detalhes da projeto.`);
          }
        } )
      );
  }

  update(projeto : Projeto) {
    return this.http.put<any>(this.base_url, projeto)
      .pipe(
        tap(categories => {
          this.messageService.add("Successo!", `Atualizou projeto ${projeto.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Atualizar projeto: ${err.status} error`,
                                  `O servidor retornou status ${err.status} atualizando a projeto.`);
          }
        } )
      )
      ;
  }

  save(projeto : Projeto) {
    return this.http.post<Projeto>(this.base_url, projeto)
      .pipe(
        tap(forma_pg => {
          this.messageService.add("Successo!", `Criou projeto ${projeto.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Criar Projeto: ${err.status} error`,
                                  `O servidor retornou status ${err.status} criando a projeto.`);
          }
          console.log(err);
        } )
      );
  }

  delete(projeto : Projeto) {
    let params = new HttpParams()
                  .set("id", projeto.id.toString());

    return this.http.delete<any>(this.base_url, {params : params})
      .pipe(
        tap( status => {
          this.messageService.add("Successo!", `Deletou projeto ${projeto.id}`);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('Ocorreu um erro', err.error.message);
          } else {
            this.messageService.add(`Deletar Projeto: ${err.status} error`,
                                  `O servidor retornou status ${err.status} ao deletar a projeto.`);
          }
        })
      );
  }
}
