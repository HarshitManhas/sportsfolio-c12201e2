
import { useState, useEffect } from "react";
import { 
  fetchPendingRegistrations, 
  updateRegistrationStatus 
} from "@/services/tournamentService";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ParticipantApprovalProps {
  tournamentId: string;
  tournamentName: string;
}

export const ParticipantApproval = ({ 
  tournamentId, 
  tournamentName 
}: ParticipantApprovalProps) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  const [action, setAction] = useState<'approve' | 'deny'>('approve');
  const [notes, setNotes] = useState("");
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    loadRegistrations();
  }, [tournamentId]);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const data = await fetchPendingRegistrations(tournamentId);
      setRegistrations(data);
    } catch (error) {
      console.error("Error loading registrations:", error);
      toast.error("Failed to load pending registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (participant: any, action: 'approve' | 'deny') => {
    setSelectedParticipant(participant);
    setAction(action);
    setNotes("");
    setOpenDialog(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedParticipant) return;
    
    setProcessingAction(true);
    try {
      await updateRegistrationStatus(
        tournamentId,
        selectedParticipant.profile_id,
        action,
        notes
      );
      
      toast.success(`Registration ${action === 'approve' ? 'approved' : 'denied'} successfully`);
      setOpenDialog(false);
      loadRegistrations(); // Refresh the list
      
    } catch (error: any) {
      toast.error(error.message || `Failed to ${action} registration`);
    } finally {
      setProcessingAction(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Registrations</CardTitle>
          <CardDescription>Loading participants...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Registrations</CardTitle>
          <CardDescription>
            Review and approve tournament participants for {tournamentName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No pending registrations found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Participant</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((reg) => (
                  <TableRow key={reg.profile_id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{reg.profiles?.name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">{reg.profiles?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(reg.joined_at)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="w-fit">
                          {reg.payment_status}
                        </Badge>
                        {reg.payment_details?.paymentDetails?.transactionId && (
                          <span className="text-xs">
                            Transaction: {reg.payment_details.paymentDetails.transactionId}
                          </span>
                        )}
                        {reg.payment_details?.payment_screenshot_url && (
                          <a 
                            href={reg.payment_details.payment_screenshot_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-xs text-primary hover:underline"
                          >
                            View Screenshot <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleOpenDialog(reg, 'approve')}
                          className="flex items-center"
                        >
                          <Check className="mr-1 h-4 w-4" /> Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleOpenDialog(reg, 'deny')}
                          className="flex items-center"
                        >
                          <X className="mr-1 h-4 w-4" /> Deny
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
            {selectedParticipant && (
              <div className="border p-3 rounded-md bg-muted/50">
                <p className="font-medium">{selectedParticipant.profiles?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedParticipant.profiles?.email}</p>
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
              onClick={() => setOpenDialog(false)}
              disabled={processingAction}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              disabled={processingAction || (action === 'deny' && !notes)}
              variant={action === 'approve' ? 'default' : 'destructive'}
            >
              {processingAction ? 'Processing...' : action === 'approve' ? 'Approve' : 'Deny'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
