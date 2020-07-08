import { Injectable, ɵɵresolveDocument } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  folderToEdite;
  folderToEditeMode;
  folderToOpen;
  documentToLink;
  constructor(private route: Router) { }

  editFolder(folder) {
    this.folderToEditeMode = "edit";
    this.folderToEdite = folder;
    this.route.navigateByUrl('dashboard/folders/edit');
  }
  openFolder(folder) {
    this.folderToOpen = folder;
    this.route.navigateByUrl('dashboard/documents');
  }
  quickDocumentLink(documentId) {
    this.documentToLink = documentId;
    this.route.navigateByUrl('dashboard/linking/doctofolder');
  }
  deleteFolder(folder){
    this.folderToEditeMode = "delete";
    this.folderToEdite = folder;
    this.route.navigateByUrl('dashboard/folders/edit');
  }
}