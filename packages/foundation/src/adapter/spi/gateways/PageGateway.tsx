import { RecordDto } from '@application/dtos/table/RecordDto'
import { GroupBy, SortBy } from '@domain/entities/page/components/List'
import { IFetcherGateway } from '@domain/gateways/IFetcherGateway'

export class PageGateway {
  constructor(private readonly fetcher: IFetcherGateway) {}

  getTableRecords(
    table: string,
    options: { groupBy: GroupBy[]; sortBy: SortBy[] }
  ): () => {
    records: RecordDto[]
    error: Error | undefined
    isLoading: boolean
  } {
    const useFetch = this.fetcher
    return function () {
      const { data = [], error, isLoading } = useFetch<RecordDto[]>(`/api/table/${table}`)
      return {
        records: data,
        error,
        isLoading,
      }
    }
  }
}
