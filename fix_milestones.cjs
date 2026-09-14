const fs = require("fs");
const raw = JSON.parse(fs.readFileSync("data/case-studies.json", "utf8"));
raw.case_studies.forEach((study) => {
  if (study.execution_milestones) {
    study.execution_milestones.forEach((m) => {
      m.milestone_title = m.milestone_title
        .replace(/Crossing \$[0-9]+K\/Mo/, "Significant Scaling")
        .replace(/Scale to \$[0-9]+K\/Mo/, "Reaching Scale");
    });
  }
});
fs.writeFileSync("data/case-studies.json", JSON.stringify(raw, null, 2));
