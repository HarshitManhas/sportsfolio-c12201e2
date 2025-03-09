
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Badge } from "@/components/ui/badge";
import { CreditCard, Upload } from "lucide-react";
import { toast } from "sonner";

export type PaymentFormData = {
  transactionId: string;
  screenshot?: File;
};

interface PaymentStepProps {
  tournamentName: string;
  entryFee: string;
  onSubmit: (data: PaymentFormData) => void;
  onBack: () => void;
}

export const PaymentStep = ({
  tournamentName,
  entryFee,
  onSubmit,
  onBack,
}: PaymentStepProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const form = useForm<PaymentFormData>({
    defaultValues: {
      transactionId: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size exceeds 5MB limit");
        return;
      }
      
      form.setValue("screenshot", file);
      setSelectedFileName(file.name);
    }
  };

  const handleSubmit = (data: PaymentFormData) => {
    if (!data.screenshot && parseInt(entryFee) > 0) {
      toast.error("Please upload a payment screenshot");
      return;
    }
    
    onSubmit(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Payment for {tournamentName}</DialogTitle>
        <DialogDescription>
          Tournament entry fee: <Badge variant="outline">{entryFee}</Badge>
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            {selectedFileName && (
              <p className="text-xs text-primary mb-2">Selected: {selectedFileName}</p>
            )}
            <Input 
              type="file" 
              className="hidden" 
              id="paymentScreenshot" 
              accept="image/*"
              onChange={handleFileChange}
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
            <Button variant="outline" type="button" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Submit Payment</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
