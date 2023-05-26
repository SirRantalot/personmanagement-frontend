import {Component} from '@angular/core';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {

  protected messageSaved = '';
  protected messageError = '';
  protected messageNewSaved = '';
  protected messageNewError = '';
  protected messageClose = '';
  protected deletedMessage = '';
  protected deleteErrorMessage = '';
  protected closeMessage = '';

}
