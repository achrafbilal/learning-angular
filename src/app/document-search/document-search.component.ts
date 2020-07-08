import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, IonSlides } from '@ionic/angular';
import { Document } from 'src/app/modules/document/document.module';
//import { WsService } from 'src/app/services/sockets/ws.service';
//import { EditDocumentService } from 'src/app/services/edit-document.service';
import { Router } from '@angular/router';
//import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { OperationResultModalComponent } from '../modal/operation-result-modal/operation-result-modal.component';
import { EditListDocService } from 'src/app/Service/edit-list-doc.service';
//import { DocumentType } from 'src/app/services/data/models/document-type';
//import { FoldersLinkComponent } from '../modal/folders-link/folders-link.component';
import { RestDataApiService } from '../Service/rest-data-api.service';
import { FileModel } from '../modules/file/file.module';
import { Attributes } from '../modules/attributes/attributes.module';
import { Attribute } from '../modules/attribute/attribute.module';
import { RestSearchApiService } from '../Service/rest-search-api.service';
import { ViewerComponent } from '../viewer/viewer.component';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IonicSelectableModule } from 'ionic-selectable';
@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss']
})
export class DocumentSearchComponent implements OnInit {
  isload:boolean = true;
  docID:string;
  fileModel = new FileModel();
  attributesForm = new FormArray([]);
  doctypes ;
  attributes: Attributes[];
  documentInfos;
  documentModel: Document = new Document();
  documentSearch: Document[];
  docFormGroup: FormGroup;
  attr: Attribute[];
  base64file: string;
  isResult = false;
  Numerodoc:number;
  Numberdoc:boolean = false;
  detail:boolean = false;
  Viewer:boolean = false;
  @Output() documentSelected = new EventEmitter();
  page: number=0;
  pages: Array<number>;
name:string;
resultTotal;
  @Input() link: string;
  public totalpage2:number;
  public ActiveIndex:number ;
  public NextSlide:number ;
  public indexPage:number = 0;
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



  constructor(private rest: RestDataApiService,
    public alertController: AlertController,
    private fb: FormBuilder,
    private rt: Router,
    private srv: RestSearchApiService,
    /*private ws: WsService,
    private srvDoc: EditDocumentService,
    private modal: NgbModal,*/
    private docserv:EditListDocService,
    private loadingController: LoadingController,
    private router: Router

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
      this.setUpForm();
      this.getDocsTypes();
      if(localStorage.getItem('isloadDOC')=='ok'){
        localStorage.setItem('isloadDOC','Notok')
     location.reload();
    

     console.log('Load test');
         }

    }

  ngOnInit(): void {
    this.setUpForm();
    this.getDocsTypes();
    
   // window.location.reload();
  }
  goTo3() {

    window.location.reload();
console.log('gooo');
}
  goTo(to: string) {
    this.router.navigate([to]);
  }
  goToSearch() {
    this.router.navigate(['/RechercheAvancee']);
    this.attrsForms.clear();
  }

  setUpForm() {
    this.docFormGroup = this.fb.group({
      type: ['', Validators.required],

      attrs: this.fb.array([])
    });
  }
  
  getResult(i:number) {


    this.isResult = true;
    this.onSubmit(i);
  
  }
  ShowViewer() {


    this.Viewer= true;
  
  }
  get attrsForms() {
    return (this.docFormGroup.get('attrs') as FormArray); 
  }


  getDocsTypes() {

    this.docserv.getlist().subscribe(
      res => {
        this.doctypes = res;

        for (let i = 0; i < this.doctypes.length; i++) {
          console.log();
        }
      }
    );

  }

  clear() {
    this.docFormGroup.reset();
  }


  changeType(e) {
   console.log('Event'+e)
   console.log('Event'+e.value.id)
    this.attrsForms.clear();
 
    let aa: Attributes[];
    this.srv.getTypeName(e.value.id).subscribe(r=>{this.name=r["name"]})
   
   
    this.rest.getDocTypesAttributes(e.value.id).subscribe(

      (res: Attributes[]) => {

        aa = res as Attributes[];
        this.attributes = aa;
        for (const item of Object.keys(aa)) {
          const eventItem = this.attributes[item];
          this.addAttr(eventItem.id, eventItem.type.name, eventItem.name);
        }

      },
      err => { console.warn(err.data); }
    );
     console.log('Fiiiin')
  }




  addAttr(id: number, type: string, name: string) {
    const attr = this.fb.group({
      id,
      type,
      name,
      val: ['', Validators.required],

    });

    this.attrsForms.push(attr);

  }
  openFile(e: Document) {

    this.docID=  e.id;
    this.router.navigate(['/Viewer',this.docID]);
   // this.router.navigate([`Viewer/${this.docID}`])
   // this.Viewer= true;
  }
  /*openFile(e: Document) {
    this.fileModel.fileId = e.id;
    this.fileModel.fileName = e.fileName;
   // this.ws.openFile(this.fileModel)
  }*/
  goBack() {
    this.isResult = false;
  }

    onSubmit(i:number) {
    /*const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();*/
    //this.documentModel.type=this.docFormGroup.value['Type'].id;

   /* this.documentModel = this.docFormGroup.value;
    this.documentModel.type=this.docFormGroup.value.type.id;*/
    this.documentModel.type=this.docFormGroup.value.type.id;
    this.documentModel.attrs=this.docFormGroup.value.attrs;
   
   // console.log(this.docFormGroup.value.type.id);
    console.log(this.documentModel.type);
    console.log(this.docFormGroup.value.attrs);
     this.srv.searchDo(this.documentModel, i).subscribe((resp) => {
      this.Numberdoc=false;
      this.documentSearch = resp["content"];
      const totalePages = resp['totalPages'];
      this.resultTotal=resp['totalElements'];
      this.Numerodoc =resp['totalElements'];
      if(this.Numerodoc==0){
        this.Numberdoc=true;
      }
      this.totalpage2 = resp['totalPages'];
      this.pages = new Array<number>(totalePages);
      this.NBel=resp['numberOfElements']  as number;  
      if(this.load){
        this.NBelstock=this.NBel;
        this.load=false;
      }
      
      
      /*this.attr = this.documentSearch[0].attrs
      console.log(this.attr);*/
      this.documentSelected.emit();
      //loading.dismiss();
    })

  }
  getDocToUp(e: Document) {
    /*this.srvDoc.getDoc(e);
    this.rt.navigateByUrl("/dashboard/documents/edit")*/
  }
  totalePages: number;

  async goPage(i) {
    
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    this.page=i;
    this.srv.searchDo(this.documentModel, i).subscribe((resp) => {
      this.documentSearch = resp["content"];
      //  this.attr=this.documentSearch[0].attrs
      loading.dismiss();
    }
    )
  }
  supp(id: string) {
  /*  this.srvDoc.delete(id).subscribe(res => { if (res) { alert("supprimé") } })*/
  }
  linkClick(dc) {
    this.documentSelected.emit(dc);
  }
  openModale(state?, target?, message?) {
    const modalRef = null/*this.modal.open(OperationResultModalComponent, { centered: true })*/;
    modalRef.componentInstance.object = 'la document';
    modalRef.componentInstance.operation = target ?? 'Modification';
    modalRef.componentInstance.result = state == 1 ? 'succès' : 'echoue';
    modalRef.componentInstance.name = '';
    modalRef.componentInstance.message = message;
  }
  onDelete(id) {
/*
    const confRef = this.modal.open(ConfirmationComponent, { centered: true });
    confRef.componentInstance.target = 'document';
    confRef.componentInstance.pass.subscribe(resp => {
      if (resp === 'yes') {
        this.srvDoc.delete(id).subscribe(res => {
          if (res) {
            this.openModale(1, 'Suppression');
            this.onSubmit();
          }
        },
          err => {
            //this.openModale(0, 'Suppression', 'Le dossier est containe des documents veuillez vider premièrement')
          });

      }
      confRef.dismiss();
    });*/
  }
  btnPlusInfosOld(infos) {/*
if (this.documentInfos == infos) {
      $('#plusInfos').toggle(500);
      
    } else {
      this.documentInfos = infos;
 
    }*/
  }
   btnPlusInfos2(infos) {

    if (infos) {
      this.documentInfos = infos;
      this.detail=true;
      
    }

    // if (this.documentInfos == infos) {
    //   this.detail=true;
      
    // }
  }
  async Guide(infos) {
    if (this.documentInfos == infos) {
     
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Détail document:',
      message:'Merci de glisser vers la gouche pour voir le détail de document . '
      ,
    
      buttons: ['OK']
    });
    

    await alert.present();}
    else {
      this.documentInfos = infos;}
  }
 

  async btnPlusInfos(infos) {
    if (this.documentInfos == infos) {
      for (let index = 0; index < this.documentInfos.length; index++) {
        
        types: String = this.documentInfos.attrs[index].name ;
        val: String = this.documentInfos.attrs[index].val ;
       }
    let alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Détail document:',
      message:' <strong>Type :</strong>'+this.name+ '</br>'
      +' <strong>'+this.documentInfos.attrs[0].name +' : </strong>'+this.documentInfos.attrs[0].val+ '</br>'
      +' <strong>'+this.documentInfos.attrs[1].name +' : </strong>'+this.documentInfos.attrs[1].val+ '</br>'
      +' <strong>'+this.documentInfos.attrs[2].name +' : </strong>'+this.documentInfos.attrs[2].val+ '</br>'
      +' <strong>'+this.documentInfos.attrs[3].name +' : </strong>'+this.documentInfos.attrs[3].val+ '</br>'
      +' <strong>'+this.documentInfos.attrs[4].name +' : </strong>'+this.documentInfos.attrs[4].val+ '</br>'
      
    /*  +' <ng-container *ngFor="let attributesvalues of documentInfos.attrs">'+
      '<ng-container *ngIf="attributesvalues.id!=6">'+
          '<h6 class="card-subtitle mt-1">{{attributesvalues.name}}</h6>'+
          '<p class="card-subtitle  text-muted">{{attributesvalues.val}}</p>'+
      '</ng-container>'*/,
    
      buttons: ['OK']
    });
    

    await alert.present();}
    else {
      this.documentInfos = infos;}
  }
 
    
  setDocId(dc)
  {/*
   this.srv.setFoldersBydoc(dc.id);
   
    const confRef=  this.modal.open(FoldersLinkComponent,{ centered: true,size:'xl' },);
    confRef.componentInstance.pass.subscribe(r=>{
    confRef.dismiss();
    });*/
  }
  back() { }

}
