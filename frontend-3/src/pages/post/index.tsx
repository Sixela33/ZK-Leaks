import { Loading } from "@/components/loading";
import { useContractSubscription } from "@/modules/midnight/counter-ui";
import { useEffect, useState } from "react";
import { FileText, Upload, PlusCircle } from "lucide-react"; // Import PlusCircle
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PinataFileUpload from "@/components/pinataFileUpload";

export const SubmitLeak = () => {
  // 1. Destructure `onDeploy` from the hook to access the deployment function.
  const { deployedContractAPI, derivedState, providers, onDeploy } =
    useContractSubscription();

  const [appLoading, setAppLoading] = useState(true);
  const [newLeakUri, setNewLeakUri] = useState("");
  const [newLeakDonationAddr, setNewLeakDonationAddr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Add state to hold and display the address of a newly deployed contract.
  const [deployedAddress, setDeployedAddress] = useState<string | undefined>();

  useEffect(() => {
    if (derivedState?.round !== undefined) {
      setAppLoading(false);
    }
  }, [derivedState?.round]);

  // 3. Create a handler function to trigger the deployment.
  const handleDeploy = async () => {
    console.log("Deploying new contract for development...");
    const { address } = await onDeploy(); // Call the deployment function from the hook
    if (address) {
      setDeployedAddress(address);
      console.log(
        `New contract deployed at: ${address}. Please refresh to interact.`,
      );
    }
  };

  const createLeak = async () => {
    if (deployedContractAPI && newLeakUri && newLeakDonationAddr) {
      setIsSubmitting(true);
      try {
        await deployedContractAPI.createLeak(newLeakUri, newLeakDonationAddr);
        setNewLeakUri("");
        setNewLeakDonationAddr("");
      } catch (error) {
        console.error("Error creating leak:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {appLoading && <Loading />}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Submit a Leak
          </h1>
          <p className="text-xl text-muted-foreground">
            Anonymously submit sensitive information with zero-knowledge proofs
          </p>
        </div>

        {/* 4. Add a UI section for developer controls. */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dev Controls (For Testing Only)</CardTitle>
            <CardDescription>
              Deploy a new contract instance for testing. After deploying, you
              must refresh the page to connect to it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleDeploy} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Deploy New Test Contract
            </Button>
            {deployedAddress && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold text-foreground">
                  Deployment Successful
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  New Contract Address:
                </p>
                <p className="text-sm font-mono break-all text-primary">
                  {deployedAddress}
                </p>
                <p className="text-xs font-bold text-amber-600 mt-2">
                  ACTION REQUIRED: Please refresh the page now to interact with
                  this new contract.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {!deployedContractAPI && (
          <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-orange-600 dark:text-orange-400 font-medium">
                  Contract not deployed or connected. Please deploy a new
                  contract above or check your wallet connection.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Leak Submission Form
            </CardTitle>
            <CardDescription>
              Upload your document and provide a donation address to submit an
              anonymous leak.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Upload Document
                </label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select a file to upload. It will be stored securely and a URI
                  will be generated for the leak.
                </p>
                <PinataFileUpload
                  onUploaded={(leakUri) => {
                    setNewLeakUri(leakUri);
                  }}
                  title="Upload Leak Document"
                  description="Choose a file to upload securely"
                />
                {newLeakUri && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      ✓ File uploaded successfully
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-mono break-all mt-1">
                      {newLeakUri}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="donation-addr"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Donation Address
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Provide a wallet address where supporters can send donations.
                </p>
                <input
                  id="donation-addr"
                  type="text"
                  value={newLeakDonationAddr}
                  onChange={(e) => setNewLeakDonationAddr(e.target.value)}
                  placeholder="Enter your donation wallet address"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="border-t pt-6">
                <Button
                  onClick={createLeak}
                  disabled={
                    !deployedContractAPI ||
                    !newLeakUri ||
                    !newLeakDonationAddr ||
                    isSubmitting
                  }
                  className="w-full gap-2 h-12"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Leak...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>Submit Anonymous Leak</span>
                    </>
                  )}
                </Button>
              </div>

              {providers?.flowMessage && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {providers.flowMessage}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>Privacy Notice:</strong> Your submission is protected by
                zero-knowledge proofs.
              </p>
              <p>
                No personal information is stored on-chain, and your identity
                remains completely anonymous.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
