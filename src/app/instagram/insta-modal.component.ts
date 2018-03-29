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
  isMobileFlag: boolean = false;

  constructor(private sanitizer: DomSanitizer) { }

  openModal(imageData){
    this.imageData = imageData;
    this.embedUrl = imageData.link;
    this.active = true;
    $('body').css('position','fixed').css('overflow-y','scroll'); //fix this
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
    let imageHeight = parseInt(this.imageData.images.standard_resolution.height);
    let imageWidth = parseInt(this.imageData.images.standard_resolution.width);
    if (this.isMobileFlag) {
      return parseInt($('.modal-container').css('width'));
    }
    return (imageWidth > imageHeight) ? imageWidth :  '410';
  }

  iframeHeight(){
    let imageHeight = parseInt(this.imageData.images.standard_resolution.height);
    let imageWidth = parseInt(this.imageData.images.standard_resolution.width);
    let windowHeight = parseInt($('.modal-container').css('height'));    
    let windowWidth = parseInt($('.modal-container').css('width'));    
    let headerHeight = 54;
    let textHeight = 40+24+44;
    let iFrameHeight = imageHeight+headerHeight+textHeight;
    if (imageHeight === imageWidth) return 500+headerHeight+textHeight;
    if (this.isMobileFlag) {
      return (imageHeight/imageWidth*windowWidth)+headerHeight+textHeight;
    }
    return (iFrameHeight < 788)? iFrameHeight : '678' ;
  }

  ngOnInit() {  }
}
