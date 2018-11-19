import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { TEST_MATERIALS, Material } from './material';
import { FormaPagamento, TEST_FORMAS_PG } from './forma-pagamento';
import { Obra, TEST_OBRAS } from './obra';
import { Compra, TEST_COMPRAS } from './compra';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        /*
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
        */

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            
            console.log("Trying to find fake backend endpoint for " + request.url);
            let returnValue : Observable<HttpEvent<any>>;
            
            returnValue = handleCrudRequest<Material>(request, "/material", "material", TEST_MATERIALS);
            if (returnValue != null) return returnValue;
            
            returnValue = handleCrudRequest<FormaPagamento>(request, "/formapagamento", "forma_pg", TEST_FORMAS_PG);
            if (returnValue != null) return returnValue;
            
            returnValue = handleCrudRequest<Obra>(request, "/obra", "obra", TEST_OBRAS);
            if (returnValue != null) return returnValue;
            

            
            let regex = new RegExp('/compra/enviarEmailCompra/' + "\/[0-9]+");
            if (request.url.match(regex)){
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                console.log('Send Email by id' + request.url);
                return of(new HttpResponse({status: 200}));
            }
            returnValue = handleCrudRequest<Compra>(request, "/compra", "compra", TEST_COMPRAS);
            if (returnValue != null) return returnValue;
            

            console.log("Not able to find endpoint");
            // pass through any requests not handled above
            return next.handle(request);
             
        }))
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

function handleCrudRequest<T>(request: HttpRequest<any>, endpoint : string, objName : string, TEST_OBJS : T[]) : Observable<HttpEvent<any>> {
    let idStorageName = objName + "id", objsStorageName = objName + "s";
    let st_id : string = JSON.parse(localStorage.getItem(idStorageName));
    let idRef;
    if (st_id == undefined) {
        idRef = 110;
    } else {
        idRef = parseInt(st_id);
    } 

    let objs : T[] = JSON.parse(localStorage.getItem(objsStorageName));
    if (objs == undefined) objs = TEST_OBJS;

    if (request.url.startsWith(endpoint)) {
        if (request.method == 'GET') {
            let regex = new RegExp(endpoint + "\/[0-9]+");
            if (request.url.match(regex)){
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                console.log('GET by id' + request.url);
                for (let i = 0; i < objs.length; i++) {
                    if (objs[i]['id'] == id) {
                        return of(new HttpResponse({status: 200, body: objs[i]}));
                    }
                }
            } else {
                return of(new HttpResponse({status: 200, body: objs}));
            }
        } else if (request.method == 'POST') {
            let o = <T> request.body;
            idRef++;
            o['id'] = idRef;
            objs.push(o);
            localStorage.setItem(objsStorageName, JSON.stringify(objs));
            localStorage.setItem(idStorageName, idRef.toString());
            return of(new HttpResponse({status: 201, body: o}));
        } else if (request.method == 'PUT') {
            let o = <T> request.body;
            for (let i = 0; i < objs.length; i++) {
                if (objs[i]['id'] == o['id']) {
                    objs[i] = o;
                }
            }
            localStorage.setItem(objsStorageName, JSON.stringify(objs));
            return of(new HttpResponse({status: 204}));
        } else if (request.method == 'DELETE') {
            let id = parseInt(request.params.get("id"));
            let found = false;
            for (let i = 0; i < objs.length; i++) {
                if (objs[i]['id'] == id) {
                    objs.splice(i, 1);
                    found = true;
                }
            }
            localStorage.setItem(objsStorageName, JSON.stringify(objs));
            if (found)
                return of(new HttpResponse({status: 200}));
            else 
                return of(new HttpResponse({status: 404}));
        }
    }
    return null;
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};