// Transform mock data to calendar event format matching the original injuryprofiler.com
import { CALENDAR_EVENT_TYPES } from '../components/Calendar/constants';

// Event colors matching the original design
const EVENT_COLORS = {
  [CALENDAR_EVENT_TYPES.TRAINING_SESSION]: {
    backgroundColor: '#3a8dee',
    borderColor: '#0e478a',
    textColor: '#ffffff',
  },
  [CALENDAR_EVENT_TYPES.GAME]: {
    backgroundColor: '#e74d3d',
    borderColor: '#c0392b',
    textColor: '#ffffff',
  },
  [CALENDAR_EVENT_TYPES.MEETING]: {
    backgroundColor: '#1bbc9c',
    borderColor: '#15a086',
    textColor: '#ffffff',
  },
  [CALENDAR_EVENT_TYPES.EVENT]: {
    backgroundColor: '#9b58b5',
    borderColor: '#8f44ad',
    textColor: '#ffffff',
  },
  [CALENDAR_EVENT_TYPES.CUSTOM_EVENT]: {
    backgroundColor: '#f39c11',
    borderColor: '#e77e23',
    textColor: '#ffffff',
  },
  [CALENDAR_EVENT_TYPES.UNKNOWN]: {
    backgroundColor: '#bec3c7',
    borderColor: '#969696',
    textColor: '#3f4448',
  },
};

export const transformTrainingSessionToEvent = (session) => {
  const startTime = session.date ? new Date(session.date) : new Date();
  const endTime = new Date(startTime.getTime() + (session.duration || 90) * 60000);

  return {
    id: `training-${session.id}`,
    title: `${session.session_type} - ${session.squad_name}`,
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    allDay: false,
    url: `#/training/${session.id}`,
    backgroundColor: EVENT_COLORS[CALENDAR_EVENT_TYPES.TRAINING_SESSION].backgroundColor,
    borderColor: EVENT_COLORS[CALENDAR_EVENT_TYPES.TRAINING_SESSION].borderColor,
    textColor: EVENT_COLORS[CALENDAR_EVENT_TYPES.TRAINING_SESSION].textColor,
    extendedProps: {
      type: CALENDAR_EVENT_TYPES.TRAINING_SESSION,
      description: session.notes || '',
      squad: {
        id: session.squad_id,
        name: session.squad_name,
      },
      location: session.location,
      coach: session.coach,
      intensity: session.intensity,
      attendance: session.attendance,
      maxAttendance: session.max_attendance,
      sessionRpe: session.session_rpe,
      weatherCondition: session.weather_condition,
      surfaceType: session.surface_type,
      gameDayPlus: session.game_day_plus,
      gameDayMinus: session.game_day_minus,
      exercises: session.exercises || [],
      eventCollectionComplete: session.status === 'Completed',
    },
  };
};

export const transformGameToEvent = (game) => {
  const startTime = game.date ? new Date(`${game.date}T${game.time || '15:00'}`) : new Date();
  const endTime = new Date(startTime.getTime() + 120 * 60000); // 2 hours for games

  return {
    id: `game-${game.id}`,
    title: `${game.home_team} vs ${game.away_team}`,
    start: startTime.toISOString(),
    end: endTime.toISOString(),
    allDay: false,
    url: `#/game/${game.id}`,
    backgroundColor: EVENT_COLORS[CALENDAR_EVENT_TYPES.GAME].backgroundColor,
    borderColor: EVENT_COLORS[CALENDAR_EVENT_TYPES.GAME].borderColor,
    textColor: EVENT_COLORS[CALENDAR_EVENT_TYPES.GAME].textColor,
    extendedProps: {
      type: CALENDAR_EVENT_TYPES.GAME,
      description: game.notes || '',
      squad: {
        id: game.squad_id,
        name: game.squad_name,
      },
      competition: game.competition,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      venue: game.venue,
      matchType: game.match_type,
      result: game.result,
      score: game.score,
      attendance: game.attendance,
      referee: game.referee,
      weather: game.weather,
      temperature: game.temperature,
      surface: game.surface,
      matchStatus: game.match_status,
      playerPerformances: game.player_performances || [],
      teamStats: game.team_stats || {},
      events: game.events || [],
    },
  };
};

export const transformMockDataToCalendarEvents = (trainingSessions = [], games = []) => {
  const events = [];

  // Transform training sessions
  trainingSessions.forEach(session => {
    events.push(transformTrainingSessionToEvent(session));
  });

  // Transform games
  games.forEach(game => {
    events.push(transformGameToEvent(game));
  });

  return events;
};
