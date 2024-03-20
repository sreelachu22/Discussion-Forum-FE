import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/app/environments/environment';
import { SingleUser } from 'src/app/features/community_head/user-edit/user-edit.component';
import { CommunityDataService } from 'src/app/service/DataServices/community-data.service';
import { AccountsService } from 'src/app/service/HttpServices/account.service';
import { BadgeService } from 'src/app/service/HttpServices/badge.service';
import { TokenHandler } from 'src/app/util/tokenHandler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css'],
})
export class ProfilePopupComponent {
  constructor(
    private router: Router,
    private tokenHandler: TokenHandler,
    private authService: MsalService,
    private accountService: AccountsService,
    private badgeService: BadgeService,
    private communityDataService: CommunityDataService
  ) {}
  @Input() user!: SingleUser;
  communityID: number = 0;

  ngOnInit() {
    this.communityDataService.communityID$.subscribe((id) => {
      this.communityID = id;
    });
    this.badgeService
      .getBadgeScoreRanges(this.communityID)
      .subscribe((scoreRanges) => {
        this.badgeService.setBadgeScoreRanges(scoreRanges);
      });
  }

  getBadge(score: number): string {
    return this.badgeService.getBadgeByScore(score);
  }

  userId!: string | null;
  async handleLogOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        this.userId = sessionStorage.getItem('userID');
        // this.userId = 'A889A62C-CC6F-4362-927E-17207875BA25'
        if (this.userId) {
          try {
            this.accountService.logoutBackend(this.userId).subscribe(
              () => {
                this.authService.logoutRedirect({
                  postLogoutRedirectUri: environment.postLogoutRedirectUri,
                });
                this.tokenHandler.removeToken();
                sessionStorage.clear();
                this.router.navigateByUrl('/logout');
              },
              (error) => {
                console.error('Logout failed:', error);
              }
            );
          } catch (error) {
            console.error('An error occurred:', error);
          }
        } else {
          console.error('User ID not found in sessionStorage');
        }
      }
    });
  }
}
