import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonSlides, ModalController} from '@ionic/angular';
import {MainCategory} from '../../utils/interfaces/main-marketplace/main-category';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss']
})
export class RequestPage implements OnInit {
  @Input() isModal = false;
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  taskRequest: MainMarketplaceTask = {
    description: undefined,
    freelancer_count: 1,
    date: undefined,
    street_address: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    category_id: undefined,
    intensity: undefined,
    price: undefined,
    image_one: undefined,
    image_two: undefined,
    image_three: undefined
  };

  minYear: number = (new Date()).getFullYear();
  maxYear: number = this.minYear + 1;

  editorConfig = {
    placeholder: 'Describe your task here.',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'bulletedList',
      'numberedList',
      'blockQuote'
    ]
  };
  Editor = ClassicEditor;

  categories: MainCategory[] = TASK_CATEGORIES;
  pageTitle = 'Request';
  states: State[] = STATES;
  progress = 0;
  submitted = false;

  constructor(private modalCtrl: ModalController,
              private imagePicker: ImagePicker,
              private camera: Camera,
              private marketplaceService: MarketplaceService) { }

  ngOnInit() {
  }

  private async closeRequestPage(): Promise<boolean> {
    return this.modalCtrl.dismiss();
  }

  searchGetItems($event) {
    return;
  }

  getItems($event) {
    return;
  }

  onSlideChange() {
    this.slides.getActiveIndex()
      .then((index) => {
        switch (index) {
          case 0:
            this.pageTitle = 'Request';
            this.content.scrollToTop(500);
            break;
          case 1:
            this.pageTitle = 'Description';
            this.content.scrollToTop(500);
            break;
          case 2:
            this.pageTitle = 'Time';
            this.content.scrollToTop(500);
            break;
          case 3:
            this.pageTitle = 'Location';
            this.content.scrollToTop(500);
            break;
          case 4:
            this.pageTitle = 'Images';
            this.content.scrollToTop(500);
            break;
          case 5:
            this.pageTitle = 'Difficulty';
            this.content.scrollToTop(500);
            break;
          case 6:
            this.pageTitle = 'Price';
            this.content.scrollToTop(500);
            break;
        }
      });
  }

  selectCategory(category: MainCategory) {
    this.taskRequest.category_id = category.id;
    console.log(category.id);
    setTimeout(() => {
      this.updateProgress();
      this.slides.slideNext();
    }, 500);
  }

  onEditorChange( { editor }: ChangeEvent ) {
    this.taskRequest.description = editor.getData();
    this.updateProgress();
  }

  updateProgress() {
    const progressStatus: number = setProgress([
      this.taskRequest.category_id,
      this.taskRequest.description,
      this.taskRequest.date,
      this.taskRequest.description,
      this.taskRequest.street_address,
      this.taskRequest.city,
      this.taskRequest.state,
      this.taskRequest.zip,
      this.taskRequest.intensity,
      this.taskRequest.price
    ], 0);

    console.log(progressStatus);
    this.progress = progressStatus;
  }

  openPhotoGallery() {
    const options: ImagePickerOptions = {
      quality: 100,
      width: 600,
      height: 600,
      outputType: 1,
      maximumImagesCount: 3
    };

    this.imagePicker.getPictures(options).then((results) => {
      if (results[0]) {
        this.taskRequest.image_one = results[0];
      }

      if (results[1]) {
        this.taskRequest.image_two = results[1];
      }

      if (results[2]) {
        this.taskRequest.image_three = results[2];
      }
    }, (err) => { console.log('Error with Image Picker.'); });
  }

  removeImage(index: number) {
    switch (index) {
      case 0:
        this.taskRequest.image_one = undefined;
        break;
      case 1:
        this.taskRequest.image_two = undefined;
        break;
      case 2:
        this.taskRequest.image_three = undefined;
        break;
    }
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
      console.log('Error something went wrong with camera.');
    });
  }

  onSubmitTaskRequest(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.marketplaceService.createMainMarketplaceRequest(this.taskRequest)
        .then((res) => this.closeRequestPage());
    }
  }

  setDifficulty(intensity: string) {
    this.taskRequest.intensity = intensity;
    this.updateProgress();
  }
}

function setProgress(formFields: any[], progress: number): number {
  const progressRatio: number = (1  / formFields.length);
  progress = formFields.reduce((totalProgress, field) => {
    return totalProgress + ((field) ? progressRatio : 0);
  });
  return progress - (1 - progressRatio);
}
