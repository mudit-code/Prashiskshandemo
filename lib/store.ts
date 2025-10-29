// Simple in-memory store for demo purposes (non-persistent).
export type Role = "student" | "mentor" | "employer" | "administrator"

type User = {
  email: string
  passwordHash: string
  role: Role
  profile: Record<string, unknown>
}

export type Internship = {
  id: string
  title: string
  organization: string
  location?: string
  mode?: "onsite" | "remote" | "hybrid"
  stipend?: string
  description?: string
  createdByEmail: string
  createdAt: number
}

export type Application = {
  id: string
  internshipId: string
  studentEmail: string
  status: "applied" | "accepted" | "rejected"
  createdAt: number
}

export type LogbookEntry = {
  id: string
  studentEmail: string
  date: string // YYYY-MM-DD
  hours: number
  description: string
  approved?: boolean
  createdAt: number
}

type DB = {
  users: Map<string, User> // key = role::email
  internships: Map<string, Internship>
  applications: Map<string, Application>
  logbook: Map<string, LogbookEntry>
}

const g = globalThis as unknown as { __PRASHIKSHAN_DB__?: DB }

if (!g.__PRASHIKSHAN_DB__) {
  g.__PRASHIKSHAN_DB__ = {
    users: new Map(),
    internships: new Map(),
    applications: new Map(),
    logbook: new Map(),
  }
}

const db = g.__PRASHIKSHAN_DB__!

function key(role: Role, email: string) {
  return `${role}::${email.toLowerCase()}`
}

function uuid() {
  return (globalThis.crypto?.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2)
}

export const store = {
  getUser(role: Role, email: string) {
    return db.users.get(key(role, email)) || null
  },
  createUser(user: User) {
    const k = key(user.role, user.email)
    if (db.users.has(k)) throw new Error("User already exists")
    db.users.set(k, user)
    return user
  },

  listInternships() {
    return Array.from(db.internships.values()).sort((a, b) => b.createdAt - a.createdAt)
  },
  listInternshipsByEmployer(email: string) {
    return this.listInternships().filter((i) => i.createdByEmail === email.toLowerCase())
  },
  createInternship(i: Omit<Internship, "id" | "createdAt">) {
    const internship: Internship = { ...i, id: uuid(), createdAt: Date.now() }
    db.internships.set(internship.id, internship)
    return internship
  },
  getInternship(id: string) {
    return db.internships.get(id) || null
  },

  applyToInternship(internshipId: string, studentEmail: string) {
    const key = `${internshipId}::${studentEmail.toLowerCase()}`
    for (const a of db.applications.values()) {
      if (a.internshipId === internshipId && a.studentEmail.toLowerCase() === studentEmail.toLowerCase()) {
        throw new Error("Already applied")
      }
    }
    const app: Application = {
      id: uuid(),
      internshipId,
      studentEmail: studentEmail.toLowerCase(),
      status: "applied",
      createdAt: Date.now(),
    }
    db.applications.set(key, app)
    return app
  },
  listApplicationsForEmployer(employerEmail: string) {
    const postings = this.listInternshipsByEmployer(employerEmail)
    const ids = new Set(postings.map((p) => p.id))
    return Array.from(db.applications.values()).filter((a) => ids.has(a.internshipId))
  },

  addLogEntry(entry: Omit<LogbookEntry, "id" | "createdAt" | "approved">) {
    const e: LogbookEntry = { ...entry, id: uuid(), createdAt: Date.now(), approved: false }
    db.logbook.set(e.id, e)
    return e
  },
  approveLogEntry(id: string) {
    const e = db.logbook.get(id)
    if (!e) throw new Error("Entry not found")
    e.approved = true
    db.logbook.set(id, e)
    return e
  },
  listLogEntriesByStudent(studentEmail: string) {
    return Array.from(db.logbook.values())
      .filter((e) => e.studentEmail.toLowerCase() === studentEmail.toLowerCase())
      .sort((a, b) => b.createdAt - a.createdAt)
  },
  listAllLogEntries() {
    return Array.from(db.logbook.values()).sort((a, b) => b.createdAt - a.createdAt)
  },
  sumHoursByStudent(studentEmail: string) {
    return this.listLogEntriesByStudent(studentEmail).reduce((sum, e) => sum + (Number(e.hours) || 0), 0)
  },
}
