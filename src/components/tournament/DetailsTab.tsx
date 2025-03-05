
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface DetailsTabProps {
  control: Control<any>;
}

export const DetailsTab = ({ control }: DetailsTabProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="maxParticipants"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Participants</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter maximum number of participants"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="format"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tournament Format</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="knockout">Knockout</SelectItem>
                <SelectItem value="league">League</SelectItem>
                <SelectItem value="groups">Groups + Knockout</SelectItem>
                <SelectItem value="roundrobin">Round Robin</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter tournament description"
                rows={4}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide details about your tournament, including prizes, schedules, and other important information.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="rules"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rules</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter tournament rules"
                rows={4}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Specify the rules and regulations for your tournament. Each rule on a new line.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
