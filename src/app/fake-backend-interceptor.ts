import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { TEST_MATERIALS, Material } from './material';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    materialId : number = 100;
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered materials
        let materials: Material[] = JSON.parse(localStorage.getItem('materials'));
        if (materials == undefined) materials = TEST_MATERIALS;
 
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
 
            if (request.url.endsWith('/materials')) {
                if (request.method == 'GET') {
                    return of(new HttpResponse({status: 200, body: materials}));
                } else if (request.method == 'POST') {
                    let m = <Material> request.body;
                    this.materialId++;
                    m.id = this.materialId.toString();
                    materials.push(m);
                    localStorage.setItem('materials', JSON.stringify(materials));
                    return of(new HttpResponse({status: 201, body: m}));
                } else if (request.method == 'PUT') {
                    let m = <Material> request.body;
                    for (let i = 0; i < materials.length; i++) {
                        if (materials[i].id == m.id) {
                            materials[i] = m;
                        }
                    }
                    localStorage.setItem('materials', JSON.stringify(materials));
                    return of(new HttpResponse({status: 204}));
                } else if (request.method == 'DELETE') {
                    let id = request.params.get("id");
                    let found = false;
                    for (let i = 0; i < materials.length; i++) {
                        if (materials[i].id == id) {
                            materials.splice(i, 1);
                            found = true;
                        }
                    }
                    if (found)
                        return of(new HttpResponse({status: 200}));
                    else 
                        return of(new HttpResponse({status: 404}));
                } 
            } 
             
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};