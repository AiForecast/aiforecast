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
import { ArrowUpDown, ChevronDown, Mic, User } from "lucide-react"
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


export const columns: ColumnDef<Docs>[] = [
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
      return <div className="text-center font-medium">{row.getValue("id")}</div>
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
      return <div className="text-center font-medium">{row.getValue("created_at")}</div>
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
      return <div className="text-center font-medium">{row.getValue("title")}</div>
    },
  },
  {
    accessorKey: "file_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          File Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue("file_type")}</div>
    },
  },
  // {
  //   accessorKey: "search_space",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Search Space
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return <div className="text-center font-medium">{row.getValue("search_space")}</div>
  //   },
  // },
  {
    accessorKey: "document_metadata",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Metadata
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show MetaData</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="min-w-fit">
            <AlertDialogHeader>
              <AlertDialogTitle>MetaData</AlertDialogTitle>
              <AlertDialogDescription>
                <JsonThemeEditor jsonobject={JSON.parse(row.getValue("document_metadata"))} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>OK</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    },
  },
]


export function DocsDataTable({ search_space_id, data }: { search_space_id: Number, data: Docs[] }) {
  const router = useRouter();
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false);
  const [createpodcast, setCreatePodcast] = useState<boolean>(false);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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


  const startChat = async () => {
    const docsToChatWith = Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)
    // let docsContent: string[] = [];
    // docsToChatWith.filter((doc, idx) => {
    //   docsContent.push("DOCUMENT " + idx + "\n\n" + doc.page_content + "\n\n")
    // })
    console.log("docsToChatWith")
    console.log({ role: 'assistant', relateddocs: docsToChatWith })

    const token = window.localStorage.getItem("token");
    // Create Chat & Redirect with its ID
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          type: "multidoc",
          title: "Chatting with " + docsToChatWith.length + " Documents",
          chats_list: JSON.stringify([{ role: 'assistant', relateddocs: docsToChatWith }]),
        }),
      };

      console.log("Request Options:", requestOptions)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/searchspace/${search_space_id}/chat/create`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Token verification failed");
      } else {
        const res = await response.json();

        console.log("NewCreResponse:", res)

        router.push(`/searchspace/${search_space_id}/chat/${res.chat_id}`);
      }
    } catch (error) {
      //toast error
    }
  }

  const createPodcastOfSelectedDocuments = async () => {
    setCreatePodcast(true)
  }

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

  if (createpodcast) {
    return (
      <>
        <NewPodcastForm
          forDocuments={Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)}
          search_space_id={search_space_id}
        />
      </>
    )
  } else {
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
          <Input
            placeholder="Filter File Type"
            value={(table.getColumn("file_type")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("file_type")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button
            onClick={() => createPodcastOfSelectedDocuments()}
            className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Mic className="mr-2 h-4 w-4" />
            Create Podcast
          </Button>

          <div
            onClick={() => startChat()}
            className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Start Chat
          </div>

          {/* 
          Will Complete soon
          <AlertDialog>
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


}
