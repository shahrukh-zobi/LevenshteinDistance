import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LevenshteinRoutingModule } from './levenshtein-routing.module';
import { MinimumDistanceComponent } from './components/minimum-distance/minimum-distance.component';
import { LevenshteinService } from './levenshtein.service';
import { APIInterceptor } from 'src/shared/utilities/api.interceptor';
import { LocalStorageService } from 'src/shared/utilities/local-storage.service';

@NgModule({
  declarations: [MinimumDistanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LevenshteinRoutingModule
  ],
  providers: [
    LevenshteinService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }
  ]
})
export class LevenshteinModule { }
