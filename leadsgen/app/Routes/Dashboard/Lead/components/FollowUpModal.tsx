'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGenerateFollowUp } from "@/app/utils/queryServices"
import { useEffect } from "react"

interface FollowUpModalProps {
    open: boolean
    onClose: () => void
    aiMessage: string
}

export const FollowUpModal = ({ open, onClose, aiMessage }: FollowUpModalProps) => {
    const { mutate: handleGenerateFn, data: aiRes , isPending } = useGenerateFollowUp()

    useEffect(() => {
        handleGenerateFn({ data: aiMessage })
    }, [aiMessage])
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg rounded-2xl border border-gray-200 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">AI Follow-Up</DialogTitle>
                    <DialogDescription className="mt-1 text-gray-500">
                        This is the AI-generated follow-up suggestion.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 p-4 border rounded-md bg-gray-50 min-h-[100px]">
                    {isPending ? "Loading..." :aiRes?.data?.aiResponse || "No message available"}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onClose} className="rounded-xl">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
