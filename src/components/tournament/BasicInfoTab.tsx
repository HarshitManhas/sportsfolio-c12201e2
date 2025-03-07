
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface BasicInfoTabProps {
  control: Control<any>;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export const BasicInfoTab = ({
  control,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: BasicInfoTabProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tournament Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter tournament name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sport</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="volleyball">Volleyball</SelectItem>
                <SelectItem value="cricket">Cricket</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <FormLabel>Start Date</FormLabel>
          <div className="border rounded-md">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>

        <div className="space-y-2">
          <FormLabel>End Date (Optional)</FormLabel>
          <div className="border rounded-md">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              disabled={(date) => !startDate || date < startDate}
            />
          </div>
        </div>
      </div>

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Enter tournament location" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="visibility"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Visibility</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="public">Public (Listed in discovery)</SelectItem>
                <SelectItem value="private">Private (Accessible via link only)</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Public tournaments are visible to everyone in the Discover section.
              Private tournaments require a shareable link.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
