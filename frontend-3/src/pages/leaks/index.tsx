import { Loading } from "@/components/loading";
import { useContractSubscription } from "@/modules/midnight/counter-ui";
import { useEffect, useState } from "react";
import { FileText, Search, ExternalLink, Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const LeaksExplorer = () => {
  const { derivedState } = useContractSubscription();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  const formatLeakId = (id: unknown) => {
    return String(id);
  };

  const formatDonatedAmount = (amount: unknown) => {
    return String(amount);
  };

  const handleUriClick = (uri: string) => {
    // If it's a valid URL, open it in a new tab
    try {
      new URL(uri);
      window.open(uri, "_blank");
    } catch {
      // If not a valid URL, copy to clipboard
      navigator.clipboard.writeText(uri);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {appLoading && <Loading />}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Explore Leaks
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse all anonymous leaks submitted to the platform
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Total Leaks
              </p>
              <p className="text-3xl font-bold">
                {derivedState?.leaks?.size()?.toString() || "0"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Current Round
              </p>
              <p className="text-3xl font-bold">
                {derivedState?.round?.toString() || "0"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Next Leak ID
              </p>
              <p className="text-3xl font-bold">
                {derivedState?.nextLeakId?.toString() || "0"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leaks List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6" />
              All Submitted Leaks
            </CardTitle>
            <CardDescription>
              Anonymous submissions protected by zero-knowledge proofs. Click on
              URIs to access content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {derivedState?.leaks && !derivedState.leaks.isEmpty() ? (
                <div className="grid gap-6">
                  {Array.from(derivedState.leaks).map(([id, leak]) => (
                    <Card
                      key={formatLeakId(id)}
                      className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Leak Info */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                  Leak ID
                                </p>
                                <p className="text-2xl font-bold text-primary">
                                  #{formatLeakId(leak.id)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">
                                  Donations Received
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                  {formatDonatedAmount(leak.donated)}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-2">
                                Donation Address
                              </p>
                              <div className="bg-muted p-3 rounded-lg">
                                <p className="text-sm font-mono break-all">
                                  {leak.donation_addr}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Content Access */}
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">
                              Content URI
                            </p>
                            <div className="bg-muted p-3 rounded-lg mb-3">
                              <p className="text-sm font-mono break-all">
                                {leak.uri}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={`https://gateway.pinata.cloud/ipfs/${leak.uri}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1"
                              >
                                <Button variant="outline" className="w-full">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open on IPFS
                                </Button>
                              </a>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  navigator.clipboard.writeText(leak.uri);
                                }}
                                className="flex-1"
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy CID
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No leaks found
                  </h3>
                  <p className="text-muted-foreground">
                    No anonymous leaks have been submitted yet. Be the first to
                    contribute!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Privacy & Security
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                All leaks are submitted anonymously using zero-knowledge proofs.
                No personal information is stored on-chain, ensuring complete
                privacy for whistleblowers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
