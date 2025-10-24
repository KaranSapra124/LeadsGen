'use client';

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LeadEditModal } from "./components/Modal";
import { AddLeadModal } from "./components/AddLeadModal";


export interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  aiMessage: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: "Karan Sapra",
      email: "karan@example.com",
      status: "Active",
      createdAt: "2025-10-23",
      aiMessage: "AI suggested follow-up in 3 days",
    },
    {
      id: 2,
      name: "Rohit Sharma",
      email: "rohit@example.com",
      status: "Pending",
      createdAt: "2025-10-22",
      aiMessage: "AI recommends sending intro email",
    },
  ]);
  const [isOpen, setIsOpen] = useState({
    open: false, lead: {
      id: 0,
      name: "",
      email: "",
      status: 'Pending',
      createdAt: "",
      aiMessage: "",
    },
  })
  const [isAdd, setIsAdd] = useState<boolean>(false)

  const handleEdit = (item: Lead) => {
    setIsOpen({ open: true, lead: item })
  };

  const handleDelete = (id: number) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <>
      {isOpen?.open && <LeadEditModal lead={isOpen?.lead} open={isOpen?.open} onClose={() => setIsOpen((prev) => ({ ...prev, open: false }))} />}
      {isAdd && <AddLeadModal onClose={() => setIsAdd(!isAdd)} open={isAdd} />}
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-6">Leads</h1>
        <Button>Add New Lead</Button>
        <div className="rounded-md w-full border">
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>AI Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/50 transition">
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <p>{lead?.status === "Active" ? "Active" : "In Active"}</p>
                  </TableCell>
                  <TableCell>{lead.createdAt}</TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {lead.aiMessage}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(lead)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(lead.id || 0)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
