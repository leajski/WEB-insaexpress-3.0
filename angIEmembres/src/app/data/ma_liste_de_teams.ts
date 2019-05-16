import { Team, TeamAchievement } from './team.service';

export const TEAMS: Team[] = [
  { id: 1,
    name: 'Vers Metz en Jetski',
    picture:"rien",
    latitude: 12,
    longitude: 13,
    score: 200,
    disqualified: false,
    team_achievements: [],
    participants: [{name: "Léa", phone: "0645461240"},{name:"Hortense", phone:"0645461240"}]},

    { id: 2,
      name: 'Les Anciens',
      picture:"rien",
      latitude: 12,
      longitude: 13,
      score: 100,
      disqualified: false,
      team_achievements: [],
      participants: [{name: "Nico", phone: "0645461240"},{name:"Francis", phone:"0645461240"}]}
]
