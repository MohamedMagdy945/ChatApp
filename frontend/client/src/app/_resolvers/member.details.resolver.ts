import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Member } from '../_models/member';
import { Injectable } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberDetailedResover implements Resolve<Member> {
  constructor(private memberService: MembersService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    console.log(route);
    return this.memberService.getMember(route.paramMap.get('username'));
  }
}
