import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { AddressbookService } from 'src/app/services/addressbook.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup;
  state: string[]=[
    'Matric',
    'Diploma',
    'Graduate',
    'Intermediate',
    'Post Graduate',
   ];

   city: string[]=[
    'Matric',
    'Diploma',
    'Graduate',
    'Intermediate',
    'Post Graduate',
   ];
  

  
  constructor(
    private _fb: FormBuilder,
    private _addService: AddressbookService,
    private _dialogRef: MatDialogRef<AddComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.addForm = this._fb.group({
      name: '',
      address: '',
      city:'',
      state:'',
      zipcode:'',
      phonenumber:'',
    });
  }

  ngOnInit(): void {
    this.addForm.patchValue(this.data);
  }

  


   onFormSubmit(){
    if (this.addForm.valid) {
      if (this.data) {
        this._addService
          .updateAddress(this.data.id, this.addForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._addService.addAddress(this.addForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
  
}
  



