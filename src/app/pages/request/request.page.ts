import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ActionSheetController,
  Events,
  IonContent,
  IonSlides,
  ModalController,
  NavController,
  Platform,
  ToastController
} from '@ionic/angular';
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
import {Router} from '@angular/router';
import {LocationAddress} from '../../utils/interfaces/settings/preferences';
import {PreferencesService} from '../../utils/services/preferences.service';
import {PreviousRouteService} from '../../providers/previous-route.service';
import {TaskActions} from '../../providers/constants';

@Component({
  selector: 'request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss']
})
export class RequestPage implements OnInit, OnDestroy {
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
  taskImages = {
    image_one: undefined,
    image_two: undefined,
    image_three: undefined
  };
  isMobileWebOrDesktop = false;
  isTaskEdit = false;

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
  locations: LocationAddress[] = [];
  subPage = 'request-index';
  subPageTitle: string;

  constructor(private modalCtrl: ModalController,
              private imagePicker: ImagePicker,
              private camera: Camera,
              private marketplaceService: MarketplaceService,
              private toastController: ToastController,
              private router: Router,
              private events: Events,
              private preferences: PreferencesService,
              private actionSheetCtrl: ActionSheetController,
              private previousRoute: PreviousRouteService,
              private navCtrl: NavController,
              public platform: Platform) {
    this.events.subscribe('task-edit', (taskRequest: MainMarketplaceTask) => {
      if (taskRequest) {
        this.isTaskEdit = true;
        this.taskRequest = taskRequest;
        this.taskRequest.date = taskRequest.isoFormat;
        taskRequest.locations.forEach((location) => {
          this.taskRequest.street_address = location.street_address;
          this.taskRequest.city = location.city;
          this.taskRequest.state = location.state;
          this.taskRequest.zip = location.zip;
        });

        this.taskImages.image_one = taskRequest.image_one;
        this.taskImages.image_two = taskRequest.image_two;
        this.taskImages.image_three = taskRequest.image_three;
      }
    });
  }

  ngOnInit() {
    if (this.platform.is('mobileweb') || this.platform.is('desktop') || this.platform.is('pwa')) {
      this.isMobileWebOrDesktop = true;
    }
    this.getLocations();
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('task-edit');
  }

  async closeRequestPage(): Promise<boolean> {
    return await this.modalCtrl.dismiss();
  }

  getLocations() {
    this.preferences.getMyLocations().subscribe(res => {
      this.locations = res.locations;
    });
  }

  async presentActionSheet(location?: LocationAddress) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Set Location',
      buttons: [{
        text: 'Use Location',
        icon: 'checkmark',
        handler: () => {
          this.taskRequest.street_address = location.street_address;
          this.taskRequest.city = location.city;
          this.taskRequest.state = location.state;
          this.taskRequest.zip = location.zip;

          this.presentToast('Location set!');
        }
      }, {
        text: 'Remove',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.preferences.deleteLocation(location.id).subscribe(res => {
            this.getLocations();
            this.presentToast(res.message);
          });
        }
      }, {
        text: 'Close',
        role: 'cancel',
        handler: () => {}
      }]
    });
    await actionSheet.present();
  }

  onSlideChange() {
    this.content.scrollToTop(500);
  }

  selectCategory(category: MainCategory) {
    this.taskRequest.category_id = category.id;
    setTimeout(() => {
      this.updateProgress();
      this.openSubPage('task-information');
    }, 500);
  }

  onEditorChange( { editor }: ChangeEvent ) {
    this.taskRequest.description = editor.getData();
    this.updateProgress();
  }

  onTextboxChange() {
    this.updateProgress();
  }

  updateProgress() {
    this.progress = setProgress([
      this.taskRequest.category_id,
      this.taskRequest.description,
      this.taskRequest.date,
      this.taskRequest.description,
      this.taskRequest.street_address,
      this.taskRequest.city,
      this.taskRequest.state,
      this.taskRequest.zip,
      this.taskRequest.intensity,
      (this.taskRequest.price >= 5) ? this.taskRequest.price : this.taskRequest.id
    ]);
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
        this.taskImages.image_one = 'data:image/jpeg;base64,' + results[0];
        this.taskRequest.image_one = results[0];
      }

      if (results[1]) {
        this.taskImages.image_two = 'data:image/jpeg;base64,' + results[1];
        this.taskRequest.image_two = results[1];
      }

      if (results[2]) {
        this.taskImages.image_three = 'data:image/jpeg;base64,' + results[2];
        this.taskRequest.image_three = results[2];
      }
    }, (err) => { console.log('Error with Image Picker.'); });
  }

  removeImage(index: number) {
    switch (index) {
      case 0:
        this.taskImages.image_one = undefined;
        this.taskRequest.image_one = undefined;
        break;
      case 1:
        this.taskImages.image_two = undefined;
        this.taskRequest.image_two = undefined;
        break;
      case 2:
        this.taskImages.image_three = undefined;
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
      if (!this.taskRequest.image_two) {
        this.taskImages.image_two = base64Image;
        this.taskRequest.image_two = imageData;
      } else if (!this.taskRequest.image_three) {
        this.taskImages.image_three = base64Image;
        this.taskRequest.image_three = imageData;
      } else {
        this.taskImages.image_one = base64Image;
        this.taskRequest.image_one = imageData;
      }
    }, (err) => {
      // Handle error
      console.log('Error something went wrong with camera.');
    });
  }

  onSubmitTaskRequest() {
    this.submitted = true;

    if (this.progress === 1) {
      this.marketplaceService.createMainMarketplaceRequest(this.taskRequest)
        .then((res) => {
          this.closeRequestPage()
            .then(() => {
              this.presentToast(res);
              console.log(this.previousRoute.getCurrentUrl());
              if (this.previousRoute.getCurrentUrl() !== '/app/tabs/marketplace') {
                this.router.navigateByUrl('app/tabs/marketplace');
              }
            });
        })
        .catch(error => {
          this.closeRequestPage()
            .then(() => {
              this.router.navigateByUrl('app/set-up-payments')
                .then(() => {
                  this.events.publish('task-request', this.taskRequest);
                  this.presentToast(error.error.message);
                });
            });
        });
    }
  }

  setDifficulty(intensity: string) {
    this.taskRequest.intensity = intensity;
    this.updateProgress();
  }

  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  onUpdateTaskRequest() {
    this.submitted = true;

    this.marketplaceService.editMainMarketplaceRequest(this.taskRequest)
      .then((res) => {
        this.closeRequestPage();
        this.presentToast(res);
        this.navCtrl.navigateBack(`app/marketplace-detail/${this.taskRequest.id}`);
        this.events.publish('task-action', TaskActions.CUSTOMER_UPDATE_TASK);
      })
      .catch(error => {
        this.closeRequestPage();
        this.presentToast(error.error.message);
      });
  }

  openSubPage(page: string) {
    this.subPage = page;
    switch (page) {
      case 'select-category':
        this.subPageTitle = 'Select Category';
        break;
      case 'task-information':
        this.subPageTitle = 'Task Information';
        break;
      case 'location':
        this.subPageTitle = 'Location';
        break;
      case 'attach-images':
        this.subPageTitle = 'Attach Images';
        break;
      case 'task-intensity':
        this.subPageTitle = 'Task Difficulty';
        break;
      case 'set-price':
        this.subPageTitle = 'Set Price';
        break;
    }
  }

  uploadImage(event: any) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        this.taskRequest.image_one = (<FileReader>e.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}

export function setProgress(formFields: any[], initProgress: number = 0): number {
  const progressRatio: number = (1  / formFields.length);
  const fields: number[] = formFields.map((field) => (field) ? progressRatio : 0);
  const progress: number = initProgress + fields.reduce((totalProgress, currProgress) => totalProgress + currProgress);
  return (progress < 0.999) ? progress : 1;
}
