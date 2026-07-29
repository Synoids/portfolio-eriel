import { Project } from "@/data/projects";

// Extracts text from all LocalizedString values and specific arrays within a project
export function calculateReadingTime(project: Project, lang: "en" | "id" = "en"): number {
  const wordsPerMinute = 200;
  let allText = "";

  const addText = (text?: string) => {
    if (text) allText += " " + text;
  };

  const processLocalizedString = (val?: { en: string; id: string }) => {
    if (val) addText(val[lang]);
  };

  processLocalizedString(project.description);
  processLocalizedString(project.summary);
  processLocalizedString(project.whyThisMatters);
  processLocalizedString(project.problem);
  processLocalizedString(project.motivation);
  processLocalizedString(project.challenges);
  processLocalizedString(project.solutions);
  processLocalizedString(project.implementation);
  processLocalizedString(project.businessImpact);
  processLocalizedString(project.technicalAchievement);
  processLocalizedString(project.outcome);
  processLocalizedString(project.lessonsLearned);
  processLocalizedString(project.whatIdDoDifferently);
  processLocalizedString(project.developerNotes);
  processLocalizedString(project.tradeOffs);

  // Arrays
  if (project.existingWorkflow) {
    project.existingWorkflow.forEach(flow => {
      processLocalizedString(flow.step);
      processLocalizedString(flow.description);
    });
  }

  if (project.constraints) {
    project.constraints[lang].forEach(addText);
  }

  if (project.goals) {
    project.goals[lang].forEach(addText);
  }
  
  if (project.stakeholders) {
    project.stakeholders[lang].forEach(addText);
  }

  if (project.successCriteria) {
    project.successCriteria[lang].forEach(addText);
  }

  if (project.engineeringDecisions) {
    project.engineeringDecisions.forEach(decision => {
      addText(decision.decision);
      addText(decision.alternatives);
      processLocalizedString(decision.reason);
    });
  }

  const wordCount = allText.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTimeMinutes);
}
