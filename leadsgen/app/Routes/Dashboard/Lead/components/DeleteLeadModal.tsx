"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteLeadModalProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
  leadName?: string
}

export function DeleteLeadModal({
  open,
  onClose,
  onDelete,
  leadName,
}: DeleteLeadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border border-red-100 shadow-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="text-red-600 h-5 w-5" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Delete Lead
            </DialogTitle>
          </div>
          <DialogDescription className="mt-2 text-gray-600">
            Are you sure you want to permanently delete{" "}
            <span className="font-medium text-gray-800">{leadName || "this lead"}</span>?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete()
              onClose()
            }}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
