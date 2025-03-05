
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ConfirmationStepProps {
  tournamentName: string;
  isPaid: boolean;
  onDone: () => void;
}

export const ConfirmationStep = ({
  tournamentName,
  isPaid,
  onDone,
}: ConfirmationStepProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Registration Submitted!</DialogTitle>
        <DialogDescription>
          Your registration for {tournamentName} has been submitted successfully.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 text-center">
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
          <p className="font-medium">Registration Status</p>
          {isPaid ? (
            <p className="text-sm">Payment verification pending</p>
          ) : (
            <p className="text-sm">Confirmed</p>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          You will receive a notification once your registration is confirmed.
        </p>
      </div>

      <DialogFooter>
        <Button onClick={onDone}>Done</Button>
      </DialogFooter>
    </>
  );
};
