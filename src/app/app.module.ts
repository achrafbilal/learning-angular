import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RestDataApiService } from './Service/rest-data-api.service';
import { RestSearchApiService } from './Service/rest-search-api.service';
import { LoginComponent } from './login/login.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { RestApiService } from './Service/rest-api-service.service';
import { EditListDocService } from './Service/edit-list-doc.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RecherceAvanceeComponent } from './recherce-avancee/recherce-avancee.component';
import { ViewerComponent } from './viewer/viewer.component';
import { WindowService } from './service/window.service';
import { ViewerService } from './viewer/viewer.service';
import { WINDOW_PROVIDERS } from './window.providers';
//import {RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { FolderSearchComponent } from './folder-search/folder-search.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DataSharingService } from './Service/data-sharing.service';
import { EditDocumentService } from './Service/edit-document.service';
import { FolderService } from './Service/folder.service';
import { PreviousRouteService } from './Service/previous-route.service';
import { SessionService } from './Service/session.service';
import { MostSearchsComponent } from './most-searchs/most-searchs.component';
import { SearchCompComponent } from './search-comp/search-comp.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { FavoriteFoldersComponent } from './favorite-folders/favorite-folders.component';
import { FoldersListComponent } from './folders-list/folders-list.component';
import { FolderComponent } from './folder/folder.component';
import { FolderslistweekComponent } from './folderslistweek/folderslistweek.component';
import { FolderslistMonthComponent } from './folderslist-month/folderslist-month.component';
import { FolderslistYearComponent } from './folderslist-year/folderslist-year.component';
//import { SelectSearchableModule } from 'ionic-select-searchable';
import { IonicSelectableModule } from 'ionic-selectable';




@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      DocumentSearchComponent,
      AcceuilComponent,
      DashboardComponent,
      RecherceAvanceeComponent,
      ViewerComponent,
      FolderSearchComponent,
      MostSearchsComponent,
      SearchCompComponent,
      DocumentsListComponent,
      FavoriteFoldersComponent,
      FoldersListComponent,
      FolderslistweekComponent,
      FolderslistMonthComponent,
      FolderslistYearComponent,
      FolderComponent,
      
      
   ],
   entryComponents: [],
   imports: [
      CommonModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
     RxReactiveFormsModule,
     IonicSelectableModule
      
   
    // SelectSearchableModule
     
     //IonicSelectableModule

      
      // RouterModule.forRoot([\npath])
   ],
   providers: [
      StatusBar,
      SplashScreen,
      RestDataApiService,
      RestSearchApiService,
      RestApiService,
      EditListDocService,
      WINDOW_PROVIDERS,
      WindowService,
      ViewerService,
      DataSharingService,
      EditDocumentService,
      FolderService,
      PreviousRouteService,
      SessionService,
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
