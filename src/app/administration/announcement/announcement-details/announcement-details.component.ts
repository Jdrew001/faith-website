import { Component, OnInit, ViewChild, OnDestroy, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { Subscription } from 'rxjs';
import { UploadFile, UploadInput, UploadOutput, MDBDatePickerComponent } from 'ng-uikit-pro-standard';
import { Announcement } from '../announcement.model';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { FileUtilityService } from 'src/app/shared/utilities/FileUtilities';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AnnouncementConstant } from '../announcement.constant';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.css']
})
export class AnnouncementDetailsComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('modal') mdbModal: any;
  @ViewChild('datePicker') datePicker: MDBDatePickerComponent;
  months: Array<any>;
  years: Array<any>;
  canExpire = false;
  announcementForm = new FormGroup({
    heading: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    month: new FormControl(null, Validators.required),
    year: new FormControl(null, Validators.required),
    expirationDate: new FormControl(null, Validators.required)
  });
  announcementModel: Announcement;
  announcementId: number;
  formSubmitted = false;
  dragOver = false;
  announcementAdd = false;
  isEdit = false;
  dateError = false;
  announcementDialog: Subscription;
  files: UploadFile[];
  imageUrl: any;
  month: number;
  year: number;
  uploadInput: EventEmitter<UploadInput>;
  dt = new Date();
  myDatePickerOptions = { dateFormat: 'mm/dd/yyyy', disableUntil: {year: this.dt.getFullYear(), month: this.dt.getMonth() + 1, day: this.dt.getDate()}};
  optionsSelect = [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' }
    ];

  constructor(private announcementService: AnnouncementService, private loaderService: LoaderService,
    private fileUtilityService: FileUtilityService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.dialogSubscription();
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.months = AnnouncementConstant.MONTHS;
    this.years = AnnouncementConstant.YEARS;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  addAnnouncement() {
    this.formSubmitted = true;
    if (this.formSubmitted && this.announcementForm.valid && this.files.length >= 1) {
      if (this.checkDate()) {
        this.dateError = false;
        this.announcementModel = this.announcementForm.value;
        // if (!this.announcementModel.expirationDate) {
        //   this.announcementModel.expirationDate = '';
        // }
        this.announcementService.addAnnouncement(this.announcementModel, this.files[0]).subscribe(data => {
          this.announcementService.announcementSaveSubject.next(null);
          this.mdbModal.hide();
          this.files = [];
        });
      } else {
        this.dateError = true;
        this.notificationService.displayError('Month and year have to be in the present or future', 'Form Error');
      }
    } else {
      this.notificationService.displayError('Please ensure all fields are filled in', 'Form Error');
    }
  }

  startUpload(event) {
    this.files = [];
    this.uploadInput.emit(event);
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
       if (!(this.files.length - 1 === i)) {
         files += ',';
      }
    }
    return files;
 }

 onUploadOutput(output: UploadOutput): void {
  if (output.type === 'allAddedToQueue') {
  } else if (output.type === 'addedToQueue') {
    console.log(output.file.type);
    if (output.file.type === 'image/jpeg' || output.file.type === 'image/jpg') {
      this.files = [];
      this.files.push(output.file); // add file to array when added
      this.imageUrl = output.file.name;
      var reader = new FileReader();
      reader.readAsDataURL(this.files[0].nativeFile); 
      reader.onload = (_event) => { 
        this.imageUrl = reader.result; 
      }

      this.showFiles();
    } else {
      this.notificationService.displayError('Only jpg/jpeg file format allowed', 'File Error');
    }
  }
}

fetchData() {
  this.loaderService.toggleLoader(true);
  this.announcementService.fetchAnnouncement(this.announcementId).subscribe(data => {
    this.loaderService.toggleLoader(false);
    //this.checkCanExpire(data.expirationDate);
    this.updateFormAndFile(data);
  });
}

monthSelected(event) {
  this.month = event.value;
}

yearSelected(event) {
  this.year = event.value;
}

checkDate(): boolean {
  if (this.year === this.dt.getFullYear()) { // current year
    console.log(this.dt.getMonth());
    if (this.month >= this.dt.getMonth()) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

updateAnnouncement() {
  this.formSubmitted = true;
  if (this.announcementForm.valid) {
    if (this.checkDate()) {
      this.dateError = false;
      //call the service
      this.announcementModel = this.announcementForm.value;
      this.announcementService.updateAnnouncement(this.announcementModel, this.files[0], this.announcementId).subscribe(result => {
        this.notificationService.displaySuccess(AnnouncementConstant.SUCCESSFUL_UPDATE, 'Success');
        this.editMode();
        this.announcementService.announcementSaveSubject.next(null);
      }, error => {
        console.log(error);
      })
    } else {
      this.dateError = true;
      this.notificationService.displayError('Month and year have to be in the present or future', 'Form Error');
    }
  }
}

  dialogSubscription() {
    this.announcementDialog = this.announcementService.dialog$.subscribe(data => {
      console.log(data);
      if (data) {
        this.checkCanExpire(data.expirationDate);
        this.announcementId = data.id;
        this.announcementAdd = false;
        this.announcementForm.disable();
        this.updateFormAndFile(data);
      } else {
        this.announcementAdd = true;
        this.isEdit = true;
        this.announcementForm.enable();
      }
      this.mdbModal.show();
    });
  }

  checkCanExpire(data) {
    if (data) {
      this.canExpire = true;
    } else {
      this.canExpire = false;
    }
  }

  onClose(event) {
    this.announcementForm.reset();
    this.datePicker.clearDate();
    this.files = [];
    this.formSubmitted = false;
    this.announcementAdd = false;
    this.isEdit = false;
    this.imageUrl = null;
  }

  editMode() {
    if (this.isEdit) {
      this.isEdit = false;
      this.announcementForm.disable();
      this.fetchData();
    } else {
      this.isEdit = true;
      this.announcementForm.enable();

    }
  }

  updateFormAndFile(data) {
    data.image = this.fileUtilityService.convertBase64ToImagefile(data.image);
    this.announcementForm.patchValue(data);
    let output: UploadOutput = { type: 'addedToQueue', file: data.image };
    this.onUploadOutput(output);
  }

  ngOnDestroy() {
    if (this.announcementDialog) {
      this.announcementDialog.unsubscribe();
    }
  }
}