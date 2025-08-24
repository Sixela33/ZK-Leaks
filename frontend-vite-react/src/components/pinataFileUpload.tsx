import { useState } from 'react'
import { PinataSDK } from 'pinata'
import { axiosInstance } from '@/lib/axios'

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || "",
  pinataGateway: process.env.PINATA_GATEWAY_URL || "https://gateway.pinata.cloud"
})

interface LeakMetadata {
  title: string
  description: string
  file: File
}

interface PinataFileUploadProps {
  onUploaded: (link: string) => void,
  title: string,
  description: string,
}

function PinataFileUpload({onUploaded, title, description}: PinataFileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [imagecid, setImagecid] = useState('')
  const [jsoncid, setJsoncid] = useState('')
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const getUploadUrl = async () => {
    try {
      setUploadStatus('Getting upload URL...')
      const urlResponse = await axiosInstance.get(`/presigned_url`)
      console.log(urlResponse)
      const data = urlResponse.data
      return data.url
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleUploadImage = async () => {
    if (!file) return

    try {
      setUploadStatus('Getting upload URL...')
      const url = await getUploadUrl()
      console.log(url)

      setUploadStatus('Uploading file...')

      const upload = await pinata.upload.private
        .file(file)
        .url(url)

      if (upload.cid) {
        setUploadStatus('File uploaded successfully!')
        handleUploadJson(upload.cid)
      } else {
        setUploadStatus('Upload failed')
      }
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleUploadJson = async (imagecid: string) => {
    try {
      setUploadStatus('Uploading JSON...')
      const url = await getUploadUrl()
      const jsonUpload = await pinata.upload.private
        .json({
          title,
          description,
          imagecid,
        }).url(url)
      if (jsonUpload.cid) {
        setUploadStatus('JSON uploaded successfully!')
        onUploaded(jsonUpload.cid)
      } else {
        setUploadStatus('Upload failed')
      }
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <>
      <div>
      </div>
      <h1>Pinata File Upload</h1>
      <div className="card">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUploadImage} disabled={!file}>
          Upload to Pinata
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {imagecid && <a href={imagecid} target='_blank'>View File</a>}
      </div>
    </>
  )
}

export default PinataFileUpload