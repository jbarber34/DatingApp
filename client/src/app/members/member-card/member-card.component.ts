import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;
  @Input() liked: boolean = true;

  constructor(
    private membersService: MembersService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  likeToggle(member: Member, liked: boolean) {
    if (liked == true) {
      this.membersService.likeToggle(member.userName).subscribe({
        next: () => this.toaster.success('You have liked ' + member.knownAs),
      });
      this.liked = !this.liked;
    }
    if (liked != true) {
      this.membersService.likeToggle(member.userName).subscribe({
        next: () => this.toaster.success('You have unliked ' + member.knownAs),
      });
      this.liked = true;
      setTimeout(() => location.reload(), 2000);
    }
  }
}
