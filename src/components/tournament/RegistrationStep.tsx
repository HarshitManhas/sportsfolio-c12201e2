
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
import { Upload } from "lucide-react";

export type RegistrationFormData = {
  name: string;
  phone: string;
  dob: string;
  experience: string;
  photo?: File;
};

interface RegistrationStepProps {
  tournamentName: string;
  onSubmit: (data: RegistrationFormData) => void;
}

export const RegistrationStep = ({
  tournamentName,
  onSubmit,
}: RegistrationStepProps) => {
  const form = useForm<RegistrationFormData>({
    defaultValues: {
      name: "",
      phone: "",
      dob: "",
      experience: "",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Join {tournamentName}</DialogTitle>
        <DialogDescription>
          Please provide your information to register for this tournament.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Beginner, Intermediate, Advanced, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit">Proceed to Payment</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
