
import { useState } from 'react';
import { chatService } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';

export const useFileUpload = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const fileId = await chatService.uploadFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
      return fileId;
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "File Upload",
      description: "File upload functionality will be connected to the backend."
    });
  };

  return {
    uploadFile,
    handleFileUpload,
    isUploading
  };
};
