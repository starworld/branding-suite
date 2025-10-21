import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";

/**
 * All content in this page are only for example, delete if unneeded
 * When building pages, remember your instructions in Frontend Workflow, Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">{APP_TITLE}</h1>
          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-sm font-medium hover:text-primary">料金プラン</a>
            <a href="/support" className="text-sm font-medium hover:text-primary">サポート</a>
            <Button asChild>
              <a href={getLoginUrl()}>ログイン</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              AIで<span className="gradient-text">ブランド戦略</span>を
              <br />
              自動生成
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              8つの簡単なステップで、包括的なブランドポジショニングとマーケティング戦略を生成。
              多言語対応で、世界中のビジネスに対応します。
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={getLoginUrl()}>無料で始める</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">詳しく見る</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24 bg-gradient-to-br from-primary/5 to-blue-500/5">
          <div className="mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold text-center mb-12">主な機能</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">ブランドポジショニング</h4>
                <p className="text-sm text-muted-foreground">
                  AIが企業の独自性を分析し、最適なブランドポジショニングを提案
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="font-semibold mb-2">競合分析</h4>
                <p className="text-sm text-muted-foreground">
                  SWOT分析、競合比較、市場トレンドを自動生成
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h4 className="font-semibold mb-2">多言語対応</h4>
                <p className="text-sm text-muted-foreground">
                  日本語、英語を含む7言語に対応。グローバル展開をサポート
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 {APP_TITLE}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
