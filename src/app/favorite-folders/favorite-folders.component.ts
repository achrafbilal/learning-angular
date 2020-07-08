import { Component, OnInit, ViewChild } from '@angular/core';
//import { Folder } from 'src/app/services/data/models/folder.model';
//import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';
//import { OperationResultModalComponent } from '../modal/operation-result-modal/operation-result-modal.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FolderService } from '../Service/folder.service';
import { DataSharingService } from '../Service/data-sharing.service';
import { FavoriteFolder } from '../modules/favorite-folder/favorite-folder.module';
import { PreviousRouteService } from '../Service/previous-route.service';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-favorite-folders',
  templateUrl: './favorite-folders.component.html',
  styleUrls: ['./favorite-folders.component.scss'],
})
export class FavoriteFoldersComponent implements OnInit {
  public getfavoritefolder: any;
  public favoriteFolders: FavoriteFolder[];
  public NBel: number = 0;
  public NBelstock: number = 0;
  public load:boolean=true;
  public totaloldpage2:number [];
  public ActiveIndex:number ;
  public NextSlide:number ;
 public indexPage:number = 0;
 public totalePages2 :number=0;


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
  constructor(private folderService: FolderService,
              public share: DataSharingService,
              //private modal: NgbModal,
              private rest: RestDataApiService,
              private previous : PreviousRouteService,
              private route:Router,
              private router: Router) { }
//Get Activeslide

   //Move to Next slide/
   /*
  slideNext(object, slideView) {
    slideView.slideNext().then(() => {
      this.checkIfNavDisabled(object, slideView);
      console.log('Test slide Next');
    });

  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev().then(() => {
      this.checkIfNavDisabled(object, slideView);
    //  console.log('Test slide Prev');
    });;
  }*/
  LoadNext(){
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log('Next/'+res);
     this.getfavoritefolders(res);
     if((this.totalePages2-1)==this.ActiveIndex){
       this.NBelstock=this.totalfolderFav;
    
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
     this.getfavoritefolders(res);
     this.NBelstock-=this.NBel;
   
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
    /*slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
     // console.log('Test slide beginning');
    });*/
  }
  checkisEnd(object, slideView) {
   /* slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    //  console.log('Test slide ENd');
    });*/
  }








  page = 0;
  pages: number[] = new Array<number>();
  public totalfolderFav: number;
  public totalFav: number;

  ngOnInit(): void {
   this.getfavoritefolders(this.indexPage);
 /*   this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     this.getfavoritefolders(res);

    })*/
  }

  getfavoritefolders(i:number) {
    this.folderService.getfavoritefolder(i)
      .subscribe(folders => {

        this.favoriteFolders = folders['content'];
        const totalePages = folders['totalPages'];
        this.totalePages2= folders['totalPages'];
        this.totalFav = folders['totalPages'];
       // this.countOfLastWeek = folders.totalElements;
       this.totalfolderFav=folders['totalElements'];
        this.pages = new Array<number>(totalePages);
        this.NBel=folders['numberOfElements']  as number;
        if(this.load){
          this.NBelstock=this.NBel;
          this.load=false;
        }
      });
  }

  goPage(i) {

    this.page = i;
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     this.getfavoritefolders(res);

    })


  }
  goTo(to: string) {
    this.router.navigate([to]);
  }
  Previous(){
    this.goPage(--this.page);
  }
  next(){
    this.goPage(++this.page);

  }

  openModale(state?, target?, message?, ref?) {
   /* const modalRef = this.modal.open(OperationResultModalComponent, { centered: true });
    modalRef.componentInstance.object = 'le dossier';
    modalRef.componentInstance.operation = target ?? 'Modification';
    modalRef.componentInstance.result = state == 1 ? 'succès' : 'echoue';
    modalRef.componentInstance.name = ref;
    modalRef.componentInstance.message = message;*/
  }
  onDelete(folder) {
/*
    const confRef = this.modal.open(ConfirmationComponent, { centered: true });
    confRef.componentInstance.pass.subscribe(resp => {
      if (resp === 'yes') {
        this.rest.deleteFolder(folder.id).subscribe(res => {


        },
          err => {
            this.openModale(0, 'Suppression', 'Le dossier est containe des documents veuillez vider premièrement', folder.reference)
          });

      }
      confRef.dismiss();
    });*/
  }

  DeleteFavoritefolder(folderId: number){
    console.log(folderId);

    this.folderService.deletefavoritefolder(folderId)
    .subscribe(res => {
      console.log(res);
      this.slideWithNav.getActiveIndex().then(res=>{
        this.ActiveIndex=res;
       this.getfavoritefolders(res);
  
      })

    })
  }
  goBack()
  {
    this.route.navigateByUrl(this.previous.getPreviousUrl());
  }

}
