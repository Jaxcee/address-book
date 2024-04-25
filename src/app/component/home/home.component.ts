import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { AddressbookService } from 'src/app/services/addressbook.service';
import { CoreService } from 'src/app/core/core.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = ['name','address','phonenumber','state','city','pincode','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private _dialog: MatDialog, private _addService: AddressbookService , private _coreService: CoreService){}
 ngOnInit(): void {
  this.getAddressList();
}
 
 openAddEditForm(){
  const dialogRef = this._dialog.open(AddComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val){
        this.getAddressList();
      }
    },
  });

      }

      getAddressList(){
        this._addService.getAddressList().subscribe({
          next: (res)=>{
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
    
          },
    
          error:console.log,
          
        });
      }
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    
      deleteEmployee(id: number){
        this._addService.deleteAddress(id).subscribe({
          next: (res) => {
           
            this._coreService.openSnackBar('Employee deleted','done')
            this.getAddressList();
    
          },
          error: console.log,
        });
      }
    
      openEditForm(data: any){
       const dialogRef = this._dialog.open(AddComponent,{
        data,
      });
      
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val){
            this.getAddressList();
          }
        },
      });
      }


    }
