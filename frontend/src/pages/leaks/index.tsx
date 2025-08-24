import { Loading } from "@/components/loading";
import { useContractSubscription } from "@/modules/midnight/counter-ui";
import { useEffect, useState } from "react";
import { Search, FileText, ExternalLink, Copy, RefreshCw, Shield, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LeakMetadata {
  title: string;
  description: string;
  imagecid: string;
  tld?: string;
  emailVerified?: boolean;
  verificationTimestamp?: number;
}

export const LeaksExplorer = () => {
  const { derivedState} = useContractSubscription();
  const [appLoading, setAppLoading] = useState(true);
  const [leakMetadata, setLeakMetadata] = useState<Map<string, LeakMetadata>>(new Map());
  const [isUpdatingMetadata, setIsUpdatingMetadata] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  // Function to fetch metadata from IPFS via backend proxy
  const fetchLeakMetadata = async (uri: string): Promise<LeakMetadata | null> => {
    try {
      // Use backend proxy to avoid CORS issues
      const response = await fetch(`http://localhost:3000/ipfs-metadata/${uri}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.metadata) {
          return result.metadata;
        }
      }
    } catch (error) {
      console.error('Error fetching leak metadata:', error);
    }
    return null;
  };

  // Manual update function for metadata using backend proxy only
  const updateAllMetadata = async () => {
    if (!derivedState?.leaks) return;
    
    setIsUpdatingMetadata(true);
    const newMetadata = new Map<string, LeakMetadata>();
    
    try {
      for (const [id, leak] of derivedState.leaks) {
        try {
          // Use only backend proxy to avoid CORS and rate limiting issues
          const backendResponse = await fetch(`http://localhost:3000/ipfs-metadata/${leak.uri}`);
          if (backendResponse.ok) {
            const result = await backendResponse.json();
            if (result.success && result.metadata) {
              newMetadata.set(id.toString(), result.metadata);
              console.log(`✅ Metadata fetched for leak ${id} via backend`);
            }
          } else {
            console.log(`❌ Backend failed for leak ${id}: ${backendResponse.status}`);
          }
        } catch (error) {
          console.error(`Error fetching metadata for leak ${id}:`, error);
        }
        
        // Add small delay to avoid overwhelming the backend
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setLeakMetadata(newMetadata);
      setLastUpdateTime(new Date());
      console.log('✅ Metadata update completed via backend');
    } catch (error) {
      console.error('Error updating metadata:', error);
    } finally {
      setIsUpdatingMetadata(false);
    }
  };

  const formatLeakId = (id: bigint): string => {
    return id.toString();
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
          
          {/* Info about metadata */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>💡 Metadata Loading:</strong> Leak titles, descriptions, and TLD verification are stored on IPFS. 
                Use the "Update Metadata" button to fetch this information through our secure backend proxy. 
                This ensures reliable access without CORS issues or rate limiting.
              </p>
            </div>
          </div>
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  All Submitted Leaks
                </CardTitle>
                <CardDescription>
                  Anonymous submissions protected by zero-knowledge proofs. Click on
                  URIs to access content.
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {lastUpdateTime && (
                  <p className="text-sm text-muted-foreground">
                    Last updated: {lastUpdateTime.toLocaleTimeString()}
                  </p>
                )}
                <Button
                  onClick={updateAllMetadata}
                  disabled={isUpdatingMetadata || !derivedState?.leaks}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isUpdatingMetadata ? 'animate-spin' : ''}`} />
                  {isUpdatingMetadata ? 'Updating...' : 'Update Metadata'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {derivedState?.leaks && !derivedState.leaks.isEmpty() ? (
                <div className="grid gap-6">
                  {Array.from(derivedState.leaks)
                    .sort(([idA], [idB]) => {
                      // Sort by leak ID in descending order (newest first)
                      return Number(idB) - Number(idA);
                    })
                    .map(([id, leak]) => (
                    <Card
                      key={formatLeakId(leak.id)}
                      className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Leak Info */}
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">
                                Leak ID
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                #{formatLeakId(leak.id)}
                              </p>
                            </div>

                            {/* TLD Verification Status */}
                            {leakMetadata.get(leak.id.toString())?.tld && leakMetadata.get(leak.id.toString())?.emailVerified && (
                              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                                      <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                      <p className="font-semibold text-green-800 dark:text-green-200">
                                        Verified Organization
                                      </p>
                                    </div>
                                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                                      This leak comes from a verified member of <strong>.{leakMetadata.get(leak.id.toString())?.tld}</strong> organization
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-green-600 dark:text-green-400">
                                      <span className="flex items-center gap-1">
                                        <Shield className="w-3 h-3" />
                                        TLD: .{leakMetadata.get(leak.id.toString())?.tld}
                                      </span>
                                      <span>
                                        Verified: {new Date(leakMetadata.get(leak.id.toString())?.verificationTimestamp || 0).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Leak Title */}
                            {leakMetadata.get(leak.id.toString())?.title ? (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Title
                                </p>
                                <div className="bg-muted p-3 rounded-lg">
                                  <p className="text-sm font-semibold text-foreground">
                                    {leakMetadata.get(leak.id.toString())?.title}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Title
                                </p>
                                <div className="bg-muted/50 p-3 rounded-lg border border-dashed">
                                  <p className="text-sm text-muted-foreground">
                                    Metadata not loaded. Click "Update Metadata" to fetch.
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Leak Description */}
                            {leakMetadata.get(leak.id.toString())?.description ? (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Description
                                </p>
                                <div className="bg-muted p-3 rounded-lg">
                                  <p className="text-sm text-foreground">
                                    {leakMetadata.get(leak.id.toString())?.description}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-2">
                                  Description
                                </p>
                                <div className="bg-muted/50 p-3 rounded-lg border border-dashed">
                                  <p className="text-sm text-muted-foreground">
                                    Metadata not loaded. Click "Update Metadata" to fetch.
                                  </p>
                                </div>
                              </div>
                            )}

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
                              Content Access
                            </p>
                            <div className="space-y-3 mb-3">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Metadata JSON CID:
                                </p>
                                <div className="bg-muted p-2 rounded-lg">
                                  <p className="text-xs font-mono break-all">
                                    {leak.uri}
                                  </p>
                                </div>
                              </div>
                              {leakMetadata.get(leak.id.toString())?.imagecid && (
                                <div>
                                  <p className="text-xs font-medium text-muted-foreground mb-1">
                                    File CID:
                                  </p>
                                  <div className="bg-muted p-2 rounded-lg">
                                    <p className="text-xs font-mono break-all">
                                      {leakMetadata.get(leak.id.toString())?.imagecid}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {leakMetadata.get(leak.id.toString())?.imagecid ? (
                                <a
                                  href={`https://gateway.pinata.cloud/ipfs/${leakMetadata.get(leak.id.toString())?.imagecid}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="col-span-1 sm:col-span-2"
                                >
                                  <Button variant="outline" className="w-full">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open File on IPFS
                                  </Button>
                                </a>
                              ) : (
                                <Button variant="outline" className="w-full col-span-1 sm:col-span-2" disabled>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Load Metadata First
                                </Button>
                              )}
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  navigator.clipboard.writeText(leak.uri);
                                }}
                                className="w-full"
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Metadata CID
                              </Button>
                              {leakMetadata.get(leak.id.toString())?.imagecid && (
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    navigator.clipboard.writeText(leakMetadata.get(leak.id.toString())?.imagecid || '');
                                  }}
                                  className="w-full"
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy File CID
                                </Button>
                              )}
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
