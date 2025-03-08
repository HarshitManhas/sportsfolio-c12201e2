
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Control } from "react-hook-form";

interface PaymentTabProps {
  control: Control<any>;
  hasEntryFee: boolean;
  setHasEntryFee: (value: boolean) => void;
  setQrCodeFile: (file: File | null) => void;
}

export const PaymentTab = ({
  control,
  hasEntryFee,
  setHasEntryFee,
  setQrCodeFile,
}: PaymentTabProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setQrCodeFile(file);
      setSelectedFileName(file.name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <FormLabel className="text-base">Entry Fee</FormLabel>
          <FormDescription>
            Does your tournament require an entry fee?
          </FormDescription>
        </div>
        <Switch
          checked={hasEntryFee}
          onCheckedChange={setHasEntryFee}
        />
      </div>
      
      {hasEntryFee && (
        <>
          <FormField
            control={control}
            name="entryFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fee Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-7"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="upiId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPI ID / Payment Details</FormLabel>
                <FormControl>
                  <Input
                    placeholder="yourname@bank"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your UPI ID for receiving payments.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="border-dashed border-2 rounded-md p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Upload QR code for payments</p>
            {selectedFileName && (
              <p className="text-xs text-primary mb-2">Selected: {selectedFileName}</p>
            )}
            <Input 
              type="file" 
              className="hidden" 
              id="qrCode" 
              accept="image/*"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("qrCode")?.click()}
            >
              Choose File
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
