import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Trash2, FileText } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const { data: brandPositionings, isLoading } = trpc.brandPositioning.list.useQuery();
  const { data: subscription } = trpc.subscription.get.useQuery();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const creditsRemaining = subscription?.creditsRemaining ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold gradient-text">Branding Suite</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{creditsRemaining}</span> クレジット利用可能
            </div>
            <Link href="/pricing">
              <Button variant="outline">プランを見る</Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm">{user?.name}</span>
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                {user?.name?.charAt(0) ?? 'U'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">ブランドポジショニング</h2>
          <p className="text-muted-foreground mb-6">
            すべてのブランドポジショニングの一覧です。新しいブランドポジショニングを作成するには{creditsRemaining}クレジット利用可能です。
          </p>
          <div className="flex gap-4">
            <Link href="/create">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                新しいブランドポジショニングを作成
              </Button>
            </Link>
            <Link href="/create">
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="h-5 w-5" />
                ブランドポジショニングを取得
              </Button>
            </Link>
          </div>
        </div>

        {/* Brand Positionings Table */}
        <Card>
          <CardHeader>
            <CardTitle>ブランドポジショニング一覧</CardTitle>
            <CardDescription>
              {brandPositionings?.length ?? 0}件のブランドポジショニングを表示しています
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!brandPositionings || brandPositionings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">まだブランドポジショニングがありません</p>
                <Link href="/create">
                  <Button>最初のブランドポジショニングを作成</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">名前</th>
                      <th className="text-left py-3 px-4 font-medium">説明</th>
                      <th className="text-left py-3 px-4 font-medium">ステータス</th>
                      <th className="text-left py-3 px-4 font-medium">作成日</th>
                      <th className="text-right py-3 px-4 font-medium">アクション</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandPositionings.map((bp) => (
                      <tr key={bp.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{bp.name}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {bp.brandName ? `${bp.brandName.substring(0, 100)}...` : ''}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={bp.status === 'completed' ? 'default' : 'secondary'}>
                            {bp.status === 'completed' ? '完了' : `${bp.currentStep}/8 ステップ`}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(bp.createdAt!).toLocaleDateString('ja-JP')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end gap-2">
                            {bp.status === 'completed' ? (
                              <Link href={`/report/${bp.id}`}>
                                <Button size="sm" variant="outline" className="gap-1">
                                  <Eye className="h-4 w-4" />
                                  表示
                                </Button>
                              </Link>
                            ) : (
                              <Link href={`/create/${bp.id}`}>
                                <Button size="sm" variant="outline">
                                  続ける
                                </Button>
                              </Link>
                            )}
                            <Button size="sm" variant="ghost" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

