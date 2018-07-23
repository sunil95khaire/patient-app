import { City } from "./../models/city";
import { PatientService } from "./patient.service";
import { State } from "./../models/state";
import { Patient } from "./../models/patient";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-patient",
  templateUrl: "./create-patient.component.html",
  styleUrls: ["./create-patient.component.css"]
})
export class CreatePatientComponent implements OnInit {
  patients: Patient[];
  states: State[];
  cities: City[];
  errorMessage: string;
  minAge: Date;
  maxAge:Date;

  patient: Patient = new Patient();

  constructor(private service: PatientService) {}

  ngOnInit() {
    this.patient.CityId = -1;
    this.patient.StateId = -1;
    this.patient.Gender = null;
    var today = new Date();
    this.minAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    this.maxAge = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    this.service.getStates().subscribe(states => {
      this.states = states;
    }, error => (this.errorMessage = <any>error));
  }

  getCities() {
    this.service.getStateCities(this.patient.StateId).subscribe(cities => {
      this.cities = cities;
    }, error => (this.errorMessage = <any>error));
  }

  getPatients() {
    this.service.getPatients().subscribe(patients => {
      this.patients = patients;
    }, error => (this.errorMessage = <any>error));
  }

  savePatient(patientForm: NgForm): void {
    var pat = Object.assign({}, this.patient);
    this.service.savePatient(pat).subscribe(pat => {
      this.getPatients();
    }, error => (this.errorMessage = <any>error));
    patientForm.reset();
  }

  keyPress(event: any) {
    const pattern = /[a-zA-Z \-\']/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
