import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'mdg-insta-modal',
  templateUrl: './insta-modal.component.html',
  styleUrls: ['./insta-modal.component.scss'],
})
export class InstaModalComponent implements OnInit{
  embedUrl: string = "https://www.instagram.com/p/Bd9Q-FWAFw_/";
  active: boolean;
  imageData: any;
  imageWidth: number;
  imageHeight: number;
  imageOrientation: string;
  isMobileFlag: boolean;

  constructor(private sanitizer: DomSanitizer) { }

  openModal(imageData){
    this.active = true;
    $('body').css('position','fixed').css('overflow-y','scroll'); //fix this
    this.imageData = imageData;
    this.embedUrl = imageData.link;
    console.log(imageData);
    this.imageHeight = parseInt(this.imageData.images.standard_resolution.height);
    this.imageWidth = parseInt(this.imageData.images.standard_resolution.width);
    this.setImageOrientation(this.imageHeight, this.imageWidth);
  }
  
  setImageOrientation(imageHeight, imageWidth){
    switch (imageWidth < imageHeight ){
      case false:
        this.imageOrientation = 'h';
        break;
      case true:
        this.imageOrientation = 'v';
        break;
    }
  }

  closeModal(){
    this.active = false;
    this.embedUrl = "https://www.instagram.com/p/Bd9Q-FWAFw_/"
    $('body').css('position','relative').css('overflow-y','scroll'); //fix this
  }

  modalUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl+"embed/?cr=1&v=8&wp=987#%7B%22ci%22%3A0%2C%22os%22%3A954.235%7D");
  }
  iframeWidth(){
    if (parseInt($('.modal-container').css('width'))< 500){
      this.isMobileFlag = true;
    } else {
      this.isMobileFlag = false;
    }
    if (this.isMobileFlag) {
      if (this.imageOrientation === 'v'){ return parseInt($('.modal-container').css('width'))-100}
      return parseInt($('.modal-container').css('width'));
    }
    return (this.imageOrientation === 'h') ? this.imageWidth :  '508';
  }

  iframeHeight(){
    let windowHeight = parseInt($('.modal-container').css('height'));    
    let windowWidth = parseInt($('.modal-container').css('width'));    
    let headerHeight = 54;
    let textHeight = 40+24+44;
    let iFrameHeight = this.imageHeight+headerHeight+textHeight;
    if (this.isMobileFlag) {
      if (this.imageOrientation === 'v'){
        return (this.imageHeight/this.imageWidth*(windowWidth-100))+headerHeight+textHeight;
      }
      return (this.imageHeight/this.imageWidth*windowWidth)+headerHeight+textHeight;
    }

    return (this.imageOrientation === 'h') ? iFrameHeight : this.imageHeight/this.imageWidth*508+headerHeight+textHeight;


    // if (this.imageHeight === this.imageWidth) return 500+headerHeight+textHeight;
    // return (iFrameHeight < 788)? iFrameHeight : '678' ;
  }

  ngOnInit() {  }
}
