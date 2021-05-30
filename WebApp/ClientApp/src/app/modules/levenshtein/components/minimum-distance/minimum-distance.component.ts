import { Component, OnInit } from '@angular/core';
import { LevenshteinService } from '../../levenshtein.service';

@Component({
  selector: 'app-minimum-distance',
  templateUrl: './minimum-distance.component.html',
  styleUrls: ['./minimum-distance.component.css']
})
export class MinimumDistanceComponent implements OnInit {

  buttonEnabled: boolean = true;
  sourceString: string = "";
  targetString: string = "";

  sourceStringArray: string[];
  targetStringArray: string[];
  minimumDistance: number = 0;
  listMatrix: Array<number[]>;

  constructor(private levenshteinService: LevenshteinService) { }

  ngOnInit() {
  }

  CallLevenshtein() {
    if (!this.buttonEnabled)
      this.CalculateMinimumDistance();
  }

  CalculateMinimumDistance() {
    // return if any one string is empty
    if (this.sourceString.length <= 0 && this.targetString.length <= 0) return;
    this.levenshteinService.GetMinimumDistance(this.sourceString, this.targetString).subscribe((response: LevenshteinResponse) => {
      this.minimumDistance = response.minimumDistance;
      this.listMatrix = response.listMatrix;
      this.sourceStringArray = response.source ? response.source.split('') : [];
      this.targetStringArray = response.target ? response.target.split('') : [];
    });
  }

}
