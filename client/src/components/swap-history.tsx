import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink, Clock, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Swap {
  id: string;
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  status: string;
  createdAt: string;
  ethereumTxHash?: string;
  suiTxHash?: string;
}

export default function SwapHistory() {
  const queryClient = useQueryClient();

  const { data: swaps, isLoading } = useQuery({
    queryKey: ['/api/swaps'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const updateSwapMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const response = await fetch(`/api/swaps/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        throw new Error('Failed to update swap');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/swaps'] });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'pending':
      case 'locked':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
      case 'locked':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatAmount = (amount: string, token: string) => {
    const num = parseFloat(amount);
    if (num > 1000) {
      return `${(num / 1000).toFixed(1)}K ${token}`;
    }
    return `${num.toFixed(2)} ${token}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Recent Swaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Cross-Chain Swaps</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/swaps'] })}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!swaps || swaps.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No swaps found. Start a cross-chain swap to see it here!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {swaps.map((swap: Swap) => (
                  <TableRow key={swap.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium capitalize">
                            {swap.fromChain}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({swap.fromToken})
                          </span>
                        </div>
                        <span className="text-gray-400">→</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium capitalize">
                            {swap.toChain}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({swap.toToken})
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatAmount(swap.fromAmount, swap.fromToken)}</div>
                        <div className="text-xs text-gray-500">
                          → {formatAmount(swap.toAmount, swap.toToken)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(swap.status)}
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(swap.status)}`}
                        >
                          {swap.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(swap.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {swap.ethereumTxHash && (
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                        {swap.suiTxHash && (
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                        {swap.status === 'pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateSwapMutation.mutate({
                              id: swap.id,
                              updates: { status: 'completed' }
                            })}
                            disabled={updateSwapMutation.isPending}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}