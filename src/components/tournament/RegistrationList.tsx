
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ExternalLink } from "lucide-react";

interface RegistrationListProps {
  registrations: any[];
  onApprove: (registration: any) => void;
  onDeny: (registration: any) => void;
}

export const RegistrationList = ({ 
  registrations, 
  onApprove, 
  onDeny 
}: RegistrationListProps) => {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (registrations.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No pending registrations found</p>
      </div>
    );
  }

  return (
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
                  onClick={() => onApprove(reg)}
                  className="flex items-center"
                >
                  <Check className="mr-1 h-4 w-4" /> Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onDeny(reg)}
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
  );
};
