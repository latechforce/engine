import { CheckCircle, Filter, Play, XCircle } from 'lucide-react'
import type { RunDto } from '../../application/dto/run.dto'
import { cn } from '../../../../shared/interface/lib/utils.lib'

type RunStatusProps = {
  status: RunDto['status']
  className?: string
}

export const getStatusBorderColor = (status: RunDto['status']) => {
  switch (status) {
    case 'success':
      return 'border-green-700'
    case 'stopped':
      return 'border-red-700'
    case 'filtered':
      return 'border-gray-500'
    case 'playing':
      return 'border-blue-700'
  }
}

export const RunStatus = ({ status, className }: RunStatusProps) => {
  switch (status) {
    case 'success':
      return (
        <div className={cn('flex items-center gap-2 text-green-700', className)}>
          <CheckCircle /> Success
        </div>
      )
    case 'stopped':
      return (
        <div className={cn('flex items-center gap-2 text-red-700', className)}>
          <XCircle /> Stopped
        </div>
      )
    case 'filtered':
      return (
        <div className={cn('flex items-center gap-2 text-gray-500', className)}>
          <Filter /> Filtered
        </div>
      )
    case 'playing':
      return (
        <div className={cn('flex items-center gap-2 text-blue-700', className)}>
          <Play /> Playing
        </div>
      )
  }
}
