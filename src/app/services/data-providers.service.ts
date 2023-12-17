import { Injectable } from '@angular/core';
import { Analysis, AnalysisFieldResult } from '../interfaces/analysis';
import { AnalysisType } from '../interfaces/analysis-type';
import { DataProvider } from '../interfaces/data-provider';

@Injectable({
  providedIn: 'root'
})
export class DataProvidersService {
  protected dataProviders: DataProvider[] = [
    {id: 0, name: "Blood sensor",    type: "Sensor",           status: "Online", supported_analyses_types: [1]},
    {id: 1, name: "Oxygen sensor",   type: "Sensor",           status: "Online", supported_analyses_types: [3]},
    {id: 2, name: "Sensor 156",      type: "Sensor",           status: "Online", supported_analyses_types: [1, 3, 4, 5, 6]},
    {id: 3, name: "Alpha-125",       type: "Sensor",           status: "Online", supported_analyses_types: [1, 3, 4, 6]},
    {id: 4, name: "Laboratory 4",    type: "External system",  status: "Online", supported_analyses_types: [1, 3, 4, 5]},
    {id: 5, name: "Alpha-490",       type: "Sensor",           status: "Online", supported_analyses_types: [1, 4]},
    {id: 6, name: "Laboratory",      type: "External system",  status: "Online", supported_analyses_types: [1, 3, 5]},
    {id: 7, name: "Quick analyses",  type: "External system",  status: "Online", supported_analyses_types: [4, 6]},
    {id: 8, name: "Medical+",        type: "External system",  status: "Online", supported_analyses_types: [1, 3, 4, 5, 6]},
    {id: 9, name: "GS-3000",         type: "Sensor",           status: "Online", supported_analyses_types: [1, 3]}
  ]

  constructor() { }
  
  public getAllDataProviders(): DataProvider[] {
    return this.dataProviders;
  }
  public getSupportedDataProviders(analysisTypeId: number): DataProvider[] {
    return this.dataProviders.filter(provider => provider.supported_analyses_types.indexOf(analysisTypeId) !== -1);
  }

  private addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  private getCurrentDateString(): string {
    const currentDate = new Date();
  
    const day = this.addLeadingZero(currentDate.getDate())
    const month = this.addLeadingZero(currentDate.getMonth() + 1)
    const year = currentDate.getFullYear()

    return `${day}.${month}.${year}`
  }

  private getRandomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private mockProviderResults(patientId: number, analysisType: AnalysisType): Analysis {
    let fields: AnalysisFieldResult[] = analysisType.fields.map(field => {
      let rnd = this.getRandomRange(field.min || 0, field.max || 100).toFixed(2)
      return {name: field.tag, value: rnd}
    })
    
    return {
      date: this.getCurrentDateString(),
      patient_id: patientId,
      type_id: analysisType.id,
      results: fields
    }
  }

  public readDataFromProvider(providerId: number, patientId: number, analysisType: AnalysisType): Analysis {
    return this.mockProviderResults(patientId, analysisType)
  }
}
