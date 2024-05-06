import ProjectNotes from "../../src/models/projectNote.model";
import { projectNotes } from "./data/projectNotes.data";
import { createProject } from "./project.seeders";
import { createUser } from "./user.seeders";

export const createProjectNote = async (n: number) => {
    const note = "note" + n;
    const projectId = await createProject(projectNotes[note].project.acronym, projectNotes[note].project.username)

    const userId = await createUser('john.doe')
    
    const projectNote = await ProjectNotes.create({
        projectId: projectId,
        writerId: userId,
        comment: projectNotes[note].comment,
        advancement: projectNotes[note].advancement,
    })

    return projectNote.noteId
}