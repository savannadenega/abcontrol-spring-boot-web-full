import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Material } from './material';
import { HOST } from './app.component';

import { MessageService } from './message.service';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  base_url = HOST + '/material';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getMaterials(itemsPerPage: number, page: number) : Observable<Material[]> {

    let params = new HttpParams()
                .set("itemsPerPage", itemsPerPage.toString())
                .set("page", page.toString());
              
    return this.http.get<Material[]>(this.base_url, {params: params})
      .pipe(
        tap(materials => {
          console.log('Fetched materials');
          console.log(materials);
          this.messageService.add("Success","Fetched materials");
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('An error occurred', err.error.message);
          } else {
            this.messageService.add(`List Materials: ${err.status} error`,
                                  `The server returned a ${err.status} error while listing materials.`);
          }
          console.log(err);
        } ),
   //     catchError(this.handleError('getMaterials', []))
      );
  }

  updateMaterial(material : Material) {
    return this.http.put<any>(this.base_url, material)
      .pipe(
        tap(categories => {
          this.messageService.add("Success!", "Updated Material " + material.id);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('An error occurred', err.error.message);
          } else {
            this.messageService.add(`Update material: ${err.status} error`,
                                  `The server returned a ${err.status} error while updating material.`);
          }
          console.log(err);
        } ),
      //  catchError(this.handleError('updateMaterial', []))
      )
      ;
  }

  saveMaterial (material : Material) {
    return this.http.post<Material>(this.base_url, material)
      .pipe(
        tap(material => {
          this.messageService.add("Success!", "Created Material " + material.id);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('An error occurred', err.error.message);
          } else {
            this.messageService.add(`Create material: ${err.status} error`,
                                  `The server returned a ${err.status} error while creating the material.`);
          }
          console.log(err);
        } ),
       // catchError(this.handleError('saveMaterial', []))
      );
  }

  deleteMaterial(material : Material) {
    let params = new HttpParams()
                  .set("id", material.id.toString());

    return this.http.delete<any>(this.base_url, {params : params})
      .pipe(
        tap( status => {
          this.messageService.add("Success!", "Deleted Material " + material.id);
        }, err => {
          if (err.error instanceof Error) {
            this.messageService.add('An error occurred', err.error.message);
          } else {
            this.messageService.add(`Delete Material: ${err.status} error`,
                                  `The server returned a ${err.status} error while deleting the material.`);
          }
          console.log(err);
        }),
       // catchError(this.handleError('deleteMaterial', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      console.error(operation);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.messageService.add("Error during " + operation, error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
