
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Upload } from "lucide-react";

interface TournamentRegistrationProps {
  tournamentId: string;
  tournamentName: string;
  entryFee?: string;
}

type RegistrationForm = {
  name: string;
  phone: string;
  dob: string;
  experience: string;
  photo?: File;
};

type PaymentForm = {
  transactionId: string;
  screenshot?: File;
};

const TournamentRegistration = ({
  tournamentId,
  tournamentName,
  entryFee = "Free",
}: TournamentRegistrationProps) => {
  const [step, setStep] = useState<"registration" | "payment" | "confirmation">("registration");
  const [open, setOpen] = useState(false);

  const registrationForm = useForm<RegistrationForm>({
    defaultValues: {
      name: "",
      phone: "",
      dob: "",
      experience: "",
    },
  });

  const paymentForm = useForm<PaymentForm>({
    defaultValues: {
      transactionId: "",
    },
  });

  const handleRegistrationSubmit = (data: RegistrationForm) => {
    console.log("Registration data:", data);
    // In a real app, this would validate and store the registration info
    toast.success("Registration information submitted!");
    
    if (entryFee !== "Free") {
      setStep("payment");
    } else {
      setStep("confirmation");
    }
  };

  const handlePaymentSubmit = (data: PaymentForm) => {
    console.log("Payment data:", data);
    // In a real app, this would submit the payment proof for verification
    toast.success("Payment details submitted for verification!");
    setStep("confirmation");
  };

  const handleDone = () => {
    setOpen(false);
    setStep("registration");
    registrationForm.reset();
    paymentForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Join Tournament</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {step === "registration" && (
          <>
            <DialogHeader>
              <DialogTitle>Join {tournamentName}</DialogTitle>
              <DialogDescription>
                Please provide your information to register for this tournament.
              </DialogDescription>
            </DialogHeader>

            <Form {...registrationForm}>
              <form onSubmit={registrationForm.handleSubmit(handleRegistrationSubmit)} className="space-y-4">
                <FormField
                  control={registrationForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registrationForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registrationForm.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registrationForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <FormControl>
                        <Input placeholder="Beginner, Intermediate, Advanced, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {entryFee !== "Free" ? "Proceed to Payment" : "Complete Registration"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle>Payment for {tournamentName}</DialogTitle>
              <DialogDescription>
                Tournament entry fee: <Badge variant="outline">₹{entryFee}</Badge>
              </DialogDescription>
            </DialogHeader>

            <div className="border p-4 rounded-md bg-gray-50 mb-4">
              <h4 className="font-medium text-sm mb-2">Payment Details</h4>
              <div className="text-center">
                <div className="border inline-block p-4 rounded bg-white mb-2">
                  <CreditCard className="w-16 h-16 mx-auto text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">Scan QR code or use UPI ID</p>
                <p className="text-sm font-medium">sportsfilio@upi</p>
              </div>
            </div>

            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
                <FormField
                  control={paymentForm.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your payment transaction ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-dashed border-2 rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Upload payment screenshot</p>
                  <Input 
                    type="file" 
                    className="hidden" 
                    id="paymentScreenshot" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        paymentForm.setValue("screenshot", file);
                      }
                    }} 
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("paymentScreenshot")?.click()}
                  >
                    Choose File
                  </Button>
                </div>

                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setStep("registration")}>
                    Back
                  </Button>
                  <Button type="submit">Submit Payment</Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}

        {step === "confirmation" && (
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
                {entryFee !== "Free" ? (
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
              <Button onClick={handleDone}>Done</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TournamentRegistration;
