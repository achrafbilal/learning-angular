import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestSearchApiService } from '../Service/rest-search-api.service';
import { PreviousRouteService } from '../Service/previous-route.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-most-searchs',
  templateUrl: './most-searchs.component.html',
  styleUrls: ['./most-searchs.component.scss'],
})
export class MostSearchsComponent implements OnInit {


  currentSearchId;
  totalePages: number;
  searchesList;
  page = 0;
  pages: number[] = new Array<number>();
  pageSize;
  result= false;
  currentSearchName: any;
  countOfSearches=0;

  
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


  
  constructor(private searchServ: RestSearchApiService,
              private previous: PreviousRouteService,
              private route: Router,
              private router:Router) {


  }
  LoadNext(){
    this.slideWithNav.getActiveIndex().then(res=>{
      this.ActiveIndex=res;
     console.log('Next/'+res);
     this.getSearchs(res);
     if((this.totalpage2-1)==this.ActiveIndex){
       this.NBelstock=this.countOfSearches;
    
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
     this.getSearchs(res);
     this.NBelstock-=this.NBel;
     console.log('numberofelement/'+this.NBel);
     console.log('varstock/'+this.NBelstock);
    // console.log('countold/'+this.resultTotal);
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




  ngOnInit(): void {
    this.getSearchs(this.indexPage);

  }
  getSearchs(i:number){
    this.searchServ.getFrequencySearcheq(i).subscribe(
      res => {
        this.searchesList = res['content'];
        const totalePages = res['totalPages'];
        this.countOfSearches=res['totalElements'];
        this.totalpage2 = res['totalPages'];

        this.pages = new Array<number>(totalePages);
        this.NBel=res['numberOfElements']  as number;  
        if(this.load){
          this.NBelstock=this.NBel;
          this.load=false;
        }
        // tslint:disable-next-line: new-parens
        this.pages.length = totalePages;
        console.log(this.totalePages);
       });

  }
  goPage(i){
    this.page = i;
   // this.getSearchs();
  }
  refresh(e){
   // this.getSearchs();

  }
  getResult(e)
  {
  this.result = true;
  this.currentSearchId = e.id;
  this.currentSearchName = e.name;
  console.log(e);
  }

  goTo(to: string) {
    this.router.navigate([to]);
  }

  goBack(){
    if (!this.result) {
   this.route.navigateByUrl('dashboard');
    }
    else{
      this.result=false;
    }
  }

}
