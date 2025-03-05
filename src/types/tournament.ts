
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
