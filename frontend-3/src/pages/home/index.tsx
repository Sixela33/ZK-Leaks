import { useNavigate } from "react-router-dom";
import { Shield, FileText, Search, Info, Upload, Users } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Submit Leak",
      description:
        "Anonymously submit sensitive information with zero-knowledge proofs",
      icon: <Upload className="w-10 h-10 text-blue-600" />,
      path: "/post",
    },
    {
      title: "Explore Leaks",
      description: "Browse all submitted leaks and support whistleblowers",
      icon: <Search className="w-10 h-10 text-green-600" />,
      path: "/leaks",
    },
  ];

  const highlights = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Complete Anonymity",
      description:
        "Zero-knowledge proofs ensure your identity remains completely private",
    },
    {
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "Secure Storage",
      description: "Documents stored on IPFS with immutable blockchain records",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Community Support",
      description: "Enable direct donations to support brave whistleblowers",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              ZK-Leaks
            </h1>
            <p className="text-2xl text-muted-foreground mb-4">
              Anonymous Whistleblowing Platform
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expose wrongdoing while protecting your identity with advanced
              zero-knowledge cryptography
            </p>
          </div>
          <ModeToggle />
        </div>

        {/* Hero Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{highlight.icon}</div>
                <h3 className="text-lg font-semibold mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((item, index) => (
            <Card
              key={index}
              className="bg-card text-card-foreground rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-border"
            >
              <CardHeader>
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                <Button
                  className="w-full gap-2"
                  onClick={() => navigate(item.path)}
                >
                  <span>{item.title}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <Card className="mb-16 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Your Safety is Our Priority
              </h2>
              <p className="text-blue-600 dark:text-blue-400 max-w-3xl mx-auto mb-6">
                ZK-Leaks uses cutting-edge zero-knowledge proof technology to
                ensure that your identity remains completely anonymous while
                still allowing verification of your submissions. No personal
                information is ever stored on-chain.
              </p>
              <Button
                variant="outline"
                className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => navigate("/about")}
              >
                <Info className="w-4 h-4" />
                Learn More About Our Technology
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-20 mb-12 text-center">
          <p className="text-muted-foreground text-sm mb-10">
            Built with privacy-first technology
          </p>

          <div className="flex flex-col items-center justify-center space-y-1">
            <p className="text-xs text-muted-foreground tracking-wider mb-3">
              POWERED BY
            </p>
            <div className="flex items-center justify-center gap-5">
              <a
                href="https://meshjs.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center h-7 hover:opacity-80 transition-opacity"
                aria-label="Visit Mesh website"
              >
                <img
                  src="/meshlogo-with-title-white.svg"
                  alt="Mesh"
                  className="h-7 dark:block hidden object-contain"
                  style={{ width: "auto" }}
                />
                <img
                  src="/meshlogo-with-title-black.svg"
                  alt="Mesh"
                  className="h-7 dark:hidden block object-contain"
                  style={{ width: "auto" }}
                />
              </a>
              <div className="text-lg font-light text-muted-foreground opacity-50">
                ×
              </div>
              <a
                href="https://eddalabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center h-5 hover:opacity-80 transition-opacity"
                aria-label="Visit Edda Labs website"
              >
                <img
                  src="/transparent-logo-white.svg"
                  alt="Edda Labs"
                  className="h-5 dark:block hidden object-contain"
                  style={{ width: "auto" }}
                />
                <img
                  src="/transparent-logo-black.svg"
                  alt="Edda Labs"
                  className="h-5 dark:hidden block object-contain"
                  style={{ width: "auto" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
