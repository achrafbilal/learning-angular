import { Component, OnInit, Inject, ViewChild } from '@angular/core';
//import { RestDataApiService } from 'src/app/services/data/rest-data-api.service';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from '../Service/folder.service';
import { Folder } from '../modules/folder/folder.module';
import { DataSharingService } from '../Service/data-sharing.service';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-folderslistweek',
  templateUrl: './folderslistweek.component.html',
  styleUrls: ['./folderslistweek.component.scss'],
})
export class FolderslistweekComponent implements OnInit {


  public lastWeekFolders: Folder[];
  public lastMonthFolders: Folder[];
  public totalweekpage:number;
  public totalWeekpage2:number [];
  public ActiveIndex:number ;
  public NextSlide:number ;
  public indexPage:number = 0;
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
  public NBel: number = 0;
  public NBelstock: number = 0;
  public load:boolean=true;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;


  sliderOne: any;



  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false
  };

  constructor( private folderService: FolderService,
              public share : DataSharingService,
              private rest:RestDataApiService,
              private router: Router,
              //private modal : NgbModal
              ) { }
              LoadNext(){
                this.slideWithNav.getActiveIndex().then(res=>{
                  this.ActiveIndex=res;
                 console.log('Next/'+res);
                 this.getAllFolders(res);
                 if((this.totaloldpage-1)==this.ActiveIndex){
                   this.NBelstock=this.countOld;
                
                }else{
                  this.NBelstock+=this.NBel;
                }
                
                 console.log('numberofelement/'+this.NBel);
                 console.log('varstock/'+this.NBelstock);
                })
            //console.log('Next'+re)
                
              }
              Loadprev(){
                this.slideWithNav.getActiveIndex().then(res=>{
                  this.ActiveIndex=res;
                 console.log('Prev/'+res);
                 this.getAllFolders(res);
                 this.NBelstock-=this.NBel;
                 console.log('numberofelement/'+this.NBel);
                 console.log('varstock/'+this.NBelstock);
                 console.log('countold/'+this.countOld);
                })
              }
            
              //Method called when slide is changed by drag or navigation
              SlideDidChange(object, slideView) {
                this.checkIfNavDisabled(object, slideView);
               
               /* console.log('Test slide OnChange');
                
                
                //this.getAllFoldersOLD(this.indexPage);
                
                this.slideWithNav.getActiveIndex().then(res=>{
                  this.ActiveIndex=res;
                 console.log(res);
                })
                console.log('swiper'+this.slideWithNav.getSwiper);
                this.slideWithNav.getPreviousIndex().then(res=>{
                 
                 //console.log('SlidePrevious '+res);
                })
               /* if(this.indexPage+1<=this.totaloldpage){
                  this.indexPage++;
                }*/
                 //slideView.slideNext(console.log('slideNext'));
               //  slideView.slidePrev(console.log());
               // console.log(this.indexPage);
                //console.log(this.totaloldpage);
                /*console.log(this.slideWithNav.getActiveIndex());
                console.log(this.slideWithNav.getPreviousIndex());
                console.log(this.slideWithNav.getSwiper());
                if (this.slideWithNav.isEnd()) {
                 
                }*/
               
               
              }
             
            
              //Call methods to check if slide is first or last to enable disbale navigation  
              checkIfNavDisabled(object, slideView) {
                this.checkisBeginning(object, slideView);
                this.checkisEnd(object, slideView);
               // console.log('Test slide Navdisabled');
              }
             
              checkisBeginning(object, slideView) {
                slideView.isBeginning().then((istrue) => {
                  object.isBeginningSlide = istrue;
                 // console.log('Test slide beginning');
                });
              }
              checkisEnd(object, slideView) {
                slideView.isEnd().then((istrue) => {
                  object.isEndSlide = istrue;
                //  console.log('Test slide ENd');
                });
              }
            









              goTo(to: string) {
                this.router.navigate([to]);
              }
              
              
  next() {
    this.pageNumber += 1;
   // this.getAllFolders();
  }
  Previous() {
    this.pageNumber -= 1;
    //this.getAllFolders();
   
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
      this.getAllFolders(this.indexPage);
      this.getAllFoldersMonth();
      this.getAllFoldersOLD();
      this.isLoading = true;
      this.CountFolderRecent();
    });
    
  }
  getAllFolders(i:number){
    this.folderService.getAllFolders(i,this.pageSize)
      .subscribe(folders => {
        this.lastWeekFolders = folders.content;
        this.countOfLastWeek = folders.totalElements;
      
        this.totalweekpage=folders['totalPages'] as number;
        this.totalWeekpage2=new Array<number>(this.totalweekpage);
        this.NBel=folders['numberOfElements']  as number;
        if(this.load){
          this.NBelstock=this.NBel;
          this.load=false;
        }

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
        this.slideWithNav.getActiveIndex().then(res=>{
          this.ActiveIndex=res;
         //console.log('Prev/'+res);
         this.getAllFolders(res);
        })
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
