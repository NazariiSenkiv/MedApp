export interface AnalysisFieldResult {
    name: string
    value: any
}

export interface Analysis {
    patient_id: number
    date: string
    type_id: number
    results: AnalysisFieldResult[]
}

export interface AnalysisModel extends Analysis {
    analyses_id: number
}
  
export interface AnalysisShortInfo {
    id: number
    type: string
    patient_name: string
    patient_surname: string
    date: string
}