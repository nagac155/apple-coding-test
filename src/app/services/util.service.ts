import { Injectable } from '@angular/core';
import { IUser } from '../pages/users/users.component';
import { IDevice } from '../pages/devices/devices.component';

@Injectable({
  providedIn: 'root',
})

export class UtilService {
    data = [];

    getUsers(): Array<IUser> {
        return JSON.parse(localStorage.getItem('users'));
      }

      setUser(data) {
        localStorage.setItem('users', data);
      }

      getDevices(): Array<IDevice> {
        return JSON.parse(localStorage.getItem('devices'));
      }

      setDevice(data) {
        localStorage.setItem('devices', data);
      }
}
