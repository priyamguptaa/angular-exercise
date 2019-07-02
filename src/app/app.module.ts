import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { BookingComponent } from './components/booking/booking.component';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListServiceService } from './components/list/list-service.service';
import { BookingServiceService } from './components/booking/booking-service.service';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ListServiceService,
    BookingServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
