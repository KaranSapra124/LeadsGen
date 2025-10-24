"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Lead } from "../page"
import { useState, useEffect } from "react"

interface ModalInterface {
    open: boolean
    lead: Lead | null
    onClose: () => void
    onSave?: (updatedLead: Lead) => void
}

export function LeadEditModal({ open, lead, onClose, onSave }: ModalInterface) {
    const [formData, setFormData] = useState<Lead>({
        id: 0,
        name: "",
        email: "",
        status: "",
        aiMessage: "",
        createdAt: "",
    })

    // populate fields when modal opens
    useEffect(() => {
        if (lead) setFormData(lead)
    }, [lead])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        if (onSave) {
            onSave(formData)
        }
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px] rounded-2xl border border-gray-200 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Edit Lead</DialogTitle>
                    <DialogDescription>
                        Update the lead details and click save to apply changes.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-5 mt-3">
                    {/* Name */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            className="focus-visible:ring-1 "
                        />
                    </div>

                    {/* Email */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            type="email"
                            className="focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                    </div>

                    {/* Status */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                        <Input
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            placeholder="Enter status (e.g. Active, Pending)"
                            className="focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                    </div>

                    {/* AI Message */}
                    <div className="grid gap-1.5">
                        <Label htmlFor="aiMessage" className="text-sm font-medium">AI Message</Label>
                        <Textarea
                            id="aiMessage"
                            name="aiMessage"
                            value={formData.aiMessage}
                            onChange={handleChange}
                            placeholder="Enter AI message..."
                            className="min-h-[90px] resize-none focus-visible:ring-1 focus-visible:ring-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
