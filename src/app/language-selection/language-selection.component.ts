import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ObservableMedia} from '@angular/flex-layout';

export const supportedLanguages = [
  {code: 'en', displayName: 'English'},
  {code: 'bg', displayName: 'Bulgarian'},
];

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {

  languages = this.sortAlphabetically(supportedLanguages);
  currentLanguage = 'en';

  constructor(private translate: TranslateService, private om: ObservableMedia) {
  }

  isMobile = false;

  ngOnInit() {
    this.isMobile = !this.om.isActive('gt-md');
    this.om.asObservable().subscribe(() => {
      this.isMobile = !this.om.isActive('gt-md');
    });
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  private sortAlphabetically(languages: any[]) {
    return languages.sort((a, b) => (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0));
  }
}
