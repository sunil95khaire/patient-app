import { Patient } from './../models/patient';
import { PatientService } from './patient.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {
 @Input() patients: Patient[];
  oldpatients: Patient[];
  errorMessage: string;

  constructor(private service: PatientService) { }

  ngOnInit() {
    this.service.getPatients().subscribe(patients => {
      this.oldpatients = patients;
      this.patients = patients;
    }, error => this.errorMessage = <any>error);
  }

}
