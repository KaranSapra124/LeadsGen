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
import { LeadEditModal } from "./components/EditLeadModal";
import { AddLeadModal } from "./components/AddLeadModal";
import { DeleteLeadModal } from "./components/DeleteLeadModal";
import { useGetLead } from "@/app/utils/queryServices";
import { Loader } from "@/app/components/Global/Loader";


export interface Lead {
  id: number;
  _id?: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  aiMessage: string;
}

export default function LeadsPage() {
  const { data, isSuccess , isLoading } = useGetLead()
  // console.log(data)
  const [deleteModal, setDeleteModal] = useState({ deleteId: Infinity, isDelete: false, deleteData: { id: Infinity, leadName: '' } })
  const [leads, setLeads] = useState<Lead[]>(data?.data?.leads);
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
  useEffect(() => setLeads(data?.data?.leads), [isSuccess])
  return (
    <>
      {isOpen?.open && <LeadEditModal lead={isOpen?.lead} open={isOpen?.open} onClose={() => setIsOpen((prev) => ({ ...prev, open: false }))} />}
      {isAdd && <AddLeadModal onClose={() => setIsAdd(!isAdd)} open={isAdd} />}
      {deleteModal && <DeleteLeadModal
        open={deleteModal?.isDelete}
        onClose={() => setDeleteModal({ deleteId: Infinity, isDelete: false, deleteData: { leadName: "", id: Infinity } })}
        onDelete={() => handleDelete(deleteModal?.deleteId)}
        leadName={deleteModal?.deleteData?.leadName}
      />
      }
      <div className="p-8">
        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl text-xl text-blue-600 font-semibold mb-6 ">Leads</h1>
          <Button onClick={() => setIsAdd(true)}>Add New Lead</Button>
        </div>
        <div className="rounded-md w-full border">
          {isLoading ? <div className="flex justify-center items-center h-64">
            <Loader />
          </div> : <Table >
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">AI Message</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {<TableBody>
              {leads?.map((lead) => (
                <TableRow key={lead._id} className="hover:bg-muted/50 transition">
                  <TableCell className="font-medium text-center">{lead.name}</TableCell>
                  <TableCell className="text-center">{lead.email}</TableCell>
                  <TableCell className="text-center">
                    <p>{lead?.status === "Active" ? "Active" : "In Active"}</p>
                  </TableCell>
                  <TableCell className="text-center">{dayjs(lead?.createdAt)?.format("DD-MM-YYYY")}</TableCell>
                  <TableCell className="max-w-[250px] text-center truncate">
                    {lead.aiMessage}
                  </TableCell>
                  <TableCell className="mx-auto flex justify-center space-x-2">
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
                      onClick={() => setDeleteModal({ deleteData: { id: lead?.id, leadName: lead?.name }, deleteId: lead?.id, isDelete: true })}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>}
          </Table>}
        </div>
      </div>
    </>
  );
}
