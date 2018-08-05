import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  readonly AUTHENTICATED = 0;
  readonly NOT_AUTHENTICATED = 1;

}
