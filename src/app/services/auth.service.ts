import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = "";
  usercd: string = "";
  lang: string = "";

  constructor() { }
}
