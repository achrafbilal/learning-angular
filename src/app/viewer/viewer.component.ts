import { Component, OnInit, Input } from '@angular/core';
import { ViewerService } from './viewer.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import * as Tiff from 'browser-tiff.js';
import { WindowService } from 'src/app/service/window.service';
import { ActivatedRoute, Router } from '@angular/router';

// var fs = FsIO;
declare function importScripts(params: string);

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  @Input() documentId;
  uri: SafeResourceUrl;
  isLoading = true;
  file;
  tiff : Tiff;
  tiffPages=1;
  page = 0;
  fileType: string;


  constructor(private viewerService: ViewerService, private sanitizer: DomSanitizer, private WINDOW: WindowService ,private route:ActivatedRoute,private router: Router) {
                Tiff.initialize({TOTAL_MEMORY : 2000000});
   }


  ngOnInit(): void {
    
    this.route.paramMap.subscribe(param => {
          this.documentId=param.get("id");
         // this.isLoading = false;
          this.viewerService.getFileToView(this.documentId).subscribe(res => {
            this.file = res;
            this.fileType=this.file.contentType.split('/')[0];
            if(this.fileType!=='image')
            {
              
              this.uri = this.sanitizer.bypassSecurityTrustResourceUrl('assets/ViewerJS/index.html#' + res['fileData']);
              this.isLoading = false;
      
            }
            else{
              this.tiff = new Tiff( { buffer : this.base64ToArrayBuffer(res['fileData'])});
              this.tiffPages=this.tiff.countDirectory();
              this.page=this.tiff.currentDirectory();
              const canvas = this.tiff.toCanvas()
              console.log(this.tiff.getField(1))
              
      
              const element = document.getElementById('#ImageView');
              console.log(element)
              element.append(canvas);
            }
            sessionStorage.setItem('vfileName', res['fileName'] as string);
          });
        })

     
  }


  base64ToArrayBuffer(base64) : ArrayBuffer {
    const byteCharacters = atob(base64.split(',')[1]);
    const len = byteCharacters.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = byteCharacters.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  goPage(pageIndex){
    
    this.tiff.setDirectory(pageIndex);
    const canvas = this.tiff.toCanvas()
    console.log(canvas)
    document.getElementById('ImageView').appendChild(canvas);
  }

  PreviousPage(){
   if(this.page!==0)
   {
    document.getElementById('ImageView').innerHTML="";
    this.page=--this.page;
    this.goPage(this.page);
   }
  }
  NextPage(){
    if(this.page!==this.tiffPages-1)
    {
    document.getElementById('ImageView').innerHTML=""
     this.page=++this.page;
     this.goPage(this.page);
    }
  }

  onDownload(sliceSize = 512) {
    const b64Data = this.file.fileData as string;
    const contentType = this.file.contentType;
    const byteCharacters = atob(b64Data.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = this.file.fileName;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }
  goTo(to: string) {
    this.router.navigate([to]);
  }
}
