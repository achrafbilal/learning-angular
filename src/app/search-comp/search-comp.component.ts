import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
//import { ConfirmationComponent } from '../application/modal/confirmation/confirmation.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { EditSearchComponent } from '../application/edit-search/edit-search.component';
import { Search } from '../modules/search/search.module';
import { RestSearchApiService } from '../Service/rest-search-api.service';
import { SessionService } from '../Service/session.service';

@Component({
  selector: 'app-search-comp',
  templateUrl: './search-comp.component.html',
  styleUrls: ['./search-comp.component.scss'],
})
export class SearchCompComponent implements OnInit {
  @Input() search: Search;
  @Output() refresh = new EventEmitter<any>();
  @Output() goResult = new EventEmitter<any>();

  constructor(private route: Router,
              private searchService: RestSearchApiService,
             // private modal: NgbModal,
              public session: SessionService) {
               }

  ngOnInit(): void {

  }
  goTo() {
    this.goResult.emit(this.search);
  }
  delete() {
/*
    const confRef = this.modal.open(ConfirmationComponent, { centered: true });
    confRef.componentInstance.target = 'recherche';
    confRef.componentInstance.pass.subscribe(resp => {
      if (resp === 'yes') {
        this.searchService.deleteSearch(this.search.id).subscribe(res => {
          this.refresh.emit();

        },
          err => {
            // this.openModale(0, 'Suppression', 'Le dossier est containe des documents veuillez vider premièrement')
          });

      }
      confRef.dismiss();
    });*/



  }
  edit()
  {/*
  const editRef=this.modal.open(EditSearchComponent,{centered : true});
  editRef.componentInstance.search=this.search;
  editRef.result.finally( ()=>{
    this.refresh.emit();

  }
  )*/
  }


}
