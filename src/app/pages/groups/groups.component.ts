import {Component, Inject, OnInit} from '@angular/core';
import {GroupListItemComponent} from "./components/group-list-item/group-list-item.component";
import {GroupsService} from "../../services/groups.service";
import {GroupModel} from "../../models/group.model";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../services/default-auth.service";
import {RemoveGroupModalComponent} from "./components/remove-group-modal/remove-group-modal.component";
import {UpdateGroupModalComponent} from "./components/update-group-modal/update-group-modal.component";
import {Role} from "../../constants/Role";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  standalone: true,
  imports: [
    GroupListItemComponent,
    NgForOf,
    NgIf,
    RemoveGroupModalComponent,
    UpdateGroupModalComponent
  ],
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  groups: GroupModel[] = [];
  protected isAdmin: boolean;
  constructor(private readonly groupService: GroupsService,
    @Inject("authService") protected readonly authService: AuthService) {
    this.isAdmin = authService.getIdentity().getUser()?.hasRoles([Role.Root, Role.Admin]) ?? false;
  }

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }
}
