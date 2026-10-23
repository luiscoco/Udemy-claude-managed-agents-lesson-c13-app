import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 13,
  title: "Inventory, Branches, Snapshots and Mirrors",
  description: "A long project needs more than a list of chat messages. We need to find sessions, try an alternative direction, recover selected files, and inspect past events.",
  concepts: ["Branch at an explicit event boundary", "Reviewed context is transferred explicitly", "Snapshots compare actual bytes"],
  scope: "Creates a branch and snapshot plan over local seed records. It never overwrites project files or creates provider child sessions. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Branch at a valid boundary", "input": {"boundary": "e2", "currentText": "new draft", "savedText": "reviewed draft"}, "expected": "passed", "checks": {"selectedEvents": 2}}, {"id": "1", "label": "Reject a missing boundary", "input": {"boundary": "missing", "currentText": "new", "savedText": "old"}, "expected": "rejected", "checks": {}}],
  async run(input) {

const history=[{id:"e1",text:"Project Aurora"},{id:"e2",text:"Approved scope"},{id:"e3",text:"Later proposal"}];
const at=history.findIndex(e=>e.id===text(input,"boundary"));
if(at<0)return report("rejected","Boundary not found; no branch planned",{},["Read canonical parent history","Find the explicit boundary"]);
const selected=history.slice(0,at+1), saved=text(input,"savedText"), current=text(input,"currentText");
return report("passed","Prepared reviewed context and a hash-bound restore plan",{selectedEvents:selected.length,branchContext:selected.map(e=>e.text).join("\n"),snapshot:{savedHash:hash(saved),currentHash:hash(current),needsRestore:saved!==current},parentMutated:false},["Stop history at the selected event","Review the transferred summary","Compare bytes before planning restoration","Preserve the parent conversation"]);

  }
};
