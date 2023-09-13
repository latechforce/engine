/**
 * @jest-environment jsdom
 */
import React from 'react'
import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import UnstyledUI from '@drivers/ui/UnstyledUI'
import { FetcherSpi } from '@adapters/spi/fetcher/FetcherSpi'
import { AppMapper } from '@adapters/api/app/AppMapper'
import { NativeFetcher } from '@drivers/fetcher/NativeFetcher'
import { ListMapper } from '@adapters/api/page/mappers/components/ListMapper'
import { RenderPageList } from '@usecases/page/RenderPageList'
import { RecordMapper } from '@adapters/spi/orm/mappers/RecordMapper'

describe('RenderPageList', () => {
  test('should render a list with text and number columns', async () => {
    // GIVEN
    const app = AppMapper.toEntity(
      {
        tables: [
          {
            name: 'tableA',
            fields: [
              { name: 'textField', type: 'single_line_text' },
              { name: 'numberField', type: 'number' },
            ],
          },
        ],
      },
      { ui: UnstyledUI }
    )
    const list = ListMapper.toEntity(
      {
        type: 'list',
        table: 'tableA',
        columns: [
          {
            field: 'textField',
            label: 'Text',
          },
          {
            field: 'numberField',
            label: 'Number',
          },
        ],
      },
      UnstyledUI,
      app.tables
    )
    const record = RecordMapper.toEntity(
      {
        id: '1',
        created_time: new Date().toISOString(),
        textField: 'text',
        numberField: 10,
      },
      app.getTableByName('tableA')
    )
    const fetcher = new NativeFetcher('http://localhost')
    const fetcherSpi = new FetcherSpi(fetcher, app)
    const useSyncRecords = jest.fn(() => ({
      error: undefined,
      tables: {
        [list.table]: [record],
      },
      isLoading: false,
    }))
    fetcherSpi.getSyncRecordsHook = () => useSyncRecords
    const List = await new RenderPageList(fetcherSpi).execute(list)

    // THEN
    render(<List />)

    // WHEN
    const textField = screen.getByText(String(record.getFieldValue('textField')))
    const numberField = screen.getByText(String(record.getFieldValue('textField')))
    expect(textField).toBeDefined()
    expect(numberField).toBeDefined()
  })
})