// No auth needed for shared reports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Download } from "lucide-react";
import { useParams } from "wouter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";

// Import the same renderContent function from ReportView
function renderContent(content: string | null, sectionType: string) {
  if (!content) return <p className="text-muted-foreground">コンテンツがありません</p>;

  try {
    const data = JSON.parse(content);

    switch (sectionType) {
      case "brandIdentity":
        return (
          <div className="space-y-4">
            {data.brandVoice && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランドボイス</h3>
                <p className="text-muted-foreground">{data.brandVoice}</p>
              </div>
            )}
            {data.brandPromise && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランドプロミス</h3>
                <p className="text-muted-foreground">{data.brandPromise}</p>
              </div>
            )}
            {data.brandPersonality && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランドパーソナリティ</h3>
                <p className="text-muted-foreground">{data.brandPersonality}</p>
              </div>
            )}
            {data.mission && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ミッション</h3>
                <p className="text-muted-foreground">{data.mission}</p>
              </div>
            )}
            {data.vision && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ビジョン</h3>
                <p className="text-muted-foreground">{data.vision}</p>
              </div>
            )}
            {data.usp && (
              <div>
                <h3 className="font-semibold text-lg mb-2">USP（独自の販売提案）</h3>
                <p className="text-muted-foreground">{data.usp}</p>
              </div>
            )}
            {data.brandGoals && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランドゴール</h3>
                {Array.isArray(data.brandGoals) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.brandGoals.map((goal: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{goal}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.brandGoals}</p>
                )}
              </div>
            )}
            {data.brandValues && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランド価値</h3>
                {Array.isArray(data.brandValues) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.brandValues.map((value: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{value}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.brandValues}</p>
                )}
              </div>
            )}
          </div>
        );

      case "brandArchetype":
        return (
          <div className="space-y-4">
            {data.overview && (
              <div>
                <h3 className="font-semibold text-lg mb-2">概要</h3>
                <p className="text-muted-foreground">{data.overview}</p>
              </div>
            )}
            {data.application && (
              <div>
                <h3 className="font-semibold text-lg mb-2">適用方法</h3>
                <p className="text-muted-foreground">{data.application}</p>
              </div>
            )}
            {data.definition && (
              <div>
                <h3 className="font-semibold text-lg mb-2">定義</h3>
                <p className="text-muted-foreground">{data.definition}</p>
              </div>
            )}
            {data.traits && (
              <div>
                <h3 className="font-semibold text-lg mb-2">主要特性</h3>
                {Array.isArray(data.traits) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.traits.map((trait: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{trait}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.traits}</p>
                )}
              </div>
            )}
            {data.goals && (
              <div>
                <h3 className="font-semibold text-lg mb-2">典型的な目標</h3>
                <p className="text-muted-foreground">{data.goals}</p>
              </div>
            )}
            {data.strategy && (
              <div>
                <h3 className="font-semibold text-lg mb-2">コア戦略</h3>
                {Array.isArray(data.strategy) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.strategy.map((item: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.strategy}</p>
                )}
              </div>
            )}
            {data.niche && (
              <div>
                <h3 className="font-semibold text-lg mb-2">マーケティングニッチ</h3>
                <p className="text-muted-foreground">{data.niche}</p>
              </div>
            )}
            {data.pitfalls && (
              <div>
                <h3 className="font-semibold text-lg mb-2">潜在的な欠点</h3>
                <p className="text-muted-foreground">{data.pitfalls}</p>
              </div>
            )}
          </div>
        );

      case "visualIdentity":
        return (
          <div className="space-y-6">
            {data.typography && (
              <div>
                <h3 className="font-semibold text-xl mb-3">タイポグラフィ</h3>
                {data.typography.primary && (
                  <div className="mb-4">
                    <h4 className="font-medium text-lg mb-2">プライマリフォント</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">フォント名:</span> {data.typography.primary.name}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">サイズ:</span> {data.typography.primary.size}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">ウェイト:</span> {data.typography.primary.weight}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{data.typography.primary.rationale}</p>
                  </div>
                )}
                {data.typography.secondary && (
                  <div>
                    <h4 className="font-medium text-lg mb-2">セカンダリフォント</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">フォント名:</span> {data.typography.secondary.name}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">サイズ:</span> {data.typography.secondary.size}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">ウェイト:</span> {data.typography.secondary.weight}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{data.typography.secondary.rationale}</p>
                  </div>
                )}
              </div>
            )}

            {data.colorPalette && (
              <div>
                <h3 className="font-semibold text-xl mb-3">カラーパレット</h3>
                {data.colorPalette.primary && (
                  <div className="mb-4">
                    <h4 className="font-medium text-lg mb-2">{data.colorPalette.primary.name}</h4>
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-16 h-16 rounded border"
                        style={{ backgroundColor: data.colorPalette.primary.hex }}
                      ></div>
                      <span className="font-mono text-sm">{data.colorPalette.primary.hex}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <span className="font-semibold">心理学:</span> {data.colorPalette.primary.psychology}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">業界関連性:</span> {data.colorPalette.primary.industryRelevance}
                    </p>
                  </div>
                )}
                {data.colorPalette.secondary && Array.isArray(data.colorPalette.secondary) && (
                  <div>
                    <h4 className="font-medium text-lg mb-2">セカンダリカラー</h4>
                    <div className="space-y-3">
                      {data.colorPalette.secondary.map((color: any, i: number) => (
                        <div key={i}>
                          <h5 className="font-medium mb-1">{color.name}</h5>
                          <div className="flex items-center gap-3 mb-1">
                            <div 
                              className="w-12 h-12 rounded border"
                              style={{ backgroundColor: color.hex }}
                            ></div>
                            <span className="font-mono text-sm">{color.hex}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{color.usage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "swotAnalysis":
        return (
          <div className="space-y-4">
            {data.strengths && (
              <div>
                <h3 className="font-semibold text-lg mb-2">強み (Strengths)</h3>
                {Array.isArray(data.strengths) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.strengths.map((item: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.strengths}</p>
                )}
              </div>
            )}
            {data.weaknesses && (
              <div>
                <h3 className="font-semibold text-lg mb-2">弱み (Weaknesses)</h3>
                {Array.isArray(data.weaknesses) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.weaknesses.map((item: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.weaknesses}</p>
                )}
              </div>
            )}
            {data.opportunities && (
              <div>
                <h3 className="font-semibold text-lg mb-2">機会 (Opportunities)</h3>
                {Array.isArray(data.opportunities) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.opportunities.map((item: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.opportunities}</p>
                )}
              </div>
            )}
            {data.threats && (
              <div>
                <h3 className="font-semibold text-lg mb-2">脅威 (Threats)</h3>
                {Array.isArray(data.threats) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.threats.map((item: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.threats}</p>
                )}
              </div>
            )}
          </div>
        );

      case "competitorAnalysis":
        return (
          <div className="space-y-4">
            {Array.isArray(data) ? (
              data.map((competitor: any, i: number) => (
                <div key={i} className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">{competitor.name}</h3>
                  {competitor.strengths && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">強み:</h4>
                      {Array.isArray(competitor.strengths) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {competitor.strengths.map((item: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{competitor.strengths}</p>
                      )}
                    </div>
                  )}
                  {competitor.weaknesses && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">弱み:</h4>
                      {Array.isArray(competitor.weaknesses) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {competitor.weaknesses.map((item: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{competitor.weaknesses}</p>
                      )}
                    </div>
                  )}
                  {competitor.differentiation && (
                    <div>
                      <h4 className="font-medium mb-1">差別化ポイント:</h4>
                      <p className="text-sm text-muted-foreground">{competitor.differentiation}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">{JSON.stringify(data, null, 2)}</p>
            )}
          </div>
        );

      case "targetAudience":
        return (
          <div className="space-y-4">
            {Array.isArray(data) ? (
              data.map((persona: any, i: number) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{persona.name || `ペルソナ ${i + 1}`}</h3>
                  {persona.demographics && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">デモグラフィック:</h4>
                      <p className="text-sm text-muted-foreground">{persona.demographics}</p>
                    </div>
                  )}
                  {persona.psychographics && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">サイコグラフィック:</h4>
                      <p className="text-sm text-muted-foreground">{persona.psychographics}</p>
                    </div>
                  )}
                  {persona.painPoints && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">ペインポイント:</h4>
                      {Array.isArray(persona.painPoints) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {persona.painPoints.map((point: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{persona.painPoints}</p>
                      )}
                    </div>
                  )}
                  {persona.goals && (
                    <div>
                      <h4 className="font-medium mb-1">ゴール:</h4>
                      {Array.isArray(persona.goals) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {persona.goals.map((goal: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{goal}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{persona.goals}</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">{JSON.stringify(data, null, 2)}</p>
            )}
          </div>
        );

      case "messagingFramework":
        return (
          <div className="space-y-4">
            {data.tagline && (
              <div>
                <h3 className="font-semibold text-lg mb-2">タグライン</h3>
                <p className="text-muted-foreground">{data.tagline}</p>
              </div>
            )}
            {data.elevator_pitch && (
              <div>
                <h3 className="font-semibold text-lg mb-2">エレベーターピッチ</h3>
                <p className="text-muted-foreground">{data.elevator_pitch}</p>
              </div>
            )}
            {data.key_messages && (
              <div>
                <h3 className="font-semibold text-lg mb-2">キーメッセージ</h3>
                {Array.isArray(data.key_messages) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.key_messages.map((msg: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{msg}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.key_messages}</p>
                )}
              </div>
            )}
            {data.proof_points && (
              <div>
                <h3 className="font-semibold text-lg mb-2">証明ポイント</h3>
                {Array.isArray(data.proof_points) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {data.proof_points.map((point: string, i: number) => (
                      <li key={i} className="text-muted-foreground">{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{data.proof_points}</p>
                )}
              </div>
            )}
          </div>
        );

      case "contentStrategy":
        return (
          <div className="space-y-4">
            {data.channels && Array.isArray(data.channels) ? (
              data.channels.map((channel: any, i: number) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{channel.name}</h3>
                  {channel.topics && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">トピック:</h4>
                      {Array.isArray(channel.topics) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {channel.topics.map((topic: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{topic}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{channel.topics}</p>
                      )}
                    </div>
                  )}
                  {channel.frequency && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">頻度:</h4>
                      <p className="text-sm text-muted-foreground">
                        {typeof channel.frequency === 'object' 
                          ? `${channel.frequency.value || channel.frequency.amount || ''} ${channel.frequency.unit || channel.frequency.period || ''}`
                          : channel.frequency}
                      </p>
                    </div>
                  )}
                  {channel.kpis && (
                    <div>
                      <h4 className="font-medium mb-1">KPI:</h4>
                      {Array.isArray(channel.kpis) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {channel.kpis.map((kpi: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{kpi}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{channel.kpis}</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : data.content_pillars && Array.isArray(data.content_pillars) ? (
              data.content_pillars.map((pillar: any, i: number) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{pillar.name}</h3>
                  {pillar.topics && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">トピック:</h4>
                      {Array.isArray(pillar.topics) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {pillar.topics.map((topic: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{topic}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{pillar.topics}</p>
                      )}
                    </div>
                  )}
                  {pillar.frequency && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">頻度:</h4>
                      <p className="text-sm text-muted-foreground">
                        {typeof pillar.frequency === 'object' 
                          ? `${pillar.frequency.value || pillar.frequency.amount || ''} ${pillar.frequency.unit || pillar.frequency.period || ''}`
                          : pillar.frequency}
                      </p>
                    </div>
                  )}
                  {pillar.kpis && (
                    <div>
                      <h4 className="font-medium mb-1">KPI:</h4>
                      {Array.isArray(pillar.kpis) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {pillar.kpis.map((kpi: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{kpi}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{pillar.kpis}</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">{JSON.stringify(data, null, 2)}</p>
            )}
          </div>
        );

      case "campaignIdeas":
        return (
          <div className="space-y-4">
            {Array.isArray(data) ? (
              data.map((campaign: any, i: number) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{campaign.name || campaign.title || `キャンペーン ${i + 1}`}</h3>
                  {campaign.objective && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">目的:</h4>
                      <p className="text-sm text-muted-foreground">{campaign.objective}</p>
                    </div>
                  )}
                  {campaign.description && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">説明:</h4>
                      <p className="text-sm text-muted-foreground">{campaign.description}</p>
                    </div>
                  )}
                  {campaign.channels && (
                    <div className="mb-2">
                      <h4 className="font-medium mb-1">チャネル:</h4>
                      {Array.isArray(campaign.channels) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {campaign.channels.map((channel: string, j: number) => (
                            <li key={j} className="text-sm text-muted-foreground">{channel}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">{campaign.channels}</p>
                      )}
                    </div>
                  )}
                  {campaign.timeline && (
                    <div>
                      <h4 className="font-medium mb-1">タイムライン:</h4>
                      <p className="text-sm text-muted-foreground">{campaign.timeline}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">{JSON.stringify(data, null, 2)}</p>
            )}
          </div>
        );

      default:
        return <pre className="text-xs bg-muted p-4 rounded overflow-auto">{JSON.stringify(data, null, 2)}</pre>;
    }
  } catch (error) {
    return <p className="text-muted-foreground">{content}</p>;
  }
}

export default function SharedReportView() {
  const { id } = useParams();
  const [isExporting, setIsExporting] = useState(false);

  // Use public endpoint for shared reports
  const { data: report, isLoading } = trpc.report.getPublic.useQuery(
    { brandPositioningId: id! },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">レポートを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">レポートが見つかりません</h2>
          <p className="text-muted-foreground mb-4">指定されたレポートは存在しないか、削除されました。</p>
        </div>
      </div>
    );
  }

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 100);
  };

  const sections = [
    { title: "ブランドアイデンティティ", content: report.brandIdentity, type: "brandIdentity" },
    { title: "ブランドアーキタイプ", content: report.brandArchetype, type: "brandArchetype" },
    { title: "ビジュアルアイデンティティ", content: report.visualIdentity, type: "visualIdentity" },
    { title: "SWOT分析", content: report.swotAnalysis, type: "swotAnalysis" },
    { title: "競合分析", content: report.competitorAnalysis, type: "competitorAnalysis" },
    { title: "コンテンツ戦略", content: report.contentStrategy, type: "contentStrategy" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">ブランド戦略レポート</h1>
              <p className="text-muted-foreground">
                作成日: {new Date(report.createdAt!).toLocaleDateString("ja-JP")}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                このレポートは共有されています
              </p>
            </div>
            
            <div className="flex gap-2">
              <LanguageSwitcher />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? 'PDF生成中...' : 'PDF出力'}
              </Button>
            </div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            section.content && (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderContent(section.content, section.type)}
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

