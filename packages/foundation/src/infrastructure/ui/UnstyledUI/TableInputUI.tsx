import React from 'react'
import { UI } from '@adapter/spi/ui/UI'

const TableInputUI: UI['TableInputUI'] = {
  container: ({ children }) => {
    return <>{children}</>
  },
  menu: ({ children }) => {
    return <>{children}</>
  },
  label: ({ label }) => {
    return <>{label}</>
  },
  addButton: ({ label, onClick }) => {
    return <button onClick={onClick}>{label}</button>
  },
  table: ({ children }) => {
    return <table>{children}</table>
  },
  header: ({ children }) => {
    return (
      <thead>
        <tr>{children}</tr>
      </thead>
    )
  },
  headerColumn: ({ label }) => {
    return <th>{label}</th>
  },
  rows: ({ children }) => {
    return <tbody>{children}</tbody>
  },
  row: ({ children }) => {
    return <tr>{children}</tr>
  },
  cell: ({ name, placeholder, value, onChange }) => {
    return (
      <td>
        <input name={name} placeholder={placeholder} onChange={onChange} value={value} />
      </td>
    )
  },
}

export default TableInputUI
