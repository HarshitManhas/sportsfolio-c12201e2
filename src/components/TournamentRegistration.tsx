
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { RegistrationStep, RegistrationFormData } from "./tournament/RegistrationStep";
import { PaymentStep, PaymentFormData } from "./tournament/PaymentStep";
import { ConfirmationStep } from "./tournament/ConfirmationStep";

interface TournamentRegistrationProps {
  tournamentId: string;
  tournamentName: string;
  entryFee?: string;
}

type Step = "registration" | "payment" | "confirmation";

const TournamentRegistration = ({
  tournamentId,
  tournamentName,
  entryFee = "Free",
}: TournamentRegistrationProps) => {
  const [step, setStep] = useState<Step>("registration");
  const [open, setOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);

  const handleRegistrationSubmit = (data: RegistrationFormData) => {
    console.log("Registration data:", data);
    setRegistrationData(data);
    // In a real app, this would validate and store the registration info
    toast.success("Registration information submitted!");
    
    if (entryFee !== "Free") {
      setStep("payment");
    } else {
      setStep("confirmation");
    }
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    console.log("Payment data:", data);
    // In a real app, this would submit the payment proof for verification
    toast.success("Payment details submitted for verification!");
    setStep("confirmation");
  };

  const handleBack = () => {
    setStep("registration");
  };

  const handleDone = () => {
    setOpen(false);
    setStep("registration");
    setRegistrationData(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join Tournament</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {step === "registration" && (
          <RegistrationStep 
            tournamentName={tournamentName} 
            onSubmit={handleRegistrationSubmit} 
          />
        )}

        {step === "payment" && (
          <PaymentStep 
            tournamentName={tournamentName} 
            entryFee={entryFee} 
            onSubmit={handlePaymentSubmit}
            onBack={handleBack}
          />
        )}

        {step === "confirmation" && (
          <ConfirmationStep 
            tournamentName={tournamentName} 
            isPaid={entryFee !== "Free"} 
            onDone={handleDone} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TournamentRegistration;
