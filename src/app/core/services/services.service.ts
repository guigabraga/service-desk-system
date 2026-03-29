import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { IServicesObject } from '../models/services-schemas/services-schemas';
import dayjs from 'dayjs';

type TDataForm = Omit<IServicesObject, 'id' | 'status' | 'createDate'>;
type TCreateService = Omit<IServicesObject, 'id'>;

@Injectable({
  providedIn: 'root',
})

export class ServicesService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost/services'

  getAll(): Observable<IServicesObject[]> {
    return this.http.get<IServicesObject[]>(this.apiUrl).pipe(
      timeout(5000)
    )
  }

  create(data: TDataForm) {
    const newData: TCreateService = {
      ...data,
      status: 'Aberto',
      createDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    return this.http.post<IServicesObject>(this.apiUrl, newData).pipe(
      timeout(5000)
    )
  }

  updateStatus(id: string, status: IServicesObject['status']): Observable<IServicesObject> {
    return this.http.patch<IServicesObject>(`${this.apiUrl}/${id}`, { status });
  }
}
