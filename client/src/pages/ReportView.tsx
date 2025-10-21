import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { useParams } from "wouter";

export default function ReportView() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();

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

  const sections = [
    { title: "ブランドアイデンティティ", content: report.brandIdentity },
    { title: "ブランドアーキタイプ", content: report.brandArchetype },
    { title: "ビジュアルアイデンティティ", content: report.visualIdentity },
    { title: "SWOT分析", content: report.swotAnalysis },
    { title: "競合分析", content: report.competitorAnalysis },
    { title: "理想的な顧客プロファイル", content: report.idealCustomerProfiles },
    { title: "マーケティングコピー", content: report.marketingCopy },
    { title: "コンテンツ戦略", content: report.contentStrategy },
    { title: "マーケティングキャンペーンアイデア", content: report.marketingCampaignIdeas },
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
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                共有
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                PDF出力
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
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

