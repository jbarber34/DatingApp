import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;
  @Input() predicate: string = 'liked';

  constructor(
    private memberService: MemberService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  likeToggle(member: Member, predicate: string) {
    if (this.predicate == 'liked') {
      this.predicate = 'unlike';
      this.memberService.likeToggle(member.userName, predicate).subscribe({
        next: () => this.toaster.success('You have liked ' + member.knownAs),
      });
    } else {
      this.predicate = 'like';
      this.memberService.likeToggle(member.userName, predicate).subscribe({
        next: () => this.toaster.success('You have unliked ' + member.knownAs),
      });
    }
  }
}
