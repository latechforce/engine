import { useMutation } from '@tanstack/react-query'
import { client } from '../../../../shared/interface/lib/client.lib'
import type { AutomationDto } from '../../application/dto/automation.dto'
import { toast } from 'sonner'
import { queryClient } from '../../../../shared/interface/lib/query.lib'

export const setStatusMutation = (invalidateQuery: string) =>
  useMutation({
    mutationFn: async (automation: AutomationDto) => {
      const res = await client.automations[':automationId'].status.$patch({
        param: { automationId: automation.id.toString() },
        json: { active: !automation.active },
      })

      if (!res.ok) {
        const body = (await res.json()) as { error?: string }
        throw new Error(body?.error ?? `Request failed (${res.status})`)
      }
      return automation
    },
    onSuccess: (automation) => {
      queryClient.invalidateQueries({ queryKey: [invalidateQuery] })
      queryClient.invalidateQueries({ queryKey: ['adminMetadataData'] })
      toast(`Automation "${automation.name}" is now ${!automation.active ? 'active' : 'inactive'}.`)
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      toast.error(message)
    },
  })
