"use client";
import { useEffect, useState } from "react";
import { PinataSDK } from "pinata";
import { axiosInstance } from "@/lib/axios";
import {
  Upload,
  FileText,
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || "",
  pinataGateway:
    process.env.PINATA_GATEWAY_URL || "https://gateway.pinata.cloud",
});

interface PinataFileUploadProps {
  onUploaded: (leakData: {
    uri: string;
    title: string;
    description: string;
    tld?: string;
  }) => void;
  title: string;
  description: string;
}

interface EmailVerificationResult {
  success: boolean;
  message: string;
  proof: {
    tld: string;
    timestamp: number;
    dkimVerified: boolean;
  };
  tld: string;
  dkimVerified: boolean;
}

function PinataFileUpload({
  onUploaded,
  title,
  description,
}: PinataFileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uri, setUri] = useState("");
  const [leakTitle, setLeakTitle] = useState("");
  const [leakDescription, setLeakDescription] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<
    "idle" | "verifying" | "verified" | "failed"
  >("idle");
  const [verificationResult, setVerificationResult] =
    useState<EmailVerificationResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const verifyEmail = async (emailAddress: string) => {
    if (!emailAddress.trim()) {
      setEmailVerificationStatus("idle");
      setVerificationResult(null);
      return;
    }

    setEmailVerificationStatus("verifying");
    try {
      const response = await axiosInstance.post(
        "/zk-verify-email",
        {
          email: emailAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result: EmailVerificationResult = response.data;
      setVerificationResult(result);

      if (result.success) {
        setEmailVerificationStatus("verified");
      } else {
        setEmailVerificationStatus("failed");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setEmailVerificationStatus("failed");
      setVerificationResult(null);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Reset verification status when email changes
    if (emailVerificationStatus !== "idle") {
      setEmailVerificationStatus("idle");
      setVerificationResult(null);
    }
  };

  const handleEmailBlur = () => {
    if (email.trim()) {
      verifyEmail(email);
    }
  };

  const getUploadUrl = async () => {
    try {
      setUploadStatus("Getting upload URL...");
      const urlResponse = await axiosInstance.get(`/presigned_url`);
      console.log(urlResponse);
      const data = urlResponse.data;
      return data.url;
    } catch (error) {
      setUploadStatus(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleUploadImage = async () => {
    if (!file || !leakTitle.trim() || !leakDescription.trim()) {
      setUploadStatus(
        "Please fill in all fields: title, description, and select a file"
      );
      return;
    }

    // Verify email if provided and not already verified
    if (email.trim() && emailVerificationStatus !== "verified") {
      await verifyEmail(email);
      if (emailVerificationStatus !== "verified") {
        setUploadStatus(
          "Please verify your email before uploading or leave it empty to skip verification"
        );
        return;
      }
    }

    try {
      setUploadStatus("Getting upload URL...");
      const url = await getUploadUrl();
      console.log(url);

      setUploadStatus("Uploading file...");

      const upload = await pinata.upload.private.file(file).url(url);

      if (upload.cid) {
        setUploadStatus("File uploaded successfully!");
        handleUploadJson(upload.cid);
        setUri(upload.cid);
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      setUploadStatus(
        `Error: ${error instanceof Error ? error.message : String(error)} [Is the server running?]`
      );
    }
  };

  const handleUploadJson = async (imagecid: string) => {
    try {
      setUploadStatus("Uploading JSON metadata...");
      const url = await getUploadUrl();

      // Prepare metadata with TLD if email is verified
      const metadata: any = {
        title: leakTitle,
        description: leakDescription,
        imagecid,
      };

      // Add TLD to metadata if email verification was successful
      if (verificationResult?.success && verificationResult.tld) {
        metadata.tld = verificationResult.tld;
        metadata.emailVerified = true;
        metadata.verificationTimestamp = verificationResult.proof.timestamp;
      }

      const jsonUpload = await pinata.upload.private.json(metadata).url(url);

      if (jsonUpload.cid) {
        setUploadStatus("Metadata uploaded successfully!");
        onUploaded({
          uri: jsonUpload.cid,
          title: leakTitle,
          description: leakDescription,
          tld: verificationResult?.tld,
        });
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      setUploadStatus(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const readUri = async () => {
    try {
      const response = await axiosInstance.get(`/read_uri/${uri}`);
      console.log(response);

      const file = response.data.file;
      console.log(file);

      const url = file.url;
      console.log(url);

      const image = new Image();
      image.src = url;
    } catch (error) {
      // setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  };

  useEffect(() => {
    if (uri) {
      readUri();
    }
  }, [uri]);

  const getEmailStatusIcon = () => {
    switch (emailVerificationStatus) {
      case "verifying":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getEmailStatusText = () => {
    switch (emailVerificationStatus) {
      case "verifying":
        return "Verificando email...";
      case "verified":
        return `Email verificado (${verificationResult?.tld})`;
      case "failed":
        return "Error en la verificación del email";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Verification */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email para verificación ZK (Opcional)
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@empresa.com"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className="w-full pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {getEmailStatusIcon()}
            </div>
          </div>
          {emailVerificationStatus !== "idle" && (
            <div
              className={`text-sm flex items-center gap-2 ${
                emailVerificationStatus === "verified"
                  ? "text-green-600"
                  : emailVerificationStatus === "failed"
                    ? "text-red-600"
                    : "text-blue-600"
              }`}
            >
              {getEmailStatusText()}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            El email será verificado usando pruebas de conocimiento cero y el
            TLD se incluirá en los metadatos. Si no proporcionas email, el leak
            se subirá sin verificación.
          </p>
        </div>

        {/* Leak Title */}
        <div className="space-y-2">
          <Label htmlFor="leak-title">Leak Title</Label>
          <Input
            id="leak-title"
            placeholder="Enter a descriptive title for your leak"
            value={leakTitle}
            onChange={(e) => setLeakTitle(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Leak Description */}
        <div className="space-y-2">
          <Label htmlFor="leak-description">Leak Description</Label>
          <Textarea
            id="leak-description"
            placeholder="Provide additional context or notes about this leak"
            value={leakDescription}
            onChange={(e) => setLeakDescription(e.target.value)}
            className="w-full min-h-[80px]"
          />
        </div>

        {/* File Input Section */}
        <div className="space-y-3">
          <Label>Document File</Label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {file ? file.name : "Seleccionar archivo"}
              </span>
            </label>
          </div>

          {file && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <FileText className="w-4 h-4" />
              <span>Archivo seleccionado: {file.name}</span>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUploadImage}
          disabled={!file || !leakTitle.trim() || !leakDescription.trim()}
          className="w-full"
          size="lg"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload to Pinata
        </Button>

        {/* Status Messages */}
        {uploadStatus && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm text-blue-700">{uploadStatus}</p>
          </div>
        )}

        {/* File Preview */}
        {file && (
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Vista previa del archivo:
            </p>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-gray-500">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PinataFileUpload;
