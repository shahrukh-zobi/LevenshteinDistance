import { Component, OnInit } from '@angular/core';
import { LevenshteinService } from '../../levenshtein.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minimum-distance',
  templateUrl: './minimum-distance.component.html',
  styleUrls: ['./minimum-distance.component.css']
})
export class MinimumDistanceComponent implements OnInit {

  sourceString: string = "";
  targetString: string = "";

  sourceStringArray: string[] = [];
  targetStringArray: string[] = [];
  minimumDistance: number = 0;
  listMatrix: Array<number[]> = new Array<number[]>();

  buttonEnabled: boolean = true;
  boolInputError: boolean = false;

  constructor(private levenshteinService: LevenshteinService, public router: Router) { }

  ngOnInit() {
  }

  CalculateMinimumDistance() {
    if (!this.validateInputStrings()) return;
    this.levenshteinService.GetMinimumDistance(this.sourceString, this.targetString).subscribe((response: LevenshteinResponse) => {
      this.minimumDistance = response.minimumDistance;
      this.listMatrix = response.listMatrix;
      this.sourceStringArray = response.source ? response.source.split('') : [];
      this.targetStringArray = response.target ? response.target.split('') : [];
    }, error => {
      if (error.status == 401) {
        // if somehow token deleted from localstorage
        this.router.navigate(['login']);
      } else {
        this.boolInputError = true;
        console.log(error.message);
      }
    });
  }

  validateInputStrings(): boolean {
    if (this.sourceString.length <= 0 && this.targetString.length <= 0) {
      this.boolInputError = true;
      this.initDefaults();
      return false;
    } else {
      this.boolInputError = false;
      return true;
    }
  }

  initDefaults() {
    this.minimumDistance = 0;
    this.listMatrix = new Array<number[]>();
    this.sourceStringArray = [];
    this.targetStringArray = [];
  }

  CallLevenshtein() {
    if (!this.buttonEnabled)
      this.CalculateMinimumDistance();
  }

  toggleCheckbox() {
    this.buttonEnabled = !this.buttonEnabled;
    this.CallLevenshtein();
  }

}
