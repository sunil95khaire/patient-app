import { PatientService } from './patient/patient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatePatientComponent } from './patient/create-patient.component';
import { ListPatientsComponent } from './patient/list-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePatientComponent,
    ListPatientsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
