import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform, platforms } from 'src/app/models/utils/platform.model';

@Component({
  selector: 'app-link-platform-picker',
  templateUrl: './link-platform-picker.component.html',
  styleUrls: ['./link-platform-picker.component.css']
})
export class LinkPlatformPickerComponent implements OnInit {

  @Output() platform : EventEmitter<Platform> = new EventEmitter<Platform>();
  public platforms : Platform[] = platforms;

  ngOnInit(): void {
    this.platform.emit(this.platforms[0]);
  }

  public setDefaultPlatform(platformCode : string) : void {
    this.platforms.forEach(p => {
      if(p.code === platformCode){
        this.selectPlatform(p);
        this.platform.emit(p);
      }
    })
  }

  public otherPlatform : Platform = {
    name: 'Other',
    icon: '../../../assets/icons/plus.png',
    code: 'Other',
    color: '#40404033',
    selected : false
  }

  public selectPlatform(platform : Platform) : void {
    this.platform.emit(platform);
    platform.selected = true;
    this.platforms.forEach(p => { 
      if (p.code != platform.code) {
        p.selected = false;
      }
      if(platform.code !== 'Other') this.otherPlatform.selected = false;
    })
  }
}