
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Navigation from "../components/Navigation";
import { TournamentFormData } from "@/types/tournament";
import { BasicInfoTab } from "@/components/tournament/BasicInfoTab";
import { DetailsTab } from "@/components/tournament/DetailsTab";
import { PaymentTab } from "@/components/tournament/PaymentTab";
import { createTournament } from "@/services/tournamentService";
import { supabase } from "@/integrations/supabase/client";

const CreateTournament = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("basic");
  const [hasEntryFee, setHasEntryFee] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TournamentFormData>({
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

  const onSubmit = async (data: TournamentFormData) => {
    if (!startDate) {
      toast.error("Start date is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // First check if user is authenticated
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast.error("You must be logged in to create a tournament");
        navigate("/profile");
        return;
      }
      
      const tournamentData = {
        title: data.name,
        sport: data.sport,
        start_date: startDate.toISOString(),
        end_date: endDate ? endDate.toISOString() : startDate.toISOString(),
        location: data.location, // String value for location
        skill_level: "All Levels", // Default value
        max_participants: parseInt(data.maxParticipants),
        entry_fee: hasEntryFee ? data.entryFee : "0",
        format: data.format,
        description: data.description,
        rules: data.rules,
        visibility: data.visibility,
        organizer_id: sessionData.session.user.id, // Use the authenticated user's ID
        status: "upcoming", // Default status for new tournaments
      };

      await createTournament(tournamentData);
      
      toast.success("Tournament created successfully!");
      navigate("/discover");
    } catch (err: any) {
      console.error("Unexpected error:", err);
      toast.error("Failed to create tournament: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
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
                
                <TabsContent value="basic">
                  <BasicInfoTab 
                    control={form.control}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </TabsContent>
                
                <TabsContent value="details">
                  <DetailsTab control={form.control} />
                </TabsContent>
                
                <TabsContent value="payment">
                  <PaymentTab 
                    control={form.control}
                    hasEntryFee={hasEntryFee}
                    setHasEntryFee={setHasEntryFee}
                  />
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
                
                <Button 
                  type="button" 
                  onClick={handleNextTab}
                  disabled={isSubmitting}
                >
                  {activeTab === "payment" ? (isSubmitting ? "Creating..." : "Create Tournament") : "Next"}
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
