import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const BRAND_ARCHETYPES = [
  { value: "innocent", label: "The Innocent", description: "純粋で楽観的、誠実さを重視" },
  { value: "sage", label: "The Sage", description: "知恵と知識を追求、真実を重視" },
  { value: "explorer", label: "The Explorer", description: "冒険と発見を愛する、自由を重視" },
  { value: "outlaw", label: "The Outlaw", description: "革命的で破壊的、変革を重視" },
  { value: "magician", label: "The Magician", description: "変容と実現、夢を現実に" },
  { value: "hero", label: "The Hero", description: "勇気と決意、困難を克服" },
  { value: "lover", label: "The Lover", description: "情熱と親密さ、美を重視" },
  { value: "jester", label: "The Jester", description: "楽しさとユーモア、喜びを提供" },
  { value: "everyman", label: "The Everyman", description: "親しみやすさと誠実さ、帰属意識" },
  { value: "caregiver", label: "The Caregiver", description: "思いやりと保護、他者への奉仕" },
  { value: "ruler", label: "The Ruler", description: "統制と秩序、リーダーシップ" },
  { value: "creator", label: "The Creator", description: "創造性と革新、価値の創出" },
];

const BRANDING_TYPES = [
  { value: "new_company", label: "New Company", description: "新規企業のブランディング" },
  { value: "existing_company", label: "Existing Company", description: "既存企業のリブランディング" },
  { value: "personal_brand", label: "Personal Brand", description: "個人ブランドの構築" },
  { value: "other", label: "Other (Custom)", description: "その他のブランディング" },
];

export default function CreateBrandPositioning() {
  const { user } = useAuth();
  const params = useParams();
  const brandPositioningId = params.id;
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    brandingType: "",
    inspiration: "",
    icp: "",
    competitors: "",
    brandValues: "",
    selectedArchetype: "",
  });

  // Load existing brand positioning if ID is provided
  const { data: existingData, isLoading: isLoadingData } = trpc.brandPositioning.get.useQuery(
    { id: brandPositioningId || "" },
    { enabled: !!brandPositioningId }
  );

  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name || "",
        brandName: existingData.brandName || "",
        brandingType: existingData.brandingType || "",
        inspiration: existingData.inspirationData || "",
        icp: existingData.icpData || "",
        competitors: existingData.competitorsData || "",
        brandValues: existingData.brandValuesData || "",
        selectedArchetype: existingData.selectedArchetype || "",
      });
      
      // Use currentStep from database
      if (existingData.currentStep) {
        setCurrentStep(existingData.currentStep);
      }
    }
  }, [existingData]);

  const createMutation = trpc.brandPositioning.create.useMutation({
    onSuccess: async (data) => {
      // Update to step 2 and save initial data
      await updateMutation.mutateAsync({
        id: data.id,
        data: {
          currentStep: 2,
          brandName: formData.brandName,
          brandingType: formData.brandingType,
        },
      });
      toast.success("ブランドポジショニングを作成しました");
      setLocation(`/create/${data.id}`);
    },
    onError: (error) => {
      toast.error("作成に失敗しました: " + error.message);
    },
  });

  const updateMutation = trpc.brandPositioning.update.useMutation({
    onSuccess: () => {
      toast.success("保存しました");
    },
    onError: (error) => {
      toast.error("保存に失敗しました: " + error.message);
    },
  });

  const generateMutation = trpc.brandPositioning.generate.useMutation({
    onSuccess: () => {
      toast.success("生成を開始しました。完了まで数分かかります...");
      // Start polling for completion
      startPolling();
    },
    onError: (error) => {
      toast.error("生成に失敗しました: " + error.message);
      setCurrentStep(6);
    },
  });

  // Poll for generation completion
  const utils = trpc.useUtils();
  const startPolling = () => {
    const pollInterval = setInterval(async () => {
      if (!brandPositioningId) return;
      
      // Refetch brand positioning data
      const bp = await utils.brandPositioning.get.fetch({ id: brandPositioningId });
      if (bp?.status === "completed") {
        clearInterval(pollInterval);
        toast.success("ブランド戦略の生成が完了しました！");
        setCurrentStep(8);
      } else if (bp?.status === "draft") {
        clearInterval(pollInterval);
        toast.error("生成に失敗しました。もう一度お試しください。");
        setCurrentStep(6);
      }
    }, 3000); // Poll every 3 seconds
  };

  const handleNext = async () => {
    if (!brandPositioningId) {
      toast.error("ブランドポジショニングが作成されていません");
      return;
    }

    const nextStep = currentStep === 6 ? 7 : currentStep + 1;
    
    // Save current step data before moving to next step
    await updateMutation.mutateAsync({
      id: brandPositioningId,
      data: {
        currentStep: nextStep,
        brandName: formData.brandName,
        brandingType: formData.brandingType,
        inspirationData: formData.inspiration,
        icpData: formData.icp,
        competitorsData: formData.competitors,
        brandValuesData: formData.brandValues,
        selectedArchetype: formData.selectedArchetype,
      },
    });

    if (currentStep === 6) {
      // Start AI generation
      setCurrentStep(7);
      generateMutation.mutate({ id: brandPositioningId });
    } else if (currentStep < 8) {
      setCurrentStep(nextStep);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitStep1 = () => {
    if (!formData.name || !formData.brandName || !formData.brandingType) {
      toast.error("すべての項目を入力してください");
      return;
    }
    createMutation.mutate({
      name: formData.name,
      language: "ja",
    });
  };

  const progress = (currentStep / 8) * 100;

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              ダッシュボードに戻る
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">ブランドポジショニング作成</h1>
          <div className="w-32"></div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">ステップ {currentStep} / 8</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% 完了</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container pb-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "基本情報の入力"}
              {currentStep === 2 && "インスピレーション"}
              {currentStep === 3 && "理想的な顧客プロファイル (ICP)"}
              {currentStep === 4 && "競合分析"}
              {currentStep === 5 && "ブランド価値"}
              {currentStep === 6 && "ブランドアーキタイプ"}
              {currentStep === 7 && "AI生成中"}
              {currentStep === 8 && "完了"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "ブランドの基本情報を入力してください"}
              {currentStep === 2 && "ブランドのインスピレーション源を記述してください"}
              {currentStep === 3 && "ターゲット顧客の詳細を記述してください"}
              {currentStep === 4 && "主要な競合企業を記述してください"}
              {currentStep === 5 && "ブランドの核となる価値観を記述してください"}
              {currentStep === 6 && "ブランドアーキタイプを選択してください"}
              {currentStep === 7 && "AIがブランド戦略を生成しています"}
              {currentStep === 8 && "ブランドポジショニングが完成しました"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">プロジェクト名</Label>
                  <Input
                    id="name"
                    placeholder="例: 新製品ブランディング"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandName">ブランド名</Label>
                  <Input
                    id="brandName"
                    placeholder="例: TechCorp"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>ブランディングタイプ</Label>
                  <RadioGroup
                    value={formData.brandingType}
                    onValueChange={(value) => setFormData({ ...formData, brandingType: value })}
                  >
                    {BRANDING_TYPES.map((type) => (
                      <div key={type.value} className="flex items-start space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                        <Label htmlFor={type.value} className="flex-1 cursor-pointer">
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 2: Inspiration */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inspiration">インスピレーション</Label>
                  <Textarea
                    id="inspiration"
                    placeholder="ブランドのインスピレーション源、影響を受けたブランドや概念を記述してください..."
                    rows={8}
                    value={formData.inspiration}
                    onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 3: ICP */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="icp">理想的な顧客プロファイル</Label>
                  <Textarea
                    id="icp"
                    placeholder="ターゲット顧客の詳細（年齢、性別、職業、興味関心、課題、購買行動など）を記述してください..."
                    rows={8}
                    value={formData.icp}
                    onChange={(e) => setFormData({ ...formData, icp: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Competitors */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="competitors">競合企業</Label>
                  <Textarea
                    id="competitors"
                    placeholder="主要な競合企業名とその特徴を記述してください（1行に1社）..."
                    rows={8}
                    value={formData.competitors}
                    onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 5: Brand Values */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="brandValues">ブランド価値</Label>
                  <Textarea
                    id="brandValues"
                    placeholder="ブランドの核となる価値観、大切にしていること、約束することなどを記述してください..."
                    rows={8}
                    value={formData.brandValues}
                    onChange={(e) => setFormData({ ...formData, brandValues: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 6: Archetype */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <RadioGroup
                  value={formData.selectedArchetype}
                  onValueChange={(value) => setFormData({ ...formData, selectedArchetype: value })}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {BRAND_ARCHETYPES.map((archetype) => (
                      <div key={archetype.value} className="flex items-start space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value={archetype.value} id={archetype.value} className="mt-1" />
                        <Label htmlFor={archetype.value} className="flex-1 cursor-pointer">
                          <div className="font-medium">{archetype.label}</div>
                          <div className="text-sm text-muted-foreground">{archetype.description}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 7: Generating */}
            {currentStep === 7 && (
              <div className="text-center py-12">
                <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">AIがブランド戦略を生成しています...</p>
                <p className="text-sm text-muted-foreground">
                  これには数分かかる場合があります。しばらくお待ちください。
                </p>
              </div>
            )}

            {/* Step 8: Complete */}
            {currentStep === 8 && (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg font-medium mb-2">ブランドポジショニングが完成しました!</p>
                <p className="text-sm text-muted-foreground mb-6">
                  レポートを確認して、ブランド戦略を活用しましょう。
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href={`/report/${brandPositioningId}`}>レポートを表示</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/dashboard">ダッシュボードに戻る</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 7 && (
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  前へ
                </Button>
                <Button
                  onClick={currentStep === 1 ? handleSubmitStep1 : handleNext}
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      処理中...
                    </>
                  ) : (
                    <>
                      {currentStep === 6 ? "生成開始" : "次へ"}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

