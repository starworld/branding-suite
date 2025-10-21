import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandPositioningId: string;
}

export function ShareModal({ open, onOpenChange, brandPositioningId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate public share URL
  const shareUrl = `${window.location.origin}/shared-report/${brandPositioningId}`;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>レポートを共有</DialogTitle>
          <DialogDescription>
            このリンクを共有すると、誰でもレポートを閲覧できます。
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="share-link"
              value={shareUrl}
              readOnly
              className="h-9"
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                コピー済み
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                コピー
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

