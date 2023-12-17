export interface AnalysisTypeField {
    tag: string,
    name: string,
    type: string,
    min?: number,
    max?: number,
    measurement?: string,
}

export interface AnalysisType {
    id: number,
    name: string,
    fields: AnalysisTypeField[]
}
  