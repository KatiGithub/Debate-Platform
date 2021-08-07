import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirestoreService } from '../../../services/Firestore/firestore.service';
import { FormatConstants } from '../../../constants/format_constants';
import { FormControl } from '@angular/forms';
import { validateEventsArray } from '@angular/fire/firestore';

class Format {
  constructor(public value: string) {}
}

interface Time {
  value: number;
  viewValue: string;
}

// export interface TableInterface {
//   name: string;
//   position: string;
// }

class FormatPos {
  constructor(public pos: string) {}
}


@Component({
  selector: 'app-communal-room',
  templateUrl: './communal-room.component.html',
  styleUrls: ['./communal-room.component.css'],
})
export class CommunalRoomComponent implements OnInit {
  courtId: string = ''
  preptime = new FormControl('auto')
  format_control = new FormControl()
  public formatRef: string = ''
  public POSITION_DATA: FormatPos[] = [
    
  ];
  
  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.courtId = params.court_id;
      firestore.checkIfHost(this.courtId).then((value) => {
        this.authorized = value;
      });
    });

    this.preptime.valueChanges.subscribe((value: number) => {
      console.log(value)
      firestore.updatePrepTime(this.courtId, value)
    });

    this.format_control.valueChanges.subscribe((value: string) => {
      this.formatRef = value;
      console.log(value);
      firestore.updateDebateFormat(this.courtId, value);

      // for (let pos in FormatConstants.formats[this.formatRef]['positions']) {
      //   this.POSITION_DATA.push(new FormatPos(pos));
      // }
    });
  }

  
  
  displayedColumns: string[] = ['PositionName', 'SelectionColumn'];
  dataSource = this.POSITION_DATA;
  
  authorized: Boolean = false;
  
  ngOnInit(): void {
    for (let x in FormatConstants.formats) {
      this.formats.push(new Format(x))
    }
  }
  
  formats: Format[] =[];
  
  joinTeam(team_number: number) {
    this.firestore.joinTeam(this.courtId, team_number)
  }

  times: Time[] = [
    { value: 15, viewValue: '15 minutes' },
    { value: 30, viewValue: '30 minutes' },
    { value: 45, viewValue: '45 minutes' },
    { value: 60, viewValue: '60 minutes' },
  ];

  selectPosition() {
    console.log('position selected');
  }
}
