
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully signed out!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {session ? (
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
            <div className="space-y-4">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {session.user.email}
              </p>
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default Profile;
