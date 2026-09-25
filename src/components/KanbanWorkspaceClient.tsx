import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { pipelineExample } from "../lib/site";

export function KanbanWorkspaceClient({ compact = false }: { compact?: boolean }) {
  const [stages, setStages] = useState<string[]>(pipelineExample.deals.map(deal => deal.stage));
  const [selected, setSelected] = useState(0);
  const [feedback, setFeedback] = useState("");
  const deal = pipelineExample.deals[selected];
  const reset = () => {
    setStages(pipelineExample.deals.map(item => item.stage));
    setSelected(0);
    setFeedback(pipelineExample.resetFeedback);
  };

  return (
    <div className={`real-pipeline ${compact ? "compact" : ""}`}>
      <header className="example-toolbar">
        <div><strong>{pipelineExample.title}</strong><p>{pipelineExample.disclaimer}</p></div>
        {!compact && <button type="button" onClick={reset}><RotateCcw size={14} aria-hidden="true" />{pipelineExample.reset}</button>}
      </header>
      <div className="real-board" role="region" aria-label={pipelineExample.title} tabIndex={0}>
        {pipelineExample.stages.map(stage => {
          const items = pipelineExample.deals.map((item, index) => ({ ...item, index })).filter(item => stages[item.index] === stage);
          return <section className="real-column" key={stage}>
            <header><strong>{stage}</strong><span>{items.length}</span></header>
            {items.map(item => <button type="button" className="real-deal" key={item.id} onClick={() => setSelected(item.index)} aria-pressed={selected === item.index}>
              <span className="real-contact">{item.contact} · {item.company}</span>
              <strong>{item.title}</strong><b>{item.value}</b>
              <span className="real-next">{item.nextAction}</span>
            </button>)}
            {items.length === 0 && <p className="example-empty">{pipelineExample.empty}</p>}
          </section>;
        })}
      </div>
      {!compact && <section className="real-deal-details" aria-label={pipelineExample.detailsTitle}>
        <div><span className="example-caption">{pipelineExample.detailsTitle}</span><h4>{deal.title}</h4><p>{deal.contact} · {deal.company}</p></div>
        <dl><div><dt>{pipelineExample.valueLabel}</dt><dd>{deal.value}</dd></div><div><dt>{pipelineExample.nextLabel}</dt><dd>{deal.nextAction}</dd></div></dl>
        <label>{pipelineExample.moveLabel}<select aria-label={pipelineExample.moveLabel} value={stages[selected]} onChange={event => {
          const target = event.target.value;
          setStages(current => current.map((stage, index) => index === selected ? target : stage));
          setFeedback(`${deal.title}: ${target}. ${pipelineExample.localNotice}`);
        }}>{pipelineExample.stages.map(stage => <option key={stage}>{stage}</option>)}</select></label>
      </section>}
      <p className="example-feedback" role="status">{feedback || (compact ? pipelineExample.compactHint : pipelineExample.hint)}<ArrowRight size={14} aria-hidden="true" /></p>
    </div>
  );
}
