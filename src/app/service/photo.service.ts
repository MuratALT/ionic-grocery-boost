import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Picture } from '../interfaces/picture';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Picture[] = [];
  constructor() {}

  async addNewPhoto() {
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.photos.unshift({
      filepath: '',
      webviewPath: capture.webPath,
    });
  }
}
