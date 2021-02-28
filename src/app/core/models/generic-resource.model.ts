import { Observable } from 'rxjs';

export interface IGeneric<T, ID, Params> {
    save(t: T): Observable<T>;
    update(id: ID, t: T): Observable<T>;
    findOne(id: ID): Observable<T>;
    findAll(): Observable<T[]>;
    findWithParams(params: Params);
    delete(id: ID): Observable<any>;
    }