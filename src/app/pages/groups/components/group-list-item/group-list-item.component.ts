import {Component, Inject, Input} from '@angular/core';
import {GroupModel} from "../../../../models/group.model";
import {IAuthService} from "../../../../interfaces/auth.service.interface";
import {NgIf} from "@angular/common";
import {UpdateGroupModalComponent} from "../update-group-modal/update-group-modal.component";
import {RemoveGroupModalComponent} from "../remove-group-modal/remove-group-modal.component";
import {Role} from "../../../../constants/Role";

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  standalone: true,
  imports: [
    NgIf,
    UpdateGroupModalComponent,
    RemoveGroupModalComponent
  ],
  styleUrl: './group-list-item.component.css'
})
export class GroupListItemComponent {
  @Input() group!: GroupModel;

  protected isAdmin : boolean;

  constructor(@Inject("authService") protected readonly authService: IAuthService) {
    this.isAdmin = authService.getIdentity().getUser()?.hasRoles([Role.Root, Role.Admin]) ?? false;
  }
}
