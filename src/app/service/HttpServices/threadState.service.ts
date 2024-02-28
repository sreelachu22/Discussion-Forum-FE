import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostStateService {
  private showRepliesMap: Map<number, boolean> = new Map<number, boolean>();

  toggleReplies(postId: number): void {
    const currentState = this.showRepliesMap.get(postId) || false;
    this.showRepliesMap.set(postId, !currentState);
  }

  getShowReplies(postId: number): boolean {
    return this.showRepliesMap.get(postId) || false;
  }
}
