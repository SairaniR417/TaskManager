import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: any;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    // const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   this.http.get('http://localhost:5000/profile', { headers }).subscribe(
  //     (response) => {
  //       this.profile = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching profile', error);
  //     }
  //   );
  // }
}
}