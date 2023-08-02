import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noProfileImage'
})
export class NoProfileImagePipe implements PipeTransform {

  public transform(profileImageUrl : string): string {
    return profileImageUrl ? profileImageUrl : '../../assets/icons/temp-user.jpg';
  }

}
