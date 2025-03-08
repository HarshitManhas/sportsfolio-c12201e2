
export interface TournamentFormData {
  name: string;
  sport: string;
  startDate?: Date;
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

export interface Tournament {
  id: string;
  title: string;
  sport: string;
  start_date: string;
  end_date: string;
  location: string | any;
  max_participants: number;
  entry_fee: string;
  format: string;
  description: string;
  rules: string;
  visibility: string;
  organizer_id: string;
  organizer_name?: string;
  created_at: string;
  updated_at: string;
  status: string;
  participants_count?: number;
  image_url?: string;
  profiles?: {
    name: string;
  };
}
