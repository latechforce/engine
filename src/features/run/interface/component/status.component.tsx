import { CheckCircle, Filter, Play, XCircle } from 'lucide-react'
import type { RunDto } from '../../application/dto/run.dto'

type RunStatusProps = {
  status: RunDto['status']
}

export const RunStatus = ({ status }: RunStatusProps) => {
  switch (status) {
    case 'success':
      return (
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle /> Success
        </div>
      )
    case 'stopped':
      return (
        <div className="flex items-center gap-2 text-red-700">
          <XCircle /> Stopped
        </div>
      )
    case 'filtered':
      return (
        <div className="flex items-center gap-2 text-gray-500">
          <Filter /> Filtered
        </div>
      )
    case 'playing':
      return (
        <div className="flex items-center gap-2 text-blue-700">
          <Play /> Playing
        </div>
      )
  }
}
