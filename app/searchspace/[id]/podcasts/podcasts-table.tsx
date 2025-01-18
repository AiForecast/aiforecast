"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Download, Mic, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import JsonThemeEditor from "@/app/json-editor"
import NewPodcastForm from "@/components/ui/new-podcast-form"


export type Docs = {
  id: string
  created_at: string
  title: string
  file_type: string
  search_space: any
  document_metadata: string
  page_content: string
}

type Source = {
  id: string;
  title: string;
  source: string;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  relateddocs?: any[];
};




export function PodcastDataTable({ search_space_id, data }: { search_space_id: Number, data: Docs[] }) {
  const router = useRouter();
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const downloadPodcast = async (podcast_id: string) => {
    const token = window.localStorage.getItem('token');
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}/searchspace/${search_space_id}/download-podcast/${podcast_id}`
    // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/user/${token}/searchspace/${search_space_id}/download-podcast/${podcast_id}`);
  }
  
  
  const columns: ColumnDef<Docs>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="ml-2 text-left font-medium">{row.getValue("id")}</div>
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="ml-2 text-left font-medium">{row.getValue("created_at")}</div>
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="ml-2 text-left font-medium">{row.getValue("title")}</div>
      },
    },
    {
      accessorKey: "is_generated",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Generated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        if(row.getValue("is_generated")){
          return (
            <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={() => downloadPodcast(row.getValue("id"))}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          )
        }else{
          return (
            <Button 
            variant="destructive" 
            disabled 
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            <X className="mr-2 h-4 w-4" />
            Unavailable
          </Button>
          )
        }
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })




  const deleteSelectedDocuments = async () => {
    // const selectedDocuments = Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)
    // const ids_to_del = selectedDocuments.map((doc) => {
    //   return (parseInt(doc.id) - 1).toString()
    // })

    // // console.log(ids_to_del)

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ids_to_delete: ids_to_del,
    //     token: localStorage.getItem('token'),
    //   }),
    // };

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL!}/delete/docs`,
    //   requestOptions
    // );
    // if (!response.ok) {
    //   throw new Error("Token verification failed");
    // } else {
    //   const res = await response.json();
    //   toast({
    //     title: res.message,
    //   });
    //   // router.push("/dashboard/playground");
    // }
  }



  useEffect(() => {
    const verifyToken = async () => {
      const token = window.localStorage.getItem('token');
      // console.log(token)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/verify-token/${token}`);

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        window.localStorage.removeItem('token');
        router.push('/login');
      }
    };

    verifyToken();
  }, [router]);


  return (
    <div className="w-full p-8">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter Title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* <AlertDialog>
          <AlertDialogTrigger><Button variant="destructive">Delete</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteSelectedDocuments()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}



