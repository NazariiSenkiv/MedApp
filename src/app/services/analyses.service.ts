import { Injectable } from '@angular/core';
import { Analysis, AnalysisFieldResult, AnalysisModel, AnalysisShortInfo } from '../interfaces/analysis';
import { AnalysisType, AnalysisTypeField } from '../interfaces/analysis-type';
import { HttpClient } from '@angular/common/http';

import { API_BASE_URL } from '../api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysesService {
  private userAnalysesEndpoint = `${API_BASE_URL}/UserAnalyses`;
  private analysisEndpoint = `${API_BASE_URL}/Analysis`;
  private analysisTypeEndpoint = `${API_BASE_URL}/AnalysisType`;

  protected mockAnalysesTypes: AnalysisType[] = [ 
    {
        id: 1,
        name: "whole-blood",
        fields: [
            {tag: "blood-vol", name: "Volume of blood collected", type: "number", min: 15, max: 25, measurement: "ml"},
            {tag: "red-blood-count", name: "Red blood count", type: "number", min: 3.5, max: 5.5, measurement: "№"},
            {tag: "white-blood-count", name: "White blood count", type: "number", min: 6.0, max: 8.0, measurement: "μL"},
            {tag: "mock1", name: "mock", type: "string"},
            {tag: "mock2", name: "mock", type: "string"},
            {tag: "mock3", name: "mock", type: "string"},
        ]
    },
    {
      id: 2,
      name: "mnb-126",
      fields: [
          {tag: "blood-vol", name: "Volume of blood collected", type: "number", min: 15, max: 25, measurement: "ml"},
          {tag: "red-blood-count", name: "Red blood count", type: "number", min: 3.5, max: 5.5, measurement: "№"},
          {tag: "whit-blood-count", name: "White blood count", type: "number", min: 6.0, max: 8.0, measurement: "μL"},
          {tag: "mock1", name: "mock", type: "string"},
          {tag: "mock2", name: "mock", type: "string"},
          {tag: "mock3", name: "mock", type: "string"},
          {tag: "mock4", name: "mock", type: "string"},
          {tag: "mock5", name: "mock", type: "string"},
          {tag: "mock6", name: "mock", type: "string"},
          {tag: "mock7", name: "mock", type: "string"},
          {tag: "mock8", name: "mock", type: "string"},
          {tag: "mock9", name: "mock", type: "string"},
      ]
    },
    {
      id: 3,
      name: "ER-gmg",
      fields: [
          {tag: "blood-vol", name: "Volume of blood collected", type: "number", min: 15, max: 25, measurement: "ml"},
          {tag: "red-blood-count", name: "Red blood count", type: "number", min: 3.5, max: 5.5, measurement: "№"},
          {tag: "whit-blood-count", name: "White blood count", type: "number", min: 6.0, max: 8.0, measurement: "μL"},
          {tag: "gemo", name: "Gemoblobin", type: "number", min: 6.0, max: 8.0, measurement: "μL"},
      ]
    }
  ]

  protected mockAnalysis: AnalysisModel[] = [
    {
      analyses_id: 0,
      patient_id: 0,
      date: "08.10.2023",
      type_id: 0,
      results: [ 
          {name: "blood-vol", value: 17},
          {name: "red-blood-count", value: 4.5},
          {name: "white-blood-count", value : 7.4},
          {name: "mock1", value: "string"},
          {name: "mock2", value: "string"},
          {name: "mock3", value: "string"},
      ]
    },
    {
      analyses_id: 1,
      patient_id: 0,
      date: "09.11.2023",
      type_id: 0,
      results: [ 
          {name: "blood-vol", value: 18},
          {name: "red-blood-count", value: 4.6},
          {name: "white-blood-count", value : 7.3}
      ]
    },
    {
      analyses_id: 2,
      patient_id: 0,
      date: "07.12.2023",
      type_id: 0,
      results: [ 
          {name: "blood-vol", value: 19},
          {name: "red-blood-count", value: 4.9},
          {name: "white-blood-count", value : 7.5}
      ]
   }
  ]

  constructor(private http: HttpClient) { }

  // Analysis 
  public getUserAnalyses(userId: number): Observable<AnalysisModel[]> {
    return this.http.get<AnalysisModel[]>(`${this.userAnalysesEndpoint}/${userId}`)
  }
  public getAnalysisById(analysisId: number): Observable<Analysis> {
    return this.http.get<Analysis>(`${this.analysisEndpoint}/${analysisId}`)
  }
  // @userId - id of doctor, whose patients' analyses will be returned
  public getAnalysesShortInfos(userId: number): Observable<AnalysisShortInfo[]> {
    return this.http.get<AnalysisShortInfo[]>(`${this.userAnalysesEndpoint}/${userId}`)
    /* return [
    //   {
    //     id: 0,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 1,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 2,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 3,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 4,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 5,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 6,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 7,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 8,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 9,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 10,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 11,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 12,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 13,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 14,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 15,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 16,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 17,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 18,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   },
    //   {
    //     id: 19,
    //     type: "whole blood",
    //     patient_name: "John Doe",
    //     date: "08.12.2023"
    //   }
    // ] */
  }

  public updateAnalysis(id: number, analysis: Analysis): Observable<Analysis> {
    return this.http.put<Analysis>(`${this.analysisEndpoint}/${id}`, analysis)
  }
  public addAnalysis(analysis: Analysis): Observable<Analysis> {
    return this.http.post<Analysis>(`${this.analysisEndpoint}`, analysis)
  }


  // Analysis type
  public getAnalysesTypeById(typeId: number): Observable<AnalysisType> {
    return this.http.get<AnalysisType>(`${this.analysisTypeEndpoint}/${typeId}`)
  }
  public getAnalysesTypes(): Observable<AnalysisType[]> {
    return this.http.get<AnalysisType[]>(`${this.analysisTypeEndpoint}`)
  }
}
