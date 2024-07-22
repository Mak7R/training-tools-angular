import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { IGroupsService } from '../interfaces/groups.service.interface';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements IGroupsService {
  private readonly apiUrl : string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getGroups(): Observable<GroupModel[]> {
    return this.http.get<GroupModel[]>(`${this.apiUrl}/groups`);
  }

  getGroupById(id: number): Observable<GroupModel> {
    throw new Error("Method not implemented.");
  }

  createGroup(group: GroupModel): Observable<GroupModel> {
    throw new Error("Method not implemented.");
  }

  updateGroup(id: number, group: GroupModel): Observable<GroupModel> {
    throw new Error("Method not implemented.");
  }

  deleteGroup(id: number): Observable<void> {
    throw new Error("Method not implemented.");
  }
}
