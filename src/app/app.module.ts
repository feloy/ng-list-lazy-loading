import { CatsService } from './services/cats.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CatsListComponent } from './components/cats-list/cats-list.component';
import { CatComponent } from './components/cat/cat.component';

@NgModule({
  declarations: [
    AppComponent,
    CatsListComponent,
    CatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
