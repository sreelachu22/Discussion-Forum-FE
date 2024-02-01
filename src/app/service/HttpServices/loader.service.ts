import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//This service manage the state of a loader or loading spinner in your application.
//It uses RxJS BehaviorSubject to provide an observable stream of loading state changes.
export class LoaderService {
  //holds a boolean value. The initial value is set to false,
  //indicating that the loader is initially not displayed.
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  //This public property isLoading$ is an observable
  //that other parts of the application can subscribe to
  //in order to receive updates on the loading state.
  public isLoading$ = this.isLoadingSubject.asObservable();

  // used to set the isLoadingSubject to true,
  //indicating that the loader should be displayed.
  show() {
    this.isLoadingSubject.next(true);
  }

  //used to set the isLoadingSubject to false,
  //indicating that the loader should be hidden.
  hide() {
    this.isLoadingSubject.next(false);
  }
}
