import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attribute } from '../attribute/attribute.module';

export class Document{
    id: string;
    type: number;
    fileName: string;
    attrs: Attribute[];
     constructor(){}

}
