import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenHandler } from 'src/app/util/tokenHandler';
import { environment } from 'src/app/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

export interface Score {
  threadCreated: number;
  threadUpdated: number;
  threadDeleted: number;
  threadUpvotedBy: number;
  threadUpvotedOn: number;
  threadDownvotedBy: number;
  threadDownvotedOn: number;
  removeThreadUpvoteBy: number;
  removeThreadUpvoteOn: number;
  removeThreadDownvoteBy: number;
  removeThreadDownvoteOn: number;
  replyCreated: number;
  replyUpdated: number;
  replyDeleted: number;
  replyUpvotedBy: number;
  replyUpvotedOn: number;
  replyDownvotedBy: number;
  replyDownvotedOn: number;
  removeReplyUpvoteBy: number;
  removeReplyUpvoteOn: number;
  removeReplyDownvoteBy: number;
  removeReplyDownvoteOn: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  apiurl: string = environment.apiUrl;
}
