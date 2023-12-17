import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../chunk.pipe';
import { FilterFullnamePipe } from '../filter-fullname.pipe';
import { FilterPatientsFullnamePipe } from '../filter-patients-fullname.pipe';


@NgModule({
  declarations: [ChunkPipe, FilterFullnamePipe, FilterPatientsFullnamePipe],
  imports: [
    CommonModule
  ],
  exports: [
    ChunkPipe, FilterFullnamePipe, FilterPatientsFullnamePipe
  ]
})
export class CustomPipesModule { }
