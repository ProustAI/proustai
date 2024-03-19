import React from 'react'
import { useToast } from './use_toast'
import { IconCircleCheck } from '@tabler/icons-react'

export default function useSuccessToast() {
  const { toast } = useToast()

  return function (message = 'Saved successfully.') {
    toast({
      title: (
        <div className="flex items-center space-x-2 text-black">
          <IconCircleCheck className="h-5 w-5 text-amber-600" />
          <p>{message}</p>
        </div>
      ),
    })
  }
}
