import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }


  NavigateToArtist() {
    this.router.navigate(['artist/5']);
  }

  async ngOnInit() {
    await this.userService.getUser()
    await console.log(this.userService.user);
  }

}
