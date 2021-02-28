import { Injectable } from '@angular/core';
import { IGeneric } from '../models/generic-resource.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class GenericResourceService<T, ID, Params> implements IGeneric<T, ID, Params> {

  constructor(
    protected _http: HttpClient,
    protected _base: string) { }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }
  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(`${this._base}/${id}`, t, {});
  }
  findOne(id: ID): Observable<T> {
    return this._http.get<T>(`${this._base}/${id}`);
  }
  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base)
  }
  findWithParams(params: Params) {
    return this._http.get<T>(`${this._base}?${params}`);
  }
  delete(id: ID): Observable<any> {
    return this._http.delete<T>(`${this._base}/${id}`);
  }
}
