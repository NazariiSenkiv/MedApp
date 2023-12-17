export interface DataProvider {
    id: number
    name: string
    type: string
    status: string
    supported_analyses_types: number[]
}