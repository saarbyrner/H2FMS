// All the data your prototype needs in one simple file
// Edit this file to change what appears in tables and cards

// Import comprehensive data from JSON files
import soldiersData from './data/soldiers.json'
import injuriesData from './data/injuries_medical.json'
import trainingsData from './data/training_sessions.json'
import assessmentsData from './data/assessments.json'
import gamesData from './data/games_matches.json'
import squadsData from './data/squads_teams.json'
import questionnairesData from './data/questionnaires_wellbeing.json'
import staffData from './data/users_staff.json'

// Export all data for easy access
export const soldiers = soldiersData
export const injuries = injuriesData
export const training = trainingsData
export const assessments = assessmentsData
export const games = gamesData
export const squads = squadsData
export const questionnaires = questionnairesData
export const staff = staffData

// Simple data extracts for backward compatibility and easy access
export const soldiersSimple = soldiers.map(soldier => ({
  id: soldier.id,
  name: `${soldier.firstname} ${soldier.lastname}`,
  position: soldier.position,
  age: soldier.age,
  status: soldier.availability_status,
  team: soldier.squad_name,
  nationality: soldier.country,
  height: soldier.height,
  weight: soldier.weight,
  performance: soldier.performance_score,
  value: soldier.market_value
}))

export const trainingSimple = training.map(session => ({
  id: session.id,
  date: session.date,
  type: session.session_type,
  duration: `${session.duration} min`,
  intensity: session.intensity,
  status: session.status,
  attendance: session.attendance,
  total: session.max_attendance
}))

export const assessmentsSimple = assessments.map(assessment => ({
  id: assessment.id,
  soldier: assessment.soldier_name,
  type: assessment.assessment_type,
  date: assessment.assessment_date,
  score: assessment.overall_score,
  status: assessment.status
}))