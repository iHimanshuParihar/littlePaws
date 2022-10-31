import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Inject,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/shared/database.service';
import { StatusConfirmationComponent } from '../status-confirmation/status-confirmation.component';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetInfoComponent implements OnInit {
  confirmation: any;
  @Input() petsData: any[] = [];
  @Output() changeStatus = new EventEmitter<{}>();
  @Output() updatePetsInfoData = new EventEmitter<{}>();
  constructor(private database: DatabaseService, private dialog: MatDialog) {}
  panelOpenState = false;
  ngOnInit(): void {}

  changeAdoptionStatus(id: string) {
    // let confirmation;
    let dialogRef = this.dialog.open(StatusConfirmationComponent, {
      data: { confirmation: this.confirmation },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if(confirmation == "yes")
      console.log('some value', result);
      if (result == 'confirm') {
        this.changeStatus.emit({ id: id, adopted: 'true' });
      }
    });
  }

  updatePetsInfo(id: string) {
    for (let i = 0; i < this.petsData.length; i++) {
      if (this.petsData[i].documentID == id) {
        console.log('chid', this.petsData[i]);
        this.updatePetsInfoData.emit(this.petsData[i]);
      }
    }
  }
}
