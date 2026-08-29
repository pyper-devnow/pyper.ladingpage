"use client";

import { useState } from "react";
import {
  AlarmClock,
  FileText,
  GripVertical,
  Plus,
  X,
  Share2,
  ExternalLink,
  MoreVertical,
  UserPlus,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Bot
} from "lucide-react";

interface PipelineStage {
  readonly title: string;
  readonly count: string | number;
}

interface KanbanCard {
  readonly stage: string;
  readonly id: string;
  readonly name: string;
  readonly tag: string;
  readonly meta: string;
  readonly tone: string;
  readonly featured: boolean;
}

const getPhoneForCard = (id: string) => {
  const numPart = id.replace(/\D/g, "");
  const val = numPart ? parseInt(numPart, 10) : 46;
  const ddd = [11, 21, 31, 41, 51, 81, 85, 19, 27][val % 9];
  const p1 = 98000 + (val * 17) % 2000;
  const p2 = 1000 + (val * 31) % 9000;
  return `+55 ${ddd} ${p1}-${p2}`;
};

export function KanbanWorkspaceClient({
  pipelineStages,
  kanbanCards,
}: {
  readonly pipelineStages: readonly PipelineStage[];
  readonly kanbanCards: readonly KanbanCard[];
}) {
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);

  // Add more mock cards to make it fuller
  const extendedCards = [
    ...kanbanCards,
    {
      stage: "Proposta",
      id: "UPSC-91",
      name: "Tech Solutions",
      tag: "Proposta Enviada",
      meta: "12d",
      tone: "blue",
      featured: false,
    },
    {
      stage: "Qualificação",
      id: "UPSC-112",
      name: "Agência Digital",
      tag: "Em análise",
      meta: "2h",
      tone: "gray",
      featured: false,
    },
    {
      stage: "Fechamento",
      id: "UPSC-33",
      name: "SoftCorp",
      tag: "Assinatura Pendente",
      meta: "1d",
      tone: "purple",
      featured: true,
    }
  ];

  return (
    <>
      <div className="kanban-board" aria-label="Prévia de funil de vendas">
        {pipelineStages.map((stage) => (
          <section className="kanban-column" key={stage.title}>
            <header>
              <div>
                <GripVertical size={16} aria-hidden="true" />
                <strong>{stage.title}</strong>
                <span>{stage.count}</span>
              </div>
              <Plus size={16} aria-hidden="true" />
            </header>

            <div className="kanban-card-list">
              {extendedCards
                .filter((card) => card.stage === stage.title)
                .map((card) => (
                  <article
                    className={`deal-card ${card.featured ? "featured" : ""}`}
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "0 8px 18px rgba(26,28,29,0.05)";
                    }}
                  >
                    <div className="deal-meta">
                      <small>
                        <FileText size={12} aria-hidden="true" />
                        {card.id}
                      </small>
                      <span>{card.meta}</span>
                    </div>
                    <strong>{card.name}</strong>
                    <span className={`tag ${card.tone}`}>{card.tag}</span>
                    <div className="deal-timers">
                      <span>
                        <AlarmClock size={12} aria-hidden="true" />
                        {card.meta}
                      </span>
                    </div>
                    
                    {/* Visual indicator for clickability */}
                    <div className="click-indicator" style={{
                      marginTop: '12px',
                      padding: '4px',
                      background: 'var(--surface-low)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: 'var(--primary)',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>
                      Clique para ver detalhes
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>

      {selectedCard && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <header style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 24px',
              background: 'white',
              borderBottom: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={16} color="var(--muted-strong)" />
                <h3 style={{ fontSize: '14px', margin: 0, color: 'var(--muted-strong)' }}>FORM [{selectedCard.id}]</h3>
                <span style={{ color: 'var(--muted)' }}>✎</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                  <Share2 size={14} /> Compartilhar
                </button>
                <ExternalLink size={16} color="var(--muted-strong)" />
                <MoreVertical size={16} color="var(--muted-strong)" />
                <button onClick={() => setSelectedCard(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                  <X size={20} color="var(--muted-strong)" />
                </button>
              </div>
            </header>

            <div className="modal-body">
              {/* Left Column (Main Form) */}
              <div className="modal-main">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '24px', padding: '6px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'white', background: '#3b82f6', borderRadius: '50%', width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>P</span>
                    Pedro Roger <span>⌄</span>
                  </div>
                  <button style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '24px', padding: '6px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    <UserPlus size={14} /> Atribuir a mim
                  </button>
                </div>

                {/* Tabs */}
                <div className="modal-tabs">
                  <span className="active">
                    <FileText size={14} /> Dados do Form...
                  </span>
                  <span><MessageCircle size={14} /> Atendimento</span>
                  <span>Pedidos</span>
                  <span>Propostas & Co...</span>
                  <span>Comentários</span>
                  <span>Anexos(0)</span>
                  <span>Mais ⌄</span>
                </div>

                {/* AI Notification Box */}
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1e3a8a', fontSize: '13px', fontWeight: 'bold' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bot size={16} /> Baseado nos dados do formulário, a IA Pyper encontrou este cliente cadastrado:</span>
                    <X size={14} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderRadius: '6px', padding: '12px', border: '1px solid #bfdbfe' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Cliente</div>
                      <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{selectedCard.name.split(' | ')[0]}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Telefone</div>
                      <div style={{ fontSize: '13px' }}>{getPhoneForCard(selectedCard.id)}</div>
                    </div>
                    <button style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '24px', padding: '6px 16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={14} /> Vincular
                    </button>
                  </div>
                </div>

                {/* Form Fields Box */}
                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--border)', padding: '24px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <h4 style={{ textAlign: 'center', margin: 0, fontSize: '15px' }}>Formulário de Demonstração</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--muted-strong)' }}>Nome Completo <span style={{ color: 'red' }}>*</span></label>
                    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'var(--muted-strong)', fontSize: '14px' }}>
                      {selectedCard.name.split(' | ')[0]}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--muted-strong)' }}>Contato Whatsapp <span style={{ color: 'red' }}>*</span></label>
                    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'black', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🇧🇷 {getPhoneForCard(selectedCard.id)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--muted-strong)' }}>Empresa <span style={{ color: 'red' }}>*</span></label>
                    <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', color: 'var(--muted-strong)', fontSize: '14px' }}>
                      {selectedCard.name.split(' | ')[1] || 'Empresa LTDA'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar widgets) */}
              <div className="modal-sidebar">
                {/* Status Box */}
                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--border)', padding: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>Status</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f8faf9', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '16px', fontSize: '11px', fontWeight: '800', color: 'var(--muted-strong)' }}>
                    PROSPECT INBOUND
                  </div>
                  
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '16px', marginBottom: '8px' }}>Prioridade</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#3b82f6', fontSize: '12px', fontWeight: 'bold' }}>
                    <AlertTriangle size={14} /> BAIXO
                  </div>
                </div>

                {/* Date Box */}
                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--border)', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
                    <Clock size={14} /> Entrega
                  </div>
                  <div style={{ border: '1px dashed var(--border)', borderRadius: '6px', padding: '8px', textAlign: 'center', fontSize: '12px', color: 'var(--muted)', cursor: 'pointer' }}>
                    <Clock size={12} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }}/>
                    Selecionar data
                  </div>
                </div>

                {/* Time Tracking */}
                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--border)', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold' }}>
                      <AlarmClock size={14} color="#3b82f6" /> Tempo
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Manual</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, background: '#f9fafa', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px', textAlign: 'center', fontSize: '14px', fontFamily: 'monospace' }}>
                      00:00:00
                    </div>
                    <button style={{ background: 'white', border: '2px solid #22c55e', borderRadius: '6px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Play size={16} color="#22c55e" fill="#22c55e" />
                    </button>
                  </div>
                </div>
                
                {/* Tags and Participants */}
                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--border)', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
                    <FileText size={14} /> Tags
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ background: '#fef08a', color: '#854d0e', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Agendar De... ×</span>
                    <span style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>SITE PRINC... ×</span>
                  </div>
                  <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                    Adicionar tag +
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold', marginTop: '16px', marginBottom: '12px' }}>
                    <UserPlus size={14} /> Participantes
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', marginBottom: '12px' }}>
                    <span style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>P</span>
                    Pedro Roger <span style={{ color: 'var(--muted)', marginLeft: 'auto' }}>×</span>
                  </div>
                  <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                    Adicionar usuário ⌄
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                  <button style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Salvar
                  </button>
                  <button onClick={() => setSelectedCard(null)} style={{ flex: 1, background: 'white', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
