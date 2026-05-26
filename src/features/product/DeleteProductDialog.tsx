import { AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName: string
  onConfirm: () => void
}

export function DeleteProductDialog({
  open,
  onOpenChange,
  productName,
  onConfirm,
}: DeleteProductDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-error-light shrink-0">
              <AlertTriangle className="text-error" size={20} />
            </div>
            <DialogTitle className="text-text">Delete Product</DialogTitle>
          </div>
          <DialogDescription className="text-text-muted pt-2">
            Are you sure you want to delete <span className="font-semibold text-text">"{productName}"</span>? 
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-error hover:bg-error/90 text-white"
            onClick={handleConfirm}
          >
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
