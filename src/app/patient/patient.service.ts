import { City } from './../models/city';
import { State } from './../models/state';
import { Patient } from './../models/patient';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _baseUrl = 'http://localhost:50660/api/Patient/';

  constructor(private _http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    let url = this._baseUrl + 'GetPatients';
    return this._http.get<Patient[]>(url).pipe(tap(), catchError(this.handleError), );
  }

  getStates(): Observable<State[]> {
    let url = this._baseUrl + 'GetStates';
    return this._http.get<State[]>(url).pipe(tap(), catchError(this.handleError), );
  }

  getCities(): Observable<City[]> {
    let url = this._baseUrl + 'GetCities';
    return this._http.get<City[]>(url).pipe(tap(), catchError(this.handleError), );
  }

  getStateCities(stateId: number): Observable<City[]> {
    let url = this._baseUrl + 'GetStateCities?stateId=' + stateId;
    return this._http.get<City[]>(url).pipe(tap(), catchError(this.handleError), );
  }

  savePatient(patient: Patient): Observable<any> {
    let url = this._baseUrl + 'SavePatient';
    let body = JSON.stringify(patient);
    return this._http.post(url, body, httpOptions).pipe(tap(), catchError(this.handleError), );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
}
