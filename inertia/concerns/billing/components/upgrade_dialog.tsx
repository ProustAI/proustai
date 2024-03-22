import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/dialog'

interface UpgradeDialogProps {
  open: boolean
  setOpen: (isOpen: boolean) => void
}

const UpgradeDialog: React.FunctionComponent<UpgradeDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="sm:max-w-[425px] rounded-md !gap-0 !p-0 !pt-4">
        <DialogHeader>
          <DialogTitle>Upgrade</DialogTitle>

          <DialogDescription>Get a paid plan to unlock more features.</DialogDescription>
        </DialogHeader>

        <div className="mx-6 my-4 horizontal">
          <a className="primary-btn" href="/billing/upgrade">
            Upgrade
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeDialog
