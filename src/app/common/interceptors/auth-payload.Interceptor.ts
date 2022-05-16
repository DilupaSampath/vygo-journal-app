
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestMethodEnum } from '../enums/request-method.model';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Injectable({
    providedIn: 'root'
  })
export class AuthPayloaInterceptor implements HttpInterceptor {

    constructor(private firebaseAuthService: FirebaseAuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        console.log("AuthPayloaInterceptor hit");
        const authata = this.firebaseAuthService.getAuthata();
        const pureJsonObject = JSON.parse(JSON.stringify(authata));
        const isPost = request.method === RequestMethodEnum.POST;
        if (isPost) {
            request = request.clone({
                body: request.body.append('author', pureJsonObject)
            });
        }
        return next.handle(request);
    }
}