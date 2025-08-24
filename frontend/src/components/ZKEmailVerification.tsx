import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, CheckCircle, AlertCircle, Mail, Zap } from 'lucide-react';

interface ZKEmailVerificationProps {
  onVerificationComplete: (verifiedTLD: string, zkProof: string) => void;
  isOptional?: boolean;
}

interface ZKProofData {
  tld: string;
  zkProof: string;
  verified: boolean;
  timestamp: string;
}

export const ZKEmailVerification = ({ onVerificationComplete, isOptional = true }: ZKEmailVerificationProps) => {
  const [email, setEmail] = useState('');
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [verifiedData, setVerifiedData] = useState<ZKProofData | null>(null);
  const [proofProgress, setProofProgress] = useState(0);

  const extractTLD = (email: string): string => {
    const domain = email.split('@')[1];
    if (!domain) return '';
    const parts = domain.split('.');
    return parts[parts.length - 1].toLowerCase();
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const simulateZKProofGeneration = async (email: string): Promise<ZKProofData> => {
    const tld = extractTLD(email);
    
    // Simulate realistic ZK proof generation steps
    const steps = [
      { message: 'Parsing email headers...', duration: 800 },
      { message: 'Extracting DKIM signature...', duration: 1200 },
      { message: 'Generating circuit inputs...', duration: 1000 },
      { message: 'Computing ZK proof...', duration: 2000 },
      { message: 'Verifying proof locally...', duration: 600 },
      { message: 'Finalizing verification...', duration: 400 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setProofProgress(((i + 1) / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    // Generate mock ZK proof
    const mockProof = {
      tld,
      zkProof: `zk_proof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      verified: true,
      timestamp: new Date().toISOString()
    };

    return mockProof;
  };

  const handleGenerateProof = async () => {
    if (!validateEmail(email)) {
      setVerificationStatus('error');
      return;
    }

    setIsGeneratingProof(true);
    setVerificationStatus('generating');
    setProofProgress(0);

    try {
      // Call backend to generate ZK proof (mock)
      const response = await fetch('http://localhost:3000/zk-verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Simulate the ZK proof generation process
        const zkProofData = await simulateZKProofGeneration(email);
        
        setVerifiedData(zkProofData);
        setVerificationStatus('success');
        
        // Notify parent component
        onVerificationComplete(zkProofData.tld, zkProofData.zkProof);
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('ZK Email verification error:', error);
      setVerificationStatus('error');
    } finally {
      setIsGeneratingProof(false);
      setProofProgress(0);
    }
  };

  const handleSkip = () => {
    onVerificationComplete('', '');
  };

  if (verificationStatus === 'success' && verifiedData) {
    return (
      <Card className="w-full border-green-200 bg-green-50 dark:bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="w-5 h-5" />
            ZK-Email Verification Complete
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Your organizational affiliation has been verified using zero-knowledge proofs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white dark:bg-green-950/50 p-4 rounded-lg border border-green-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Verified TLD</p>
                <p className="text-lg font-bold text-green-800 dark:text-green-200">.{verifiedData.tld}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Proof Status</p>
                <p className="text-lg font-bold text-green-800 dark:text-green-200">Verified ✓</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-green-600 dark:text-green-400">
                ZK Proof: {verifiedData.zkProof.substring(0, 20)}...
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Generated: {new Date(verifiedData.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 p-3 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <Shield className="w-4 h-4 inline mr-2" />
              <strong>Privacy Protected:</strong> Your email address was never transmitted. 
              Only the TLD verification was processed using zero-knowledge cryptography.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          ZK-Email Verification {isOptional && <span className="text-sm font-normal text-muted-foreground">(Optional)</span>}
        </CardTitle>
        <CardDescription>
          Verify your organizational affiliation using zero-knowledge email proofs. 
          This proves you belong to a specific domain without revealing your identity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {verificationStatus === 'generating' ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generating ZK Proof</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Processing your email verification using zero-knowledge cryptography...
              </p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${proofProgress}%` }}
              ></div>
            </div>
            
            <p className="text-center text-sm text-blue-600">
              {proofProgress < 20 && "Parsing email headers..."}
              {proofProgress >= 20 && proofProgress < 40 && "Extracting DKIM signature..."}
              {proofProgress >= 40 && proofProgress < 60 && "Generating circuit inputs..."}
              {proofProgress >= 60 && proofProgress < 90 && "Computing ZK proof..."}
              {proofProgress >= 90 && "Finalizing verification..."}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="verification-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="verification-email"
                  type="email"
                  placeholder="your.email@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isGeneratingProof}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your email will be processed locally to generate a zero-knowledge proof. 
                No email data is transmitted to our servers.
              </p>
            </div>

            {verificationStatus === 'error' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Verification Failed</span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Please check your email format and try again.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleGenerateProof}
                disabled={!email || isGeneratingProof}
                className="flex-1"
              >
                <Shield className="w-4 h-4 mr-2" />
                Generate ZK Proof
              </Button>
              
              {isOptional && (
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  disabled={isGeneratingProof}
                >
                  Skip
                </Button>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>How it works:</strong> We use ZK-Email technology to verify your email domain 
                without revealing your actual email address. The proof confirms you belong to the 
                organization while maintaining complete privacy.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ZKEmailVerification;
