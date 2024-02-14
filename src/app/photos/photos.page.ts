import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Picture } from '../interfaces/picture';
import { PhotoService } from '../service/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  public photos: Picture[] = [];
  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.photos = this.photoService.photos;
  }

  takePhoto() {
    this.photoService.addNewPhoto();
  }
}
