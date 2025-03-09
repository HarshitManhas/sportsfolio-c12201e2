
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
import { registerForTournament } from "@/services";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistrationSubmit = (data: RegistrationFormData) => {
    console.log("Registration data:", data);
    setRegistrationData(data);
    // In a real app, this would validate and store the registration info
    toast.success("Registration information submitted!");
    
    if (entryFee !== "Free" && parseInt(entryFee) > 0) {
      setStep("payment");
    } else {
      handleFreeRegistration(data);
    }
  };

  const handleFreeRegistration = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      await registerForTournament(tournamentId, data);
      toast.success("Free registration submitted! Your entry is pending approval.");
      setStep("confirmation");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Payment data:", data);
      if (registrationData) {
        const combinedData = {
          ...registrationData,
          paymentDetails: {
            transactionId: data.transactionId
          }
        };
        
        await registerForTournament(tournamentId, combinedData, data.screenshot);
        toast.success("Payment details submitted! Your entry is pending approval.");
        setStep("confirmation");
      }
    } catch (error: any) {
      toast.error(error.message || "Payment submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            isPaid={entryFee !== "Free" && parseInt(entryFee) > 0} 
            onDone={handleDone} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TournamentRegistration;
