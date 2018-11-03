import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { TEST_MATERIALS, Material } from './material';
import { FormaPagamento, TEST_FORMAS_PG } from './forma-pagamento';
import { Obra, TEST_OBRAS } from './obra';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered materials
        
        let st_materialId : string = JSON.parse(localStorage.getItem('materialId'));
        let st_formasId: string = JSON.parse(localStorage.getItem('formaId'));
        let st_obraId : string = JSON.parse(localStorage.getItem('obraId'));
        
        let materialId, formasId, obraId : number;
        if (st_materialId == undefined) {
            materialId = 110;
        } else {
            materialId = parseInt(st_materialId);
        } 
           
        if (st_formasId == undefined) {
            formasId = 110;
        } else { 
            formasId = parseInt(st_formasId);
        }

        if (st_obraId == undefined) {
            obraId = 110;
        } else { 
            obraId = parseInt(st_obraId);
        }
 
        let materials: Material[] = JSON.parse(localStorage.getItem('materials'));
        if (materials == undefined) materials = TEST_MATERIALS;

        let formas_pg: FormaPagamento[] = JSON.parse(localStorage.getItem('formas_pg'));
        if (formas_pg == undefined) formas_pg = TEST_FORMAS_PG;

        let obras: Obra[] = JSON.parse(localStorage.getItem('obras'));
        if (obras == undefined) obras = TEST_OBRAS;


        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            
            if (request.url.endsWith('/material')) {
                if (request.method == 'GET') {
                    return of(new HttpResponse({status: 200, body: materials}));
                } else if (request.method == 'POST') {
                    let m = <Material> request.body;
                    materialId++;
                    m.id = materialId;
                    materials.push(m);
                    localStorage.setItem('materials', JSON.stringify(materials));
                    localStorage.setItem('materialId', materialId.toString());
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
                    let id = parseInt(request.params.get("id"));
                    let found = false;
                    for (let i = 0; i < materials.length; i++) {
                        if (materials[i].id == id) {
                            materials.splice(i, 1);
                            found = true;
                        }
                    }
                    localStorage.setItem('materials', JSON.stringify(materials));
                    if (found)
                        return of(new HttpResponse({status: 200}));
                    else 
                        return of(new HttpResponse({status: 404}));
                } 
            } 
            if (request.url.endsWith('/formapagamento')) {
                if (request.method == 'GET') {
                    return of(new HttpResponse({status: 200, body: formas_pg}));
                } else if (request.method == 'POST') {
                    let f = <FormaPagamento> request.body;
                    formasId++;
                    f.id = formasId;
                    formas_pg.push(f);
                    localStorage.setItem('formas_pg', JSON.stringify(formas_pg));
                    localStorage.setItem('formaId', formasId.toString());
                    return of(new HttpResponse({status: 201, body: f}));
                } else if (request.method == 'PUT') {
                    let f = <FormaPagamento> request.body;
                    for (let i = 0; i < formas_pg.length; i++) {
                        if (formas_pg[i].id == f.id) {
                            formas_pg[i] = f;
                        }
                    }
                    localStorage.setItem('formas_pg', JSON.stringify(formas_pg));
                    return of(new HttpResponse({status: 204}));
                } else if (request.method == 'DELETE') {
                    let id = parseInt(request.params.get("id"));
                    let found = false;
                    for (let i = 0; i < formas_pg.length; i++) {
                        if (formas_pg[i].id == id) {
                            formas_pg.splice(i, 1);
                            found = true;
                        }
                    }
                    localStorage.setItem('formas_pg', JSON.stringify(formas_pg));
                    if (found)
                        return of(new HttpResponse({status: 200}));
                    else 
                        return of(new HttpResponse({status: 404}));
                } 
            }

            if (request.url.endsWith('/obra')) {
                if (request.method == 'GET') {
                    return of(new HttpResponse({status: 200, body: obras}));
                } else if (request.method == 'POST') {
                    let o = <Obra> request.body;
                    obraId++;
                    o.idObra = obraId;
                    obras.push(o);
                    localStorage.setItem('obras', JSON.stringify(obras));
                    localStorage.setItem('obraId', obraId.toString());
                    return of(new HttpResponse({status: 201, body: o}));
                } else if (request.method == 'PUT') {
                    let o = <Obra> request.body;
                    for (let i = 0; i < obras.length; i++) {
                        if (obras[i].idObra == o.idObra) {
                            obras[i] = o;
                        }
                    }
                    localStorage.setItem('obras', JSON.stringify(obras));
                    return of(new HttpResponse({status: 204}));
                } else if (request.method == 'DELETE') {
                    let id = parseInt(request.params.get("id"));
                    let found = false;
                    for (let i = 0; i < obras.length; i++) {
                        if (obras[i].idObra == id) {
                            obras.splice(i, 1);
                            found = true;
                        }
                    }
                    localStorage.setItem('obras', JSON.stringify(obras));
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