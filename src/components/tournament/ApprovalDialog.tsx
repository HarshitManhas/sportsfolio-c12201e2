
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: any | null;
  action: 'approve' | 'deny';
  processingAction: boolean;
  onConfirm: (notes: string) => void;
}

export const ApprovalDialog = ({
  open,
  onOpenChange,
  participant,
  action,
  processingAction,
  onConfirm,
}: ApprovalDialogProps) => {
  const [notes, setNotes] = useState("");
  
  const handleConfirm = () => {
    onConfirm(notes);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === 'approve' ? 'Approve Registration' : 'Deny Registration'}
          </DialogTitle>
          <DialogDescription>
            {action === 'approve' 
              ? 'The participant will be notified and added to the tournament.'
              : 'The participant will be notified that their registration was denied.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {participant && (
            <div className="border p-3 rounded-md bg-muted/50">
              <p className="font-medium">{participant.profiles?.name}</p>
              <p className="text-sm text-muted-foreground">{participant.profiles?.email}</p>
            </div>
          )}

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              {action === 'approve' ? 'Notes (optional)' : 'Reason for denial'}
            </label>
            <Textarea
              id="notes"
              placeholder={action === 'approve' 
                ? "Add any notes for this approval" 
                : "Please provide a reason for denying this registration"}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={processingAction}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={processingAction || (action === 'deny' && !notes)}
            variant={action === 'approve' ? 'default' : 'destructive'}
          >
            {processingAction ? 'Processing...' : action === 'approve' ? 'Approve' : 'Deny'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
