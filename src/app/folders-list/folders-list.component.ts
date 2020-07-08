import { Component, OnInit, Inject } from '@angular/core';
//import { RestDataApiService } from 'src/app/services/data/rest-data-api.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from '../Service/folder.service';
import { Folder } from '../modules/folder/folder.module';
import { DataSharingService } from '../Service/data-sharing.service';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders-list',
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
})
export class FoldersListComponent implements OnInit {

  public lastWeekFolders: Folder[];
  public lastMonthFolders: Folder[];
  public totalweekpage:number;
  public totalMonthpage:number;
  public totaloldpage:number;
  public OLDFolders: Folder[];
  public pageNumber: number = 0;
  public pageSize: number = 6;
  public pageNumberMonth: number = 0;
  public pageSizeMonth: number = 6;
  public pageNumberOld: number = 0;
  public pageSizeOld: number = 6;
  public favoriteFoldersIds: string[];
  public isLoading: boolean;
  public countOfLastMonth;
  public countOfLastWeek;
  public countOld;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor( private folderService: FolderService,
              public share : DataSharingService,
              private rest:RestDataApiService,
              private router: Router,
              //private modal : NgbModal
              ) { }
              goTo(to: string) {
                this.router.navigate([to]);
              }
              
              
  next() {
    this.pageNumber += 1;
    this.getAllFolders();
  }
  Previous() {
    this.pageNumber -= 1;
    this.getAllFolders();
   
  }
  nextMonth() {
    this.pageNumberMonth += 1;
    this.getAllFoldersMonth();
  }
  PreviousMonth() {
    this.pageNumberMonth -= 1;
    this.getAllFoldersMonth();
   
  }
  nextOLD() {
    this.pageNumberOld += 1;
    this.getAllFoldersOLD();
  }
  PreviousOLD() {
    this.pageNumberOld -= 1;
    this.getAllFoldersOLD();
   
  }
  ngOnInit(): void {
    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;
      this.getAllFolders();
      this.getAllFoldersMonth();
      this.getAllFoldersOLD();
      this.isLoading = true;
      this.CountFolderRecent();
    });
    
  }
  getAllFolders(){
    this.folderService.getAllFolders(this.pageNumber,this.pageSize)
      .subscribe(folders => {
        this.lastWeekFolders = folders.content;
        this.countOfLastWeek = folders.totalElements;
      
        this.totalweekpage=folders['totalPages'] as number;
     

      })
  }
  getAllFoldersMonth(){
    this.folderService.getAllFoldersMonth(this.pageNumberMonth,this.pageSizeMonth)
      .subscribe(folders => {
        this.lastMonthFolders = folders.content;
        this.countOfLastMonth=folders.totalElements;
        this.totalMonthpage=folders['totalPages'] as number;
      })
  }
  getAllFoldersOLD(){
    this.folderService.getAllFoldersOLD(this.pageNumberOld,this.pageSizeOld)
      .subscribe(folders => {
        this.OLDFolders = folders.content;
        this.countOld=folders.totalElements;
        this.totaloldpage=folders['totalPages'] as number;
      })
  }
  addToFavorite(folderId: number){
    this.folderService.addToFavorite(folderId)
    .subscribe(res => {
     
      this.folderService.getFAvoritFoldersIds().subscribe(ids => {
        this.favoriteFoldersIds = ids;
        this.getAllFolders();
        this.getAllFoldersMonth();
        this.getAllFoldersOLD();
        this.isLoading = true;
        this.CountFolderRecent();
      });
    })
  }
  isFavorite(folder: Folder)  {
  
      return this.favoriteFoldersIds.indexOf(folder.id) >= 0;
  }
  CountFolderRecent(){
    this.folderService.CountFolderrecent()
      .subscribe(res => {
   
       
      
      })
  }


  DeleteFavoritefolder(folderId: number){
    this.folderService.deletefavoritefolder(folderId)
    .subscribe(res => {
      this.ngOnInit();
    })
  }


}
