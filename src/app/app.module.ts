import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: 'heroes', component: HeroComponent }
];

@NgModule({
  declarations: [			
    AppComponent,
      HeroComponent,
      HeroDetailComponent,
      MessageComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],

  exports: [RouterModule],
  
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
