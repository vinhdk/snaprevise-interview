import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';

import { AppRoutes } from './app.routing';

import { MainComponent } from './containers';
import {
  HeaderComponent,
  NavComponent,
  PaperComponent,
  ModuleComponent,
  QuestionComponent,
  TopicComponent,
  ItemComponent
} from './components';
import {
  faChevronDown,
  faDownload,
  faGripLines,
  faPencilAlt,
  faPlus,
  faTrashAlt,
  faUpload
} from '@fortawesome/free-solid-svg-icons';

const CONTAINERS = [MainComponent];
const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  NavComponent,
  PaperComponent,
  ModuleComponent,
  QuestionComponent,
  TopicComponent,
  ItemComponent
];

@NgModule({
  declarations: [...COMPONENTS, ...CONTAINERS],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    DragDropModule,
    NgxSmoothDnDModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(protected readonly library: FaIconLibrary) {
    library.addIcons(faPencilAlt, faTrashAlt, faPlus, faDownload, faUpload, faGripLines, faChevronDown);
  }
}
