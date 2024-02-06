import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/HttpServices/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  //This method is part of the HttpInterceptor interface and is invoked for every HTTP request.
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    //The next.handle(request) sends the HTTP request down the chain,
    //and the pipe method allows for additional operations.
    //
    //The finalize operator is used to execute the code within it,
    //when the observable completes, whether successfully or with an error.
    //In this case, it hides the loader using the hide method from the LoaderService.
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
