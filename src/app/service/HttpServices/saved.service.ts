import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Thread } from './thread.service';

export interface SavedPost {
  SavedPostID? : number ;
  userID: string | null;
  threadID: number;
  thread?: Thread; 
}

@Injectable({
  providedIn: 'root'
})
export class SavedService {
  apiurl: string = environment.apiUrl;
  URL = this.apiurl + 'SavedPost/save'; 
  constructor(private http: HttpClient) {}
 
  savePost(post: SavedPost): Observable<any> {
    return this.http.post<any>(this.URL, post);
  }

  deleteSavedPost(userID: string | null, threadID: number): Observable<any> {
    // Construct the URL to delete the saved post
    const deleteUrl = `${this.apiurl}SavedPost/${userID}/${threadID}`; 
    return this.http.delete<any>(deleteUrl);
  }

  // Method to get saved posts by user ID
  getSavedPostsByUserId(userID: string | null): Observable<SavedPost[]> {
    const savedurl = `${this.apiurl}SavedPost/${userID}`;
    return this.http.get<SavedPost[]>(savedurl);
  }
}
