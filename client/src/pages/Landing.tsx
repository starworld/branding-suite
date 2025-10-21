import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  FileText,
  Lightbulb,
  Palette,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

export default function Landing() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    } else {
      window.location.href = getLoginUrl();
    }
  };

  const steps = [
    {
      icon: FileText,
      title: t("landing.steps.step1.title"),
      description: t("landing.steps.step1.description"),
    },
    {
      icon: Lightbulb,
      title: t("landing.steps.step2.title"),
      description: t("landing.steps.step2.description"),
    },
    {
      icon: Users,
      title: t("landing.steps.step3.title"),
      description: t("landing.steps.step3.description"),
    },
    {
      icon: BarChart3,
      title: t("landing.steps.step4.title"),
      description: t("landing.steps.step4.description"),
    },
    {
      icon: Target,
      title: t("landing.steps.step5.title"),
      description: t("landing.steps.step5.description"),
    },
    {
      icon: Palette,
      title: t("landing.steps.step6.title"),
      description: t("landing.steps.step6.description"),
    },
    {
      icon: Brain,
      title: t("landing.steps.step7.title"),
      description: t("landing.steps.step7.description"),
    },
    {
      icon: CheckCircle2,
      title: t("landing.steps.step8.title"),
      description: t("landing.steps.step8.description"),
    },
  ];

  const features = [
    {
      category: t("landing.features.brandPositioning.title"),
      items: [
        {
          title: t("landing.features.brandPositioning.items.identity.title"),
          description: t("landing.features.brandPositioning.items.identity.description"),
        },
        {
          title: t("landing.features.brandPositioning.items.archetype.title"),
          description: t("landing.features.brandPositioning.items.archetype.description"),
        },
        {
          title: t("landing.features.brandPositioning.items.visual.title"),
          description: t("landing.features.brandPositioning.items.visual.description"),
        },
      ],
    },
    {
      category: t("landing.features.analysis.title"),
      items: [
        {
          title: t("landing.features.analysis.items.swot.title"),
          description: t("landing.features.analysis.items.swot.description"),
        },
        {
          title: t("landing.features.analysis.items.competitor.title"),
          description: t("landing.features.analysis.items.competitor.description"),
        },
      ],
    },
    {
      category: t("landing.features.marketing.title"),
      items: [
        {
          title: t("landing.features.marketing.items.icp.title"),
          description: t("landing.features.marketing.items.icp.description"),
        },
        {
          title: t("landing.features.marketing.items.copy.title"),
          description: t("landing.features.marketing.items.copy.description"),
        },
        {
          title: t("landing.features.marketing.items.content.title"),
          description: t("landing.features.marketing.items.content.description"),
        },
        {
          title: t("landing.features.marketing.items.campaigns.title"),
          description: t("landing.features.marketing.items.campaigns.description"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {t("landing.hero.badge")}
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t("landing.hero.title")}
          </h1>

          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {t("landing.hero.subtitle")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
              {t("landing.hero.cta.primary")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setLocation("/dashboard")}
            >
              {t("landing.hero.cta.secondary")}
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>{t("landing.hero.features.fast")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>{t("landing.hero.features.ai")}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>{t("landing.hero.features.growth")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.howItWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("landing.howItWorks.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-2 transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {t("landing.howItWorks.step")} {index + 1}
                  </span>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("landing.features.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("landing.features.subtitle")}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index}>
              <h3 className="mb-6 text-2xl font-bold">{feature.category}</h3>
              <div className="space-y-4">
                {feature.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="py-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("landing.cta.title")}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">{t("landing.cta.subtitle")}</p>
            <Button size="lg" onClick={handleGetStarted}>
              {t("landing.cta.button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

