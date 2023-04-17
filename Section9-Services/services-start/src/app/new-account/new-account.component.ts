import { Component, EventEmitter, Output } from '@angular/core';
import {LoggingService} from "../services/logging.service";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService , private accountService : AccountsService) {
    this.accountService.statusUpdated.subscribe(
      (status : string) => alert('New status ' + status)
    )
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.onAccountAdded({name: accountName, status:accountStatus})
    this.loggingService.logStatusChange(accountStatus)
  }
}
