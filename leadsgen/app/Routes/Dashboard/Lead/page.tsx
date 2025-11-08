'use client';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LeadEditModal } from "./components/EditLeadModal";
import { AddLeadModal } from "./components/AddLeadModal";
import { DeleteLeadModal } from "./components/DeleteLeadModal";
import { useDeleteLead, useGetLead } from "@/app/utils/queryServices";
import { Loader } from "@/app/components/Global/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { FollowUpModal } from "./components/FollowUpModal";

export interface Lead {
  id: number;
  _id?: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  aiMessage: string;
  leadScore?: Number;
}

export default function LeadsPage() {
  const queryClient = useQueryClient();
  const { data: leads, isLoading } = useGetLead();
  const { mutate: handleDeleteFn } = useDeleteLead();

  const [searchTerm, setSearchTerm] = useState("");
  const [followUpModal, setFollowUpModal] = useState({ open: false, aiMessage: '' })
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState({ deleteId: "", isDelete: false, deleteData: { id: '', leadName: '' } });
  const [isOpen, setIsOpen] = useState({
    open: false, lead: {
      id: 0,
      name: "",
      email: "",
      status: 'Pending',
      createdAt: "",
      aiMessage: "",
    },
  });
  const [isAdd, setIsAdd] = useState<boolean>(false);

  // State to store AI follow-ups per lead
  const [aiFollowUps, setAiFollowUps] = useState<Record<string, string>>({});

  const handleEdit = (item: Lead) => {
    setIsOpen({ open: true, lead: item });
  };

  const handleDelete = (id: string) => {
    handleDeleteFn({ id: id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leads'] })
    });
  };

  useEffect(() => {
    if (!isAdd) {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    }
  }, [isAdd]);

  // 🔹 Filtered Leads
  const filteredLeads = leads?.data?.leads?.filter((lead: Lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || statusFilter === "*" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔹 Generate AI Follow-Up
  const generateFollowUp = async (lead: Lead) => {
    try {
      const res = await fetch("/api/generateFollowup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead }),
      });
      const data = await res.json();
      setAiFollowUps(prev => ({ ...prev, [lead._id!]: data.suggestion }));
    } catch (error) {
      console.error("Failed to generate follow-up:", error);
      setAiFollowUps(prev => ({ ...prev, [lead._id!]: "Failed to generate follow-up" }));
    }
  };

  return (
    <>
      {isOpen?.open && (
        <LeadEditModal
          lead={isOpen?.lead}
          open={isOpen?.open}
          onClose={() => setIsOpen((prev) => ({ ...prev, open: false }))}
        />
      )}
      {
        followUpModal?.open && <FollowUpModal aiMessage={followUpModal?.aiMessage} onClose={() => setFollowUpModal({ open: false, aiMessage: '' })} open={followUpModal?.open} />
      }
      {isAdd && <AddLeadModal onClose={() => setIsAdd(!isAdd)} open={isAdd} />}

      {deleteModal && (
        <DeleteLeadModal
          open={deleteModal?.isDelete}
          onClose={() => setDeleteModal({ deleteId: '', isDelete: false, deleteData: { leadName: "", id: "" } })}
          onDelete={() => handleDelete(deleteModal?.deleteId)}
          leadName={deleteModal?.deleteData?.leadName}
        />
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
          <h1 className="md:text-3xl text-xl text-blue-600 font-semibold">Leads</h1>
          <Button onClick={() => setIsAdd(true)}>Add New Lead</Button>
        </div>

        {/* Search + Filter */}
        <div className="flex md:items-center mb-6 gap-3">
          <Input
            type="text"
            placeholder="Search by name or email..."
            className="w-full md:w-1/4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-full md:w-1/5">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="*">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="In Active">In Active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md w-full border">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Created At</TableHead>
                  <TableHead className="text-center">AI Message</TableHead>
                  <TableHead className="text-center">Lead Intent</TableHead>

                  <TableHead className="text-center">Follow-Up</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              {filteredLeads?.length > 0 ? (
                <TableBody>
                  {filteredLeads.map((lead: Lead) => (
                    <TableRow key={lead._id} className="hover:bg-muted/50 transition">
                      <TableCell className="font-medium text-center">{lead.name}</TableCell>
                      <TableCell className="text-center">{lead.email}</TableCell>
                      <TableCell className="text-center">
                        <p>{lead?.status === "Active" ? "Active" : "In Active"}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        {dayjs(lead?.createdAt)?.format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="max-w-[250px] text-center truncate">{lead.aiMessage}</TableCell>
                      <TableCell className="max-w-[250px] text-center truncate">{lead?.leadScore?.toString() || "N/A"}</TableCell>


                      {/* 🔹 AI Follow-Up */}
                      <TableCell className="text-center">
                        <Button size="sm" onClick={() => setFollowUpModal({ open: true, aiMessage: lead?.aiMessage })}>Generate</Button>
                        {aiFollowUps[lead._id!] && (
                          <p className="mt-1 text-sm text-gray-700 truncate">{aiFollowUps[lead._id!]}</p>
                        )}
                      </TableCell>

                      <TableCell className="mx-auto flex justify-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(lead)}>Edit</Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setDeleteModal({
                              deleteData: { id: lead._id || '', leadName: lead?.name },
                              deleteId: lead?._id || '',
                              isDelete: true,
                            })
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="flex justify-center items-center py-10 text-gray-500 text-sm">
                        No data found
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          )}
        </div>
      </div>
    </>
  );
}
