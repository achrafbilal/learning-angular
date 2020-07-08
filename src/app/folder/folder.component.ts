import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { Folder } from 'src/app/services/data/models/folder.model';
import { DataSharingService } from '../Service/data-sharing.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  @Input() folder;
  @Input() isCheked;
  @Input() mode;
  @Input() isFav;
  @Input() checked = false;
  @Output() folderClick = new EventEmitter();
  hover = false;
  folderInfos = '';

  theCheckbox = false;

  constructor(private share: DataSharingService) { }

  ngOnInit(): void {
    this.theCheckbox = this.isCheked;
    this.checked = this.folder['field1'] == 1;
    
    // this.theCheckbox= this.folder['field1']==1;
    this.folderInfos = `Référence: ${this.folder.reference} \n\n Numéro: ${this.folder.number} \n\n`

  }

  toggleVisibility() {

    this.theCheckbox = !this.theCheckbox;
  }
  open() {
    if (this.mode == undefined) {
      console.log(this.folder);
      this.share.openFolder(this.folder);
      this.folderClick.emit();
    }
    if (this.mode == 'links') {
      if (this.checked == true) {
        this.checked = false;
      }


      else {
        this.checked = true;

      }
      this.folderClick.emit(this.folder.id);
    }

    
    if (this.mode == 'linkFolders') {
      if (this.checked == true) {
        this.checked = false;
      }

      else {
        this.checked = true;

      }

      this.folderClick.emit(this.folder.id);
     

    }


 
  }
}
