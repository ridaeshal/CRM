import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { CustomerFormDialog } from "@/components/customer-form-dialog";
import type { Customer } from "@shared/schema";

export default function Customers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: "1",
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      status: "Active",
      assignedTo: "user-1",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Tech Solutions Inc",
      email: "info@techsolutions.com",
      phone: "+1 (555) 234-5678",
      company: "Tech Solutions",
      status: "Active",
      assignedTo: "user-2",
      createdAt: new Date("2024-02-20"),
    },
    {
      id: "3",
      name: "Global Industries",
      email: "hello@globalind.com",
      phone: "+1 (555) 345-6789",
      company: "Global Industries",
      status: "Inactive",
      assignedTo: "user-1",
      createdAt: new Date("2024-03-10"),
    },
  ] as Customer[]);

  const handleAddCustomer = (data: any) => {
    const newCustomer: Customer = {
      id: `${customers.length + 1}`,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      company: data.company || null,
      status: data.status,
      assignedTo: data.assignedTo || null,
      createdAt: new Date(),
    };
    
    setCustomers([...customers, newCustomer]);
    console.log("New customer added:", newCustomer);
  };

  const columns = [
    {
      header: "Name",
      accessor: "name" as const,
      cell: (value: string) => <span className="font-medium">{value}</span>,
    },
    { header: "Email", accessor: "email" as const },
    { header: "Phone", accessor: "phone" as const },
    { header: "Company", accessor: "company" as const },
    {
      header: "Status",
      accessor: "status" as const,
      cell: (value: string) => <StatusBadge status={value} />,
    },
    {
      header: "Created",
      accessor: "createdAt" as const,
      cell: (value: Date) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Customers
          </h1>
          <p className="text-muted-foreground">
            Manage your customer relationships
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          data-testid="button-add-customer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <DataTable
        data={customers}
        columns={columns}
        searchPlaceholder="Search customers..."
        onRowClick={(customer) => console.log("View customer:", customer)}
      />

      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddCustomer}
      />
    </div>
  );
}
