
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import { Upload, Clipboard, CreditCard, Calendar as CalendarIcon } from "lucide-react";

interface TournamentForm {
  name: string;
  sport: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  maxParticipants: string;
  entryFee: string;
  format: string;
  description: string;
  rules: string;
  visibility: string;
  upiId?: string;
}

const CreateTournament = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("basic");
  const [hasEntryFee, setHasEntryFee] = useState(false);

  const form = useForm<TournamentForm>({
    defaultValues: {
      name: "",
      sport: "",
      location: "",
      maxParticipants: "",
      entryFee: "0",
      format: "knockout",
      description: "",
      rules: "",
      visibility: "public",
    },
  });

  const onSubmit = (data: TournamentForm) => {
    const tournamentData = {
      ...data,
      startDate,
      endDate,
      entryFee: hasEntryFee ? data.entryFee : "0",
    };
    
    console.log("Tournament data:", tournamentData);
    toast.success("Tournament created successfully!");
    navigate("/");
  };

  const handleNextTab = () => {
    if (activeTab === "basic") {
      setActiveTab("details");
    } else if (activeTab === "details") {
      setActiveTab("payment");
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handlePreviousTab = () => {
    if (activeTab === "details") {
      setActiveTab("basic");
    } else if (activeTab === "payment") {
      setActiveTab("details");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-primary mb-6">
            Create New Tournament
          </h1>

          <Form {...form}>
            <form className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tournament Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tournament name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tournament location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibility</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                </TabsContent>
                
                <TabsContent value="details" className="space-y-6">
                  <FormField
                    control={form.control}
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
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tournament Format</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                    control={form.control}
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
                    control={form.control}
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
                </TabsContent>
                
                <TabsContent value="payment" className="space-y-6">
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
                        control={form.control}
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
                        control={form.control}
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
                        <Input 
                          type="file" 
                          className="hidden" 
                          id="qrCode" 
                          accept="image/*"
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
                </TabsContent>
              </Tabs>

              <div className="flex justify-between pt-4 border-t">
                {activeTab !== "basic" ? (
                  <Button type="button" variant="outline" onClick={handlePreviousTab}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button type="button" onClick={handleNextTab}>
                  {activeTab === "payment" ? "Create Tournament" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;
