import { ListFilter, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/queries/transaction.query";
import { Skeleton } from "./ui/skeleton";

interface ITransaction {
  _id: string;
  userId: string;
  description: string;
  paymentType: "cash" | "card";
  category: "saving" | "expense" | "investment";
  amount: number;
  date: string;
  location: string;
}

const TransactionHistory = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  const transactions: ITransaction[] = data?.transactions || [];

  const handleClick = (userId: string) => {
    console.log(userId);
    navigate("/transaction");
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString("en-US"); // Converts to "MM/DD/YYYY"
  };

  if (error) {
    return (
      <div className="flex w-full max-w-7xl mx-auto flex-col border rounded-xl shadow">
        <div className="p-4 text-center space-y-5 py-10">
          <h2 className="text-xl font-bold">Error Loading Transactions</h2>
          <p className="text-red-600">
            Failed to load transactions data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto flex-col border rounded-xl shadow">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <TabsContent value="all" className="mt-5">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    Manage your transactions and view their details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Payment Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Location
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Sample transaction data */}
                      {loading && <SkeletonLoader></SkeletonLoader>}

                      {!loading &&
                        transactions.map(transaction => {
                          const {
                            _id,
                            amount,
                            category,
                            date,
                            description,
                            location,
                            paymentType,
                            userId,
                          } = transaction;
                          const formattedDate = formatDate(date);
                          return (
                            <TableRow key={_id}>
                              <TableCell className="hidden sm:table-cell">
                                <img
                                  alt="Transaction image"
                                  className="aspect-square rounded-full object-cover"
                                  height="64"
                                  width="64"
                                  src="/placeholder.png"
                                />
                              </TableCell>
                              <TableCell className="font-medium">
                                {description}
                              </TableCell>
                              <TableCell className="capitalize">
                                {paymentType}
                              </TableCell>
                              <TableCell>
                                {category === "expense" && (
                                  <Badge
                                    variant="destructive"
                                    className="capitalize"
                                  >
                                    {category}
                                  </Badge>
                                )}
                                {category === "investment" && (
                                  <Badge
                                    variant="default"
                                    className="capitalize"
                                  >
                                    {category}
                                  </Badge>
                                )}
                                {category === "saving" && (
                                  <Badge
                                    variant="outline"
                                    className="capitalize"
                                  >
                                    {category}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>${amount}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                {formattedDate}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {location}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() => handleClick(userId)}
                                    >
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-2</strong> of <strong>2</strong>{" "}
                    transactions
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TransactionHistory;

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell className="hidden sm:table-cell">
            <Skeleton className="h-20 w-20 rounded-full" />
          </TableCell>
          <TableCell className="font-medium">
            <Skeleton className="h-5 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-full" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-full" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-full" />
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"></DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
