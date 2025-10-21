import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { useParams } from "wouter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ShareModal } from "@/components/ShareModal";
import { useState } from "react";

// Helper function to render JSON content in a readable format
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
            {data.brandMission && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ミッション</h3>
                <p className="text-muted-foreground">{data.brandMission}</p>
              </div>
            )}
            {data.brandVision && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ビジョン</h3>
                <p className="text-muted-foreground">{data.brandVision}</p>
              </div>
            )}
            {data.usp && (
              <div>
                <h3 className="font-semibold text-lg mb-2">USP（独自の販売提案）</h3>
                <p className="text-muted-foreground">{data.usp}</p>
              </div>
            )}
            {data.brandGoals && Array.isArray(data.brandGoals) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランドゴール</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.brandGoals.map((goal: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{goal}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.brandValues && Array.isArray(data.brandValues) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ブランド価値</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.brandValues.map((value: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{value}</li>
                  ))}
                </ul>
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
            {data.keyTraits && Array.isArray(data.keyTraits) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">主要特性</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.keyTraits.map((trait: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{trait}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.typicalGoal && (
              <div>
                <h3 className="font-semibold text-lg mb-2">典型的な目標</h3>
                <p className="text-muted-foreground">{data.typicalGoal}</p>
              </div>
            )}
            {data.coreStrategies && Array.isArray(data.coreStrategies) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">コア戦略</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.coreStrategies.map((strategy: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{strategy}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.marketingNiche && (
              <div>
                <h3 className="font-semibold text-lg mb-2">マーケティングニッチ</h3>
                <p className="text-muted-foreground">{data.marketingNiche}</p>
              </div>
            )}
            {data.potentialDrawback && (
              <div>
                <h3 className="font-semibold text-lg mb-2">潜在的な欠点</h3>
                <p className="text-muted-foreground">{data.potentialDrawback}</p>
              </div>
            )}
          </div>
        );

      case "visualIdentity":
        return (
          <div className="space-y-6">
            {data.typography && (
              <div>
                <h3 className="font-semibold text-lg mb-3">タイポグラフィ</h3>
                {data.typography.primaryFont && (
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">プライマリフォント</h4>
                    <p className="text-sm"><strong>フォント名:</strong> {data.typography.primaryFont.name}</p>
                    <p className="text-sm"><strong>サイズ:</strong> {data.typography.primaryFont.size}</p>
                    <p className="text-sm"><strong>ウェイト:</strong> {data.typography.primaryFont.weight}</p>
                    <p className="text-sm text-muted-foreground mt-2">{data.typography.primaryFont.rationale}</p>
                  </div>
                )}
                {data.typography.secondaryFont && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">セカンダリフォント</h4>
                    <p className="text-sm"><strong>フォント名:</strong> {data.typography.secondaryFont.name}</p>
                    <p className="text-sm"><strong>サイズ:</strong> {data.typography.secondaryFont.size}</p>
                    <p className="text-sm"><strong>ウェイト:</strong> {data.typography.secondaryFont.weight}</p>
                    <p className="text-sm text-muted-foreground mt-2">{data.typography.secondaryFont.rationale}</p>
                  </div>
                )}
              </div>
            )}
            {data.colorPalette && (
              <div>
                <h3 className="font-semibold text-lg mb-3">カラーパレット</h3>
                {data.colorPalette.primary && (
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-12 h-12 rounded border" 
                        style={{ backgroundColor: data.colorPalette.primary.color }}
                      ></div>
                      <div>
                        <h4 className="font-medium">{data.colorPalette.primary.name}</h4>
                        <p className="text-sm text-muted-foreground">{data.colorPalette.primary.color}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-2"><strong>心理学:</strong> {data.colorPalette.primary.psychology}</p>
                    <p className="text-sm"><strong>業界関連性:</strong> {data.colorPalette.primary.industryRelevance}</p>
                  </div>
                )}
                {data.colorPalette.secondary && Array.isArray(data.colorPalette.secondary) && (
                  <div className="space-y-3">
                    <h4 className="font-medium">セカンダリカラー</h4>
                    {data.colorPalette.secondary.map((color: any, i: number) => (
                      <div key={i} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-10 h-10 rounded border" 
                            style={{ backgroundColor: color.color }}
                          ></div>
                          <div>
                            <h5 className="font-medium text-sm">{color.name}</h5>
                            <p className="text-xs text-muted-foreground">{color.color}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{color.usage}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case "swotAnalysis":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.strengths && Array.isArray(data.strengths) && (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-green-700 dark:text-green-300">強み (Strengths)</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.strengths.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-green-900 dark:text-green-100">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.weaknesses && Array.isArray(data.weaknesses) && (
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-red-700 dark:text-red-300">弱み (Weaknesses)</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.weaknesses.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-red-900 dark:text-red-100">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.opportunities && Array.isArray(data.opportunities) && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-300">機会 (Opportunities)</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.opportunities.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-blue-900 dark:text-blue-100">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.threats && Array.isArray(data.threats) && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 text-yellow-700 dark:text-yellow-300">脅威 (Threats)</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.threats.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-yellow-900 dark:text-yellow-100">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case "competitorAnalysis":
        return (
          <div className="space-y-4">
            {data.competitors && Array.isArray(data.competitors) && data.competitors.map((competitor: any, i: number) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{competitor.name}</h3>
                {competitor.strengths && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">強み:</h4>
                    <p className="text-sm text-muted-foreground">{competitor.strengths}</p>
                  </div>
                )}
                {competitor.weaknesses && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">弱み:</h4>
                    <p className="text-sm text-muted-foreground">{competitor.weaknesses}</p>
                  </div>
                )}
                {competitor.differentiationPoints && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">差別化ポイント:</h4>
                    <p className="text-sm text-muted-foreground">{competitor.differentiationPoints}</p>
                  </div>
                )}
                {competitor.marketPosition && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">市場ポジション:</h4>
                    <p className="text-sm text-muted-foreground">{competitor.marketPosition}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "idealCustomerProfiles":
        return (
          <div className="space-y-4">
            {data.profiles && Array.isArray(data.profiles) && data.profiles.map((profile: any, i: number) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{profile.name}</h3>
                {profile.demographics && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-1">デモグラフィック:</h4>
                    <p className="text-sm text-muted-foreground">{profile.demographics}</p>
                  </div>
                )}
                {profile.psychographics && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-1">サイコグラフィック:</h4>
                    <p className="text-sm text-muted-foreground">{profile.psychographics}</p>
                  </div>
                )}
                {profile.painPoints && Array.isArray(profile.painPoints) && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-1">ペインポイント:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {profile.painPoints.map((point: string, j: number) => (
                        <li key={j} className="text-sm text-muted-foreground">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {profile.goals && Array.isArray(profile.goals) && (
                  <div className="mb-3">
                    <h4 className="font-medium text-sm mb-1">ゴール:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {profile.goals.map((goal: string, j: number) => (
                        <li key={j} className="text-sm text-muted-foreground">{goal}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {profile.howWeHelp && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">私たちがどのように支援するか:</h4>
                    <p className="text-sm text-muted-foreground">{profile.howWeHelp}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "marketingCopy":
        return (
          <div className="space-y-4">
            {data.tagline && (
              <div>
                <h3 className="font-semibold text-lg mb-2">タグライン</h3>
                <p className="text-xl font-medium text-primary">{data.tagline}</p>
              </div>
            )}
            {data.elevator_pitch && (
              <div>
                <h3 className="font-semibold text-lg mb-2">エレベーターピッチ</h3>
                <p className="text-muted-foreground">{data.elevator_pitch}</p>
              </div>
            )}
            {data.value_propositions && Array.isArray(data.value_propositions) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">価値提案</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.value_propositions.map((vp: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{vp}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.cta_examples && Array.isArray(data.cta_examples) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">CTA例</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.cta_examples.map((cta: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{cta}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case "contentStrategy":
        return (
          <div className="space-y-4">
            {/* Handle content_pillars structure */}
            {data.content_pillars && Array.isArray(data.content_pillars) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">コンテンツピラー</h3>
                <div className="space-y-3">
                  {data.content_pillars.map((pillar: any, i: number) => (
                    <div key={i} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">{typeof pillar === 'string' ? pillar : pillar.pillar || pillar.name || 'コンテンツピラー'}</h4>
                      {pillar.description && <p className="text-sm text-muted-foreground mb-2">{pillar.description}</p>}
                      {pillar.topics && (
                        <div className="mb-2">
                          <span className="text-sm font-medium">トピック: </span>
                          {Array.isArray(pillar.topics) ? (
                            <ul className="list-disc list-inside mt-1">
                              {pillar.topics.map((topic: string, j: number) => (
                                <li key={j} className="text-sm text-muted-foreground">{topic}</li>
                              ))}
                            </ul>
                          ) : typeof pillar.topics === 'string' ? (
                            <span className="text-sm text-muted-foreground">{pillar.topics}</span>
                          ) : null}
                        </div>
                      )}
                      {pillar.content_types && Array.isArray(pillar.content_types) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {pillar.content_types.map((type: string, j: number) => (
                            <span key={j} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                              {type}
                            </span>
                          ))}
                        </div>
                      )}
                      {pillar.frequency && (
                        <div className="mb-2">
                          <span className="text-sm font-medium">頻度: </span>
                          {typeof pillar.frequency === 'object' && pillar.frequency !== null ? (
                            <span className="text-sm text-muted-foreground">
                              {pillar.frequency.value || pillar.frequency.amount || ''} {pillar.frequency.unit || pillar.frequency.period || ''}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">{String(pillar.frequency)}</span>
                          )}
                        </div>
                      )}
                      {pillar.kpis && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">KPI: </span>
                          {Array.isArray(pillar.kpis) ? (
                            <ul className="list-disc list-inside mt-1">
                              {pillar.kpis.map((kpi: string, j: number) => (
                                <li key={j} className="text-sm text-muted-foreground">{kpi}</li>
                              ))}
                            </ul>
                          ) : typeof pillar.kpis === 'string' ? (
                            <span className="text-sm text-muted-foreground">{pillar.kpis}</span>
                          ) : null}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Handle channels structure (actual data format from AI) */}
            {data.channels && Array.isArray(data.channels) && data.channels.length > 0 && typeof data.channels[0] === 'object' && (
              <div>
                <h3 className="font-semibold text-lg mb-2">コンテンツチャネル</h3>
                <div className="space-y-3">
                  {data.channels.map((channel: any, i: number) => (
                    <div key={i} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">{channel.name || `チャネル ${i + 1}`}</h4>
                      {channel.topics && Array.isArray(channel.topics) && (
                        <div className="mb-2">
                          <span className="text-sm font-medium">トピック:</span>
                          <ul className="list-disc list-inside mt-1">
                            {channel.topics.map((topic: string, j: number) => (
                              <li key={j} className="text-sm text-muted-foreground">{topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {channel.frequency && (
                        <div className="mb-2">
                          <span className="text-sm font-medium">頻度: </span>
                          <span className="text-sm text-muted-foreground">{String(channel.frequency)}</span>
                        </div>
                      )}
                      {channel.kpis && Array.isArray(channel.kpis) && (
                        <div className="mt-2">
                          <span className="text-sm font-medium">KPI:</span>
                          <ul className="list-disc list-inside mt-1">
                            {channel.kpis.map((kpi: string, j: number) => (
                              <li key={j} className="text-sm text-muted-foreground">{kpi}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Simple channels list (if channels is array of strings) */}
            {data.channels && Array.isArray(data.channels) && data.channels.length > 0 && typeof data.channels[0] === 'string' && (
              <div>
                <h3 className="font-semibold text-lg mb-2">チャネル</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.channels.map((channel: string, i: number) => (
                    <li key={i} className="text-muted-foreground">{channel}</li>
                  ))}
                </ul>
              </div>
            )}
            {data.posting_frequency && (
              <div>
                <h3 className="font-semibold text-lg mb-2">投稿頻度</h3>
                <p className="text-muted-foreground">{data.posting_frequency}</p>
              </div>
            )}
          </div>
        );

      case "marketingCampaignIdeas":
        return (
          <div className="space-y-4">
            {data.campaigns && Array.isArray(data.campaigns) && data.campaigns.map((campaign: any, i: number) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
                {campaign.objective && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">目的:</h4>
                    <p className="text-sm text-muted-foreground">{campaign.objective}</p>
                  </div>
                )}
                {campaign.target_audience && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">ターゲットオーディエンス:</h4>
                    <p className="text-sm text-muted-foreground">{campaign.target_audience}</p>
                  </div>
                )}
                {campaign.channels && Array.isArray(campaign.channels) && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">チャネル:</h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.channels.map((channel: string, j: number) => (
                        <span key={j} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {campaign.key_messages && Array.isArray(campaign.key_messages) && (
                  <div className="mb-2">
                    <h4 className="font-medium text-sm mb-1">キーメッセージ:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {campaign.key_messages.map((message: string, j: number) => (
                        <li key={j} className="text-sm text-muted-foreground">{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {campaign.timeline && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">タイムライン:</h4>
                    <p className="text-sm text-muted-foreground">{campaign.timeline}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        // Fallback for unknown section types
        return (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
        );
    }
  } catch (error) {
    // If JSON parsing fails, display as plain text
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
      </div>
    );
  }
}

export default function ReportView() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { data: report, isLoading } = trpc.report.getByBrandPositioning.useQuery(
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
          <Button onClick={() => setLocation("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            ダッシュボードに戻る
          </Button>
        </div>
      </div>
    );
  }

  const handleExportPDF = () => {
    setIsExporting(true);
    // Use browser's native print dialog for PDF export
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 100);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const sections = [
    { title: "ブランドアイデンティティ", content: report.brandIdentity, type: "brandIdentity" },
    { title: "ブランドアーキタイプ", content: report.brandArchetype, type: "brandArchetype" },
    { title: "ビジュアルアイデンティティ", content: report.visualIdentity, type: "visualIdentity" },
    { title: "SWOT分析", content: report.swotAnalysis, type: "swotAnalysis" },
    { title: "競合分析", content: report.competitorAnalysis, type: "competitorAnalysis" },
    { title: "理想的な顧客プロファイル", content: report.idealCustomerProfiles, type: "idealCustomerProfiles" },
    { title: "マーケティングコピー", content: report.marketingCopy, type: "marketingCopy" },
    { title: "コンテンツ戦略", content: report.contentStrategy, type: "contentStrategy" },
    { title: "マーケティングキャンペーンアイデア", content: report.marketingCampaignIdeas, type: "marketingCampaignIdeas" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ダッシュボードに戻る
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">ブランド戦略レポート</h1>
              <p className="text-muted-foreground">
                作成日: {new Date(report.createdAt!).toLocaleDateString("ja-JP")}
              </p>
            </div>
            
            <div className="flex gap-2">
              <LanguageSwitcher />
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                共有
              </Button>
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
      
      {/* Share Modal */}
      <ShareModal 
        open={shareModalOpen} 
        onOpenChange={setShareModalOpen}
        brandPositioningId={id!}
      />
    </div>
  );
}

