import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Platform } from 'src/app/models/utils/platform.model';

@Component({
  selector: 'app-link-platform-picker',
  templateUrl: './link-platform-picker.component.html',
  styleUrls: ['./link-platform-picker.component.css']
})
export class LinkPlatformPickerComponent implements OnInit {

  @Output() platform : EventEmitter<Platform> = new EventEmitter<Platform>();
  public platforms : Platform[] = [
    {
      name: 'Notion',
      icon: '../../../assets/icons/notion-platform.png',
      code: 'Notion',
      color: '#40404033',
      selected : true
    },
    {
      name: 'OneDrive',
      icon: '../../../assets/icons/one-drive-platform.png',
      code: 'OneDrive',
      color: '#256E8EB2',
      selected : false
    },
    {
      name: 'Drive',
      icon: '../../../assets/icons/google-drive-platform.png',
      code: 'GoogleDrive',
      color: '#0084FF26',
      selected : false
    },
    {
      name: 'Evernote',
      icon: '../../../assets/icons/evernote-platform.png',
      code: 'Evernote',
      color: '#1ECF4526',
      selected : false
    },
    {
      name: 'Dropbox',
      icon: '../../../assets/icons/dropbox-platform.png',
      code: 'Dropbox',
      color: '#256E8E26',
      selected : false
    }
  ];

  ngOnInit(): void {
    this.platform.emit(this.platforms[0]);
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