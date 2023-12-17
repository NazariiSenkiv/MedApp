import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChunkPipe } from '../chunk.pipe';
import { FilterFullnamePipe } from '../filter-fullname.pipe';


@NgModule({
  declarations: [ChunkPipe, FilterFullnamePipe],
  imports: [
    CommonModule
  ],
  exports: [
    ChunkPipe, FilterFullnamePipe
  ]
})
export class CustomPipesModule { }
