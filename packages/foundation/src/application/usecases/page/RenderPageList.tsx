import React from 'react'
import { FetcherGateway } from '@adapter/spi/gateways/FetcherGateway'
import { mapDtoToRecord } from '@application/mappers/table/RecordMapper'
import { List } from '@domain/entities/page/components/List'
import { AppGateway } from '@adapter/spi/gateways/AppGateway'

export class RenderPageList {
  constructor(
    private fetcherGateway: FetcherGateway,
    private appGateway: AppGateway
  ) {}

  execute(list: List): () => JSX.Element {
    const UI = list.renderUI()
    const getRecords = this.fetcherGateway.getTableRecords(list.table)
    const fields = this.appGateway.getTableFields(list.table)
    return function Component() {
      const { records } = getRecords()
      return (
        <UI records={records.map((recordDto) => mapDtoToRecord(list.table, recordDto, fields))} />
      )
    }
  }
}