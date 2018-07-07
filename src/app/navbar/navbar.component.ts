import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [SearchComponent],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dialogResult: string;
  
  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(SearchComponent, {
      width: '90%',
      height: '90%',
      //data: 'This text is passed into the dialog!'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });

}
}