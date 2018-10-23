import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Material } from './material';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  base_url = '/materials';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getMaterials(itemsPerPage: number, page: number) : Observable<Material[]> {

    let params = new HttpParams()
                .set("itemsPerPage", itemsPerPage.toString())
                .set("page", page.toString());
              
    return this.http.get<Material[]>(this.base_url, {params: params})
      .pipe(
        tap(categories => {
          console.log('Fetched materials');
          this.messageService.add("test","fetched materials")
        } ),
        catchError(this.handleError('getMaterials', []))
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
