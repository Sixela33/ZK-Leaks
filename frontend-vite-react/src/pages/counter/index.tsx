import { Loading } from "@/components/loading";
import { useContractSubscription } from "@/modules/midnight/counter-ui";
import { useEffect, useState } from "react";
import { RefreshCw, PlusCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import type { Leak } from "@/modules/midnight/counter-ui/api/common-types";

export const Counter = () => {
  const { deployedContractAPI, derivedState, onDeploy, providers } =
    useContractSubscription();
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>(
    undefined
  );
  const [appLoading, setAppLoading] = useState(true);
  const [newLeakUri, setNewLeakUri] = useState("");
  const [newLeakDonationAddr, setNewLeakDonationAddr] = useState("");


  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  const deployNew = async () => {
    const { address } = await onDeploy();
    setDeployedAddress(address);
  };

  const increment = async () => {
    if (deployedContractAPI) {
      await deployedContractAPI.increment();
    }
  };

  const createLeak = async () => {
    if (deployedContractAPI && newLeakUri && newLeakDonationAddr) {
      await deployedContractAPI.createLeak(newLeakUri, newLeakDonationAddr);
      setNewLeakUri("");
      setNewLeakDonationAddr("");
    }
  };



  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {appLoading && <Loading />}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-foreground mb-2">ZK-Leaks</h1>
            <p className="text-xl text-muted-foreground">Anonymous leak submission platform with zero-knowledge proofs</p>
          </div>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">ZK-Leaks Contract</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Deploy and interact with the ZK-Leaks smart contract for anonymous leak submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={deployNew} className="gap-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Deploy New Contract</span>
                </Button>
              </div>

              {deployedAddress && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Deployed Contract</p>
                  <p className="text-sm font-mono break-all">{deployedAddress}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Round</p>
                    <p className="text-2xl font-bold">{derivedState?.round?.toString() || '0'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Next Leak ID</p>
                    <p className="text-2xl font-bold">{derivedState?.nextLeakId?.toString() || '0'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Leaks</p>
                    <p className="text-2xl font-bold">{derivedState?.leaks?.size()?.toString() || '0'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Contract Address</p>
                    <p className="text-sm font-mono break-all">{deployedContractAPI?.deployedContractAddress || 'Not deployed'}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  onClick={increment}
                  disabled={!deployedContractAPI}
                  variant={deployedContractAPI ? "default" : "secondary"}
                  className="gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Increment Round</span>
                </Button>
              </div>

              {providers?.flowMessage && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{providers.flowMessage}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Leak Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Create New Leak</CardTitle>
            <CardDescription>
              Submit a new anonymous leak with URI and donation address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="leak-uri" className="block text-sm font-medium text-foreground mb-2">
                  Leak URI
                </label>
                <input
                  id="leak-uri"
                  type="text"
                  value={newLeakUri}
                  onChange={(e) => setNewLeakUri(e.target.value)}
                  placeholder="Enter leak URI or content"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="donation-addr" className="block text-sm font-medium text-foreground mb-2">
                  Donation Address
                </label>
                <input
                  id="donation-addr"
                  type="text"
                  value={newLeakDonationAddr}
                  onChange={(e) => setNewLeakDonationAddr(e.target.value)}
                  placeholder="Enter donation address"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button
                onClick={createLeak}
                disabled={!deployedContractAPI || !newLeakUri || !newLeakDonationAddr}
                className="gap-2"
              >
                <FileText className="w-5 h-5" />
                <span>Create Leak</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leaks Display Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Existing Leaks</CardTitle>
            <CardDescription>
              View all submitted leaks in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {derivedState?.leaks && !derivedState.leaks.isEmpty() ? (
                <div className="grid gap-4">
                  {Array.from(derivedState.leaks).map(([id, leak]) => (
                    <Card key={id.toString()} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Leak ID</p>
                            <p className="text-lg font-bold">{leak.id.toString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Donated Amount</p>
                            <p className="text-lg font-bold">{leak.donated.toString()}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-muted-foreground mb-1">URI</p>
                            <p className="text-sm font-mono break-all bg-muted p-2 rounded">{leak.uri}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Donation Address</p>
                            <p className="text-sm font-mono break-all bg-muted p-2 rounded">{leak.donation_addr}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No leaks found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
