import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '../../../../utils/track-by';
import icPerson from '@iconify/icons-ic/twotone-person';
import icLogout from '@iconify/icons-ic/twotone-logout';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import icLock from '@iconify/icons-ic/twotone-lock';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import { Icon } from '@visurel/iconify-angular';
import { PopoverRef } from '../../../../components/popover/popover-ref';
import { LoginService } from 'src/app/pages/pages/auth/login/login.service';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent implements OnInit {

  userEmail: string;
  items: MenuItem[] = [
    {
      id: '1',
      icon: icAccountCircle,
      label: 'Perfil',
      description: 'Informações pessoais',
      colorClass: 'text-teal',
      route: '/apps/social'
    }
  ];

  trackById = trackById;
  icPerson = icPerson;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icArrowDropDown = icArrowDropDown;
  icBusiness = icBusiness;
  icVerifiedUser = icVerifiedUser;
  icLock = icLock;
  icNotificationsOff = icNotificationsOff;
  icLogout = icLogout;

  constructor(private cd: ChangeDetectorRef,
    private _loginService: LoginService,
    private popoverRef: PopoverRef<ToolbarUserDropdownComponent>) {
    this.userEmail = localStorage.getItem('HopeUserEmail');
  }

  ngOnInit() {
  }

  close() {
    this.popoverRef.close();
  }

  logout() {
    this._loginService.logout();
    window.location.href = '/login';
  }
}
