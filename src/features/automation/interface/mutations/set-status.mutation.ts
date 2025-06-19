import { useMutation } from '@tanstack/react-query'
import { client } from '../../../../shared/interface/lib/client.lib'
import type { AutomationDto } from '../../application/dto/automation.dto'
import { toast } from 'sonner'
import { queryClient } from '../../../../shared/interface/lib/query.lib'

export const setStatusMutation = (invalidateQuery: string) =>
  useMutation({
    mutationFn: async (automation: AutomationDto) => {
      await client.automations[':automationId'].status.$patch({
        param: { automationId: automation.id.toString() },
        json: { active: !automation.active },
      })
      return automation
    },
    onSuccess: (automation) => {
      queryClient.invalidateQueries({ queryKey: [invalidateQuery] })
      queryClient.invalidateQueries({ queryKey: ['adminMetadataData'] })
      toast(`Automation "${automation.name}" is now ${!automation.active ? 'active' : 'inactive'}.`)
    },
  })
