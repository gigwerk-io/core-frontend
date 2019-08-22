import {Component, EventEmitter, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonSlides, ModalController} from '@ionic/angular';
import {MainCategory} from '../../utils/interfaces/main-marketplace/main-category';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {State} from '../../utils/interfaces/locations/state';
import {STATES} from '../../utils/mocks/states.mock';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';

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
    category: undefined,
    complete_before: undefined,
    description: undefined,
    locations: [{
      street_address: undefined,
      city: undefined,
      state: undefined,
      zip: undefined,
    }],
    price: undefined,
    image_one: undefined,
    image_two: undefined,
    image_three: undefined
  };

  imagesURI: any[];

  public Editor = ClassicEditor;
  editorConfig = {
    placeholder: 'Describe your task here.',
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote'
    ]
  };

  categories: MainCategory[] = TASK_CATEGORIES;
  pageTitle = 'Request';
  states: State[] = STATES;

  constructor(private modalCtrl: ModalController, private imagePicker: ImagePicker) { }

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

  selectCategory(category: MainCategory) {
    this.taskRequest.category = category.name;
    setTimeout(() => {
      this.slides.slideNext();
    }, 500);
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
            this.pageTitle = 'Price';
            this.content.scrollToTop(500);
            break;
        }
      });
  }

  public onEditorChange( { editor }: ChangeEvent ) {
    const data = editor.getData();

    this.taskRequest.description = data;
  }

  setPrice(price: any) {
    this.taskRequest.price = price;
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

      for (let i = 0; i < results.length; i++) {
        const imageURI = results[i];
        const base64Image = 'data:image/jpeg;base64,' + imageURI;
        this.imagesURI.push(imageURI);

        if (i === 0) {
          this.taskRequest.image_one = imageURI;
        } else if (i === 1) {
          this.taskRequest.image_two = imageURI;
        } else if (i === 2) {
          this.taskRequest.image_three = imageURI;
        }
      }
    }, (err) => { console.log('Error with Image Picker.'); });
  }
}
