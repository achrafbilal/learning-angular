import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecherceAvanceeComponent } from './recherce-avancee/recherce-avancee.component';
import { ViewerComponent } from './viewer/viewer.component';
import { FolderSearchComponent } from './folder-search/folder-search.component';
import { FavoriteFolder } from './modules/favorite-folder/favorite-folder.module';
import { FavoriteFoldersComponent } from './favorite-folders/favorite-folders.component';
import { FoldersListComponent } from './folders-list/folders-list.component';
import { FolderslistweekComponent } from './folderslistweek/folderslistweek.component';
import { FolderslistMonthComponent } from './folderslist-month/folderslist-month.component';
import { FolderslistYearComponent } from './folderslist-year/folderslist-year.component';
import { MostSearchsComponent } from './most-searchs/most-searchs.component';


const routes: Routes = [
 /* {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Acceuil', component: AcceuilComponent }, 
  { path: 'RechercheAvancee', component: RecherceAvanceeComponent },
  { path: 'documentSearch', component: DocumentSearchComponent },
  { path: 'foldersearch', component: FolderSearchComponent },
  { path: 'favfolder', component: FavoriteFoldersComponent },
  { path: 'folderslist', component: FoldersListComponent },
  { path: 'folderslistweek', component: FolderslistweekComponent },
  { path: 'folderslistMonth', component: FolderslistMonthComponent},
  { path: 'folderslistYear', component: FolderslistYearComponent },
  { path: 'Viewer/:id', component: ViewerComponent },
  { path: 'Rechfreq', component: MostSearchsComponent },
  { path: 'Menu', component: DashboardComponent ,
  
  children:[
   
   ] },
 
  //{ path: 'document-search', component:DocumentSearchComponent },
  /*{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
