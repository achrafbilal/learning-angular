import { Component, OnInit, Input, Output, EventEmitter, Attribute, ViewChild } from '@angular/core';
//import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FolderTypeA } from '../modules/folder-type/folder-type.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SaveSearchComponent } from '../modal/save-search/save-search.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
//import { PreviousRouteService } from '../services/previous-route.service';
//import { FolderToFoldersComponent } from '../modal/folder-to-folders/folder-to-folders.component';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { Folder } from '../modules/folder/folder.module';
import { RestSearchApiService } from '../Service/rest-search-api.service';
import { SearchAttribute, Search } from '../modules/search/search.module';
import { DataSharingService } from '../Service/data-sharing.service';
import { FolderService } from '../Service/folder.service';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { IonSlides } from '@ionic/angular';
//import { RxFormBuilder } from '@rxweb/reactive-form-validators/services/rx-form-builder';


@Component({
  selector: 'app-folder-search',
  templateUrl: './folder-search.component.html',
  styleUrls: ['./folder-search.component.scss'],
})
export class FolderSearchComponent implements OnInit {
  public favoriteFoldersIds: string[];
  public isLoading: boolean;
  search: Search;
  @Input() listOfSelectedFolders;
  totalePages: number;
  page = 0;
  pages: number[] = new Array<number>();
  pageSize;
  folderSelectedId;
  isLoaded;
  resultTotal;
  @Input() operation;
  @Input() linkDoc;
  @Input() DocumentId;
  @Input() ShowResult;
  
  public totalpage2:number;
  public ActiveIndex:number ;
  public NextSlide:number ;
  public indexPage:number = 0;
  public NBel: number = 0;
  public NBelstock: number = 0;
  public load:boolean=true;



  foldersResut;
  folder: Folder;
  folders: FolderTypeA[];
  clients;
  folderFormGroup: FormGroup;
  isResult = this.ShowResult ?? false;
  @Output() folderSelected = new EventEmitter();
  @Output() validLink = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() Back = new EventEmitter();

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





  constructor(private fb: FormBuilder,
    private router: Router,

    private rest: RestDataApiService,
    private searchserv: RestSearchApiService,
    //private modalService: NgbModal,
    public share: DataSharingService,
    private folderService: FolderService,
    private route: Router,
   // private prev: PreviousRouteService,
   ) { }
   LoadNext(){
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log('Next/'+res);
     this.getResult(res);
     if((this.totalpage2-1)==this.ActiveIndex){
       this.NBelstock=this.resultTotal;
    
    }else{
      this.NBelstock+=this.NBel;
    }    
     console.log('ActiveIndex/'+this.ActiveIndex);
    console.log('totalePages/'+(this.totalpage2-1));
     console.log('numberofelement/'+this.NBel);
     console.log('varstock/'+this.NBelstock);
    })
//console.log('Next'+re)
    
  }
  Loadprev(){
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log('Prev/'+res);
     this.getResult(res);
     this.NBelstock-=this.NBel;
     console.log('numberofelement/'+this.NBel);
     console.log('varstock/'+this.NBelstock);
     console.log('countold/'+this.resultTotal);
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







   
   ionViewWillEnter(){
    if(localStorage.getItem('isloadFOLDER')=='ok'){
      localStorage.setItem('isloadFOLDER','Notok')
   location.reload();
  

   console.log('Load test');
       }
    console.log("ppppppppp")
    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;
      this.isLoading = true;
    });
    console.log(this.DocumentId)
    if (sessionStorage.getItem('fs')) {
      this.folder = new Folder();
      this.folderFormGroup = this.fb.group(this.folder);
      this.getSearchAttrVal();

    }
    else {
      this.retriveFoldersType();
      this.retriveClients();
      this.folder = new Folder();
      this.folderFormGroup = this.fb.group({
        Reference : [''],
        Client : [''],
        Types : [''],
        Number : [''],
        Date : [''],

      });
      console.log(this.operation);
    }

   }
   ngOnInit(): void {

console.log("tttttttttt")
    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;
      this.isLoading = true;
    });
    console.log(this.DocumentId)
    if (sessionStorage.getItem('fs')) {
      this.folder = new Folder();
      this.folderFormGroup = this.fb.group(this.folder);
      this.getSearchAttrVal();

    }
    else {
      this.retriveFoldersType();
      this.retriveClients();
      this.folder = new Folder();
      this.folderFormGroup = this.fb.group({
        Reference : [''],
        Client : [''],
        Types : [''],
        Number : [''],
        Date : [''],

      });
      console.log(this.operation);
    }


  }
  
  goPage(i) {
    
    this.page = i;


    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;

      //this.folderSelected.emit();


      if (this.operation === 'multi' && this.linkDoc === '1') {
        this.getFoldersToLinkWithDocument()

      }
      else if (this.operation !== 'multi' && this.linkDoc !== '1') {
        this.getResult(this.indexPage);


      }
      else {
        this.getResultToLink();
        console.log('2nd test');

      }
      this.isLoading = true;
    });


  }
  DeleteFavoritefolder(folderId: number){
    this.folderService.deletefavoritefolder(folderId)
    .subscribe(res => {
      this.folderService.getFAvoritFoldersIds().subscribe(ids => {
        this.favoriteFoldersIds = ids;
        this.isLoading = true;
        
      });

    })
  }


  isFavorite(folder: Folder)  {
    console.log(folder.id)
      return this.favoriteFoldersIds.indexOf(folder.id) >= 0;
  }


  getSearchAttrVal() {
    const attributes = new Array<SearchAttribute>();
    this.searchserv
      .getFrequencySearcheqaAttrs(sessionStorage.getItem('fs').toString())
      .subscribe(res => {
        const folderMod = new Folder();
        (res as Array<any>).forEach(s => {
          const se = s.id;
          attributes.push(new SearchAttribute(se.attribute_id as number, s.value));
        });
        console.log(attributes);
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < attributes.length; i++) {
          const a = attributes[i];
          if (a.id === 2) {
            folderMod.client = Number.parseInt(a.value);
          }
          if (a.id === 3) {
            folderMod.reference = a.value;
          }
          if (a.id === 1) {
            folderMod.type = Number.parseInt(a.value);
          }
          if (a.id === 5) {
            folderMod.date = new Date(a.value);
          }
          if (a.id === 4) {
            folderMod.number = Number.parseInt(a.value);
          }

        }
        console.log(folderMod);
        this.folderFormGroup = this.fb.group(folderMod);
        this.retriveFoldersType();
        this.retriveClients();
        this.folder = folderMod;
        this.slideWithNav.getActiveIndex().then(res=>{
          this.ActiveIndex=res;
        this.getResult(res);})
        sessionStorage.removeItem('fs');

      });

  }
  private retriveFoldersType() {
    this.rest.getFloderTypes().subscribe(res => {
      console.log(res);
      this.folders = res;
      console.log(this.folders);

    });
  }
  private retriveClients() {
    this.rest.getClients().subscribe(res => {
      console.log(res);
      this.clients = res;
    });
  }
  goTo(to: string) {
    this.router.navigate([to]);
  }
  getResult(i:number) {
this.folder.Reference=this.folderFormGroup.value['Reference'];
this.folder.Client=this.folderFormGroup.value['Client'].id;
this.folder.Type=this.folderFormGroup.value['Types'].id;
this.folder.Date=this.folderFormGroup.value['Date'];
this.folder.Number=this.folderFormGroup.value['Number'];

console.log(this.folder);

    this.searchserv.searchFolder(this.folder, i)
      .subscribe(res => {
        console.log(res);

        this.foldersResut = res['content'];
        const totalePages = res['totalPages'];
        this.resultTotal=res['totalElements'];
        this.totalpage2 = res['totalPages'];

        this.pages = new Array<number>(totalePages);
        this.NBel=res['numberOfElements']  as number;  
        if(this.load){
          this.NBelstock=this.NBel;
          this.load=false;
        }
     
      });
    this.isResult = true;
    console.log("simple earch")
  }
  changeSuit(e) {
    console.log(e.target.value);
  }

  public onSubmit() {
    this.next.emit('+');
    console.log('op'+this.operation)
    console.log('ld'+this.linkDoc)
    this.folderService.getFAvoritFoldersIds().subscribe(ids => {
      this.favoriteFoldersIds = ids;

      this.folderSelected.emit();
      console.log(this.folderFormGroup.value);
      if (this.operation === 'multi' && this.linkDoc === '1') {
        this.getFoldersToLinkWithDocument()

      }
      else if (this.operation !== 'multi' && this.linkDoc !== '1') {
        this.getResult(this.indexPage);


      }
      else {
        this.getResultToLink();
        console.log('2nd test');

      }
      this.savedSearch();
      this.isLoading = true;
    });
  }


  openFolder() { }
  selectFolder(f) {
    this.folderSelected.emit(f);
    if (this.operation !== 'multi') {
      sessionStorage.setItem('FTL', f['id'] as string);
    }





  }
  undo() {
    if (this.folderFormGroup.dirty) {
      this.folderFormGroup.reset();
    }
    else {

    }
  }
  saveSearch() {
    this.openSaveSearchModal();
  }

  openSaveSearchModal() {
   /*const saveRef = this.modalService.open(SaveSearchComponent, { centered: true });
    saveRef.componentInstance.search = this.search;
    console.log(this.search);*/
  }
  back() {
    this.isResult = false;
    this.foldersResut = null;
    this.next.emit('-');
    
  }
  savedSearch() {
    this.search = new Search();
    const attributes = new Array<SearchAttribute>();
    attributes[0] = new SearchAttribute(3, this.folder.reference == undefined ? '' : this.folder.reference.toString());
    attributes[1] = new SearchAttribute(5, this.folder.date == undefined ? '' : this.folder.date.toString());
    attributes[2] = new SearchAttribute(4, this.folder.number == undefined ? '' : this.folder.number.toString());
    attributes[3] = new SearchAttribute(1, this.folder.type == undefined ? '' : this.folder.type.toString());
    attributes[4] = new SearchAttribute(2, this.folder.client == undefined ? '' : this.folder.client.toString());
    this.search.attributes = attributes;
  }
  getResultToLink() {
    /*this.searchserv.searchFolderToLink(this.folder, sessionStorage.getItem('FTL'), this.page)
      .subscribe(res => {
        console.log(res);

        this.foldersResut = res['content'];
        const totalePages = res['totalPages'];
        this.pages = new Array<number>(totalePages);
        this.resultTotal=res['totalElements'];
        

        console.warn(res);
        console.warn(this.foldersResut);

      });
    this.isResult = true;*/
  }

  addToFavorite(folderId: number){
    this.folderService.addToFavorite(folderId)
    .subscribe(res => {
      console.log(res);
      this.folderService.getFAvoritFoldersIds().subscribe(ids => {
        this.favoriteFoldersIds = ids;
        this.isLoading = true;
        
      });
    })
  }

  goBack() {
    if(this.operation!=='multi')
    this.route.navigateByUrl('dashboard');
    else
    {
     this.back()
    }
  }
  valid() {
    this.validLink.emit();

  }



  checkIfChecked(f) {
    if (this.listOfSelectedFolders) {
      return (this.listOfSelectedFolders.indexOf(f['id']) !== -1);
    }
    return false;
  }


  getFoldersToLinkWithDocument() {
    /*this.searchserv.searchFoldersToLinkWithDocument(this.folder, this.DocumentId, this.page).subscribe(res => {
      console.log(res);

      this.foldersResut = res['content'];
      const totalePages = res['totalPages'];
      this.pages = new Array<number>(totalePages);
      this.resultTotal=res['totalElements'];


      console.warn(res);
      console.warn(this.foldersResut);
      this.isResult = true;

    });*/
  }

  setFolderId(f) {
   /* this.rest.setFolderId(f)
    const confRef = this.modalService.open(FolderToFoldersComponent, { centered: true, size: 'xl' });
    confRef.componentInstance.id = f;
    confRef.componentInstance.pass.subscribe(r => {
      confRef.dismiss();
    });*/
  }

}
