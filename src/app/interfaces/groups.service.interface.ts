import { Observable } from 'rxjs';
import {GroupModel} from "../models/group.model";

export interface IGroupsService {
  getGroups(): Observable<GroupModel[]>;
  getGroupById(id: number): Observable<GroupModel>;
  createGroup(group: GroupModel): Observable<GroupModel>;
  updateGroup(id: number, group: GroupModel): Observable<GroupModel>;
  deleteGroup(id: number): Observable<void>;
}
