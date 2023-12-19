import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../chunk.pipe';
import { FilterFullnamePipe } from '../filter-fullname.pipe';
import { FilterPatientsFullnamePipe } from '../filter-patients-fullname.pipe';
import { FilterDataproviderPipe } from '../filter-dataprovider.pipe';


@NgModule({
  declarations: [ChunkPipe, FilterFullnamePipe, FilterPatientsFullnamePipe, FilterDataproviderPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ChunkPipe, FilterFullnamePipe, FilterPatientsFullnamePipe, FilterDataproviderPipe
  ]
})
export class CustomPipesModule { }
