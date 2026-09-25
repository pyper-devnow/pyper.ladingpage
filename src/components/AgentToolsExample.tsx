import { useState } from "react";
import { Bot, CheckCircle2 } from "lucide-react";
import { agentToolsExample } from "../lib/site";

export function AgentToolsExample() {
  const [enabled, setEnabled] = useState<boolean[]>(agentToolsExample.tools.map(() => true));
  const [tested, setTested] = useState<number | null>(null);
  return <div className="agent-tools-example">
    <header className="example-toolbar"><div><strong>{agentToolsExample.title}</strong><p>{agentToolsExample.disclaimer}</p></div><span>{enabled.filter(Boolean).length} / {enabled.length} {agentToolsExample.enabledLabel}</span></header>
    <p className="tools-instruction">{agentToolsExample.instruction}</p>
    {agentToolsExample.tools.map((tool, index) => <div className="example-tool" key={tool.name}>
      <Bot size={20} aria-hidden="true" /><div><strong>{tool.name}</strong><p>{tool.description}</p></div>
      <button type="button" role="switch" aria-checked={enabled[index]} aria-label={tool.name} className="example-switch" onClick={() => { setEnabled(current => current.map((value, i) => i === index ? !value : value)); setTested(null); }}><span /></button>
      <button type="button" onClick={() => setTested(index)}>{agentToolsExample.testLabel}</button>
    </div>)}
    {tested !== null && <div className="tool-test-result" role="status"><CheckCircle2 size={18} aria-hidden="true" /><div><strong>{agentToolsExample.tools[tested].example}</strong><p>{enabled[tested] ? agentToolsExample.tools[tested].result : agentToolsExample.disabledResult}</p><small>{agentToolsExample.localNotice}</small></div></div>}
  </div>;
}
