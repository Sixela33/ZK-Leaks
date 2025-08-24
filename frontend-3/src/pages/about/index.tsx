import { Shield, Lock, FileText, Users, Zap, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const About = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Zero-Knowledge Proofs",
      description:
        "Advanced cryptographic technology ensures complete anonymity while maintaining verifiable integrity of submissions.",
    },
    {
      icon: <Lock className="w-8 h-8 text-green-600" />,
      title: "Complete Privacy",
      description:
        "No personal information is stored on-chain. Your identity remains completely anonymous and untraceable.",
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: "Secure Document Storage",
      description:
        "Documents are stored securely using IPFS and Pinata, ensuring immutable and decentralized access.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Community Support",
      description:
        "Allow supporters to donate directly to whistleblowers through transparent blockchain transactions.",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Built on Midnight",
      description:
        "Leverages the Midnight blockchain's privacy-focused architecture for maximum security and anonymity.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About ZK-Leaks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A revolutionary platform that empowers whistleblowers to expose
            wrongdoing while maintaining complete anonymity through advanced
            zero-knowledge cryptography.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              ZK-Leaks exists to protect those who speak truth to power. We
              believe that transparency and accountability are fundamental to a
              just society, and that whistleblowers should never have to choose
              between doing what's right and protecting themselves.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose ZK-Leaks?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit</h3>
                <p className="text-muted-foreground">
                  Upload your document and provide a donation address.
                  Zero-knowledge proofs protect your identity.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Verify</h3>
                <p className="text-muted-foreground">
                  Your submission is cryptographically verified and stored
                  immutably on the blockchain.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Expose</h3>
                <p className="text-muted-foreground">
                  Your leak becomes publicly accessible while you remain
                  completely anonymous and protected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Built With</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Blockchain Technology
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • Midnight blockchain for privacy-preserving smart contracts
                  </li>
                  <li>• Zero-knowledge proofs for anonymous verification</li>
                  <li>• Immutable on-chain storage for transparency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Storage & Security
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• IPFS for decentralized document storage</li>
                  <li>• Pinata for reliable content hosting</li>
                  <li>• End-to-end encryption for data protection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the movement for transparency and accountability. Your voice
              matters, and your safety is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => (window.location.href = "/post")}
              >
                <FileText className="w-5 h-5" />
                Submit a Leak
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <Github className="w-5 h-5" />
                View Source Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
