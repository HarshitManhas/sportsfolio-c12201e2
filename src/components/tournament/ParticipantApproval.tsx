
import { useState, useEffect } from "react";
import { 
  fetchPendingRegistrations, 
  updateRegistrationStatus 
} from "@/services/tournamentService";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { toast } from "sonner";
import { RegistrationList } from "./RegistrationList";
import { ApprovalDialog } from "./ApprovalDialog";

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
    setOpenDialog(true);
  };

  const handleConfirmAction = async (notes: string) => {
    if (!selectedParticipant) return;
    
    setProcessingAction(true);
    try {
      // Convert 'approve' to 'approved' and 'deny' to 'denied' to match the API requirements
      const apiAction = action === 'approve' ? 'approved' : 'denied';
      
      await updateRegistrationStatus(
        tournamentId,
        selectedParticipant.profile_id,
        apiAction,
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
          <RegistrationList 
            registrations={registrations}
            onApprove={(participant) => handleOpenDialog(participant, 'approve')}
            onDeny={(participant) => handleOpenDialog(participant, 'deny')}
          />
        </CardContent>
      </Card>

      <ApprovalDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        participant={selectedParticipant}
        action={action}
        processingAction={processingAction}
        onConfirm={handleConfirmAction}
      />
    </>
  );
};
