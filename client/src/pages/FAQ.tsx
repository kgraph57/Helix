import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, AlertCircle, BookOpen, Settings, Shield, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { updateSEO, addFAQStructuredData } from "@/lib/seo";

export default function FAQ() {
  useEffect(() => {
    updateSEO({
      title: "よくある質問（FAQ）",
      description: "Medical Prompt Hubのよくある質問とトラブルシューティングガイド。プロンプトの使い方、トラブル解決、プライバシー・セキュリティに関する情報を提供します。",
      path: "/faq",
      keywords: "FAQ,よくある質問,トラブルシューティング,ヘルプ,サポート"
    });

    // FAQ構造化データを追加
    addFAQStructuredData([
      {
        question: "Medical Prompt Hubとは何ですか？",
        answer: "Medical Prompt Hubは、医療従事者がAI（ChatGPT、Claude、Geminiなど）を臨床、研究、教育に効果的に活用するための実践的なプロンプト集です。100以上の専門プロンプト、ワークフローガイド、AI活用Tipsを提供しています。"
      },
      {
        question: "誰が利用できますか？",
        answer: "主に医療従事者（医師、看護師、薬剤師、研究者など）を対象としていますが、医療に関心のある方であればどなたでも利用できます。利用資格を限定するものではありません。"
      },
      {
        question: "無料で利用できますか？",
        answer: "はい、Medical Prompt Hubは無料で利用できます。ただし、プロンプトを使用する際に必要なAIサービス（ChatGPT、Claude等）の利用には、それぞれのサービスの利用規約と料金が適用されます。"
      }
    ]);
  }, []);
  return (
    <Layout>
      <div className="space-y-8 pb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">よくある質問（FAQ）</h1>
          <p className="text-muted-foreground">
            よくある質問とトラブルシューティングガイド
          </p>
        </div>

        <div className="grid gap-8">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                基本情報
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-this">
                  <AccordionTrigger>Medical Prompt Hubとは何ですか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      Medical Prompt Hubは、医療従事者がAI（ChatGPT、Claude、Geminiなど）を臨床、研究、教育に効果的に活用するための実践的なプロンプト集です。100以上の専門プロンプト、ワークフローガイド、AI活用Tipsを提供しています。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-can-use">
                  <AccordionTrigger>誰が利用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      主に医療従事者（医師、看護師、薬剤師、研究者など）を対象としていますが、医療に関心のある方であればどなたでも利用できます。利用資格を限定するものではありません。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="is-free">
                  <AccordionTrigger>無料で利用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      はい、Medical Prompt Hubは無料で利用できます。ただし、プロンプトを使用する際に必要なAIサービス（ChatGPT、Claude等）の利用には、それぞれのサービスの利用規約と料金が適用されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="what-ai-services">
                  <AccordionTrigger>どのAIサービスで使用できますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      プロンプトは、ChatGPT、Claude、Gemini、その他の主要なAIチャットサービスで使用できます。プロンプトをコピーして、お使いのAIサービスに貼り付けるだけで使用できます。
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* 使い方 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                使い方
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-to-use">
                  <AccordionTrigger>プロンプトの使い方を教えてください</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p>基本的な使い方は以下の通りです：</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>目的に応じてプロンプトを検索またはカテゴリから選択</li>
                        <li>プロンプト詳細ページで、必要に応じて入力フィールドに情報を入力</li>
                        <li>生成されたプロンプトをコピー</li>
                        <li>お使いのAIサービス（ChatGPT、Claude等）に貼り付け</li>
                        <li>AIの回答を確認し、必要に応じて修正・調整</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="input-fields">
                  <AccordionTrigger>入力フィールドは必須ですか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      入力フィールドは、プロンプトをより具体的で有用なものにするためのものです。必須ではありませんが、入力することで、より精度の高い結果が得られます。プロンプト内の<code className="px-1 py-0.5 bg-muted rounded text-xs">[ ]</code>や<code className="px-1 py-0.5 bg-muted rounded text-xs">{`{{ }}`}</code>の部分を自分の情報に置き換えることもできます。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="customize-prompt">
                  <AccordionTrigger>プロンプトをカスタマイズできますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      はい、プロンプトは自由に編集・カスタマイズできます。ご自身の専門分野や施設のガイドラインに合わせて調整してください。ただし、医療情報の正確性には十分注意してください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="favorites">
                  <AccordionTrigger>お気に入り機能の使い方は？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      よく使うプロンプトをお気に入りに保存できます。プロンプト詳細ページの「お気に入りに追加」ボタンをクリックすると、お気に入りページから簡単にアクセスできるようになります。ブラウザのローカルストレージに保存されるため、同じブラウザでアクセスすると保存されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* トラブルシューティング */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                トラブルシューティング
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="prompt-not-working">
                  <AccordionTrigger>プロンプトがうまく動作しません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p>以下の点を確認してください：</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>プロンプト全体が正しくコピーされているか確認</li>
                        <li>入力フィールドの<code className="px-1 py-0.5 bg-muted rounded text-xs">{`{{ }}`}</code>や<code className="px-1 py-0.5 bg-muted rounded text-xs">[ ]</code>が適切に置き換えられているか確認</li>
                        <li>AIサービスの利用制限に達していないか確認</li>
                        <li>プロンプトを少し簡略化して再試行</li>
                        <li>別のAIサービスで試してみる</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="page-not-loading">
                  <AccordionTrigger>ページが読み込まれません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p>以下の対処法を試してください：</p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>ページを再読み込み（F5またはCtrl+R / Cmd+R）</li>
                        <li>ブラウザのキャッシュをクリア</li>
                        <li>別のブラウザで試す</li>
                        <li>インターネット接続を確認</li>
                        <li>問題が続く場合は、お問い合わせください</li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="favorites-lost">
                  <AccordionTrigger>お気に入りが消えました</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p>お気に入りはブラウザのローカルストレージに保存されます。以下の場合に消える可能性があります：</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>ブラウザのキャッシュやデータをクリアした場合</li>
                        <li>プライベートブラウジングモードを使用している場合</li>
                        <li>別のブラウザやデバイスでアクセスしている場合</li>
                      </ul>
                      <p className="mt-2">
                        お気に入りはデバイス・ブラウザごとに保存されるため、同じブラウザでアクセスする必要があります。
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="search-not-working">
                  <AccordionTrigger>検索機能がうまく動作しません</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p>検索がうまく動作しない場合：</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>検索キーワードを変更してみる（例：「診断」→「鑑別診断」）</li>
                        <li>カテゴリから絞り込んで検索</li>
                        <li>ページを再読み込みして再試行</li>
                        <li>ブラウザのJavaScriptが有効になっているか確認</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* プライバシー・セキュリティ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                プライバシー・セキュリティ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="patient-info">
                  <AccordionTrigger>患者情報を入力しても大丈夫ですか？</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p className="text-destructive font-semibold">
                        <strong>絶対に患者の個人情報をAIサービスに入力しないでください。</strong>
                      </p>
                      <p>
                        患者の氏名、ID、生年月日、住所などの個人情報は、匿名化または削除してから使用してください。個人情報保護法、HIPAA（米国）、GDPR（EU）などの規制に違反する可能性があります。
                      </p>
                      <p>
                        プロンプトを使用する際は、必ず個人情報を削除または仮名に置き換えるなどの匿名化処理を行ってください。
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-collection">
                  <AccordionTrigger>個人情報は収集されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      本サービスでは、Google Analytics等のアクセス解析ツールを使用してトラフィックデータを収集する場合がありますが、これは匿名で収集され、個人を特定するものではありません。詳細は<a href="/legal" className="text-primary underline">プライバシーポリシー</a>をご確認ください。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-storage">
                  <AccordionTrigger>入力したデータは保存されますか？</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      本サービスでは、プロンプトの入力内容をサーバーに送信することはありません。お気に入り機能で使用するデータは、ブラウザのローカルストレージにのみ保存されます。ただし、プロンプトをAIサービス（ChatGPT等）に送信した場合、そのデータは各AIサービスの利用規約に従って処理されます。
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* その他 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                その他
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="suggest-feature">
                  <AccordionTrigger>機能の提案や改善要望はできますか？</AccordionTrigger>
                  <AccordionContent>
                      <p className="text-sm leading-relaxed">
                      はい、機能の提案や改善要望を歓迎します。<a href="/contact" className="text-primary underline">お問い合わせフォーム</a>からご連絡いただくか、GitHubのIssuesから提案してください。皆様のフィードバックを元に、サービスを継続的に改善していきます。
                      </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="report-bug">
                  <AccordionTrigger>バグを報告したい</AccordionTrigger>
                  <AccordionContent>
                      <p className="text-sm leading-relaxed">
                      バグを発見した場合は、<a href="/contact" className="text-primary underline">お問い合わせフォーム</a>またはGitHubのIssuesから報告してください。再現手順やスクリーンショットがあると、より迅速に対応できます。
                      </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contribute">
                  <AccordionTrigger>プロンプトを追加・改善したい</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed">
                      プロンプトの追加や改善の提案を歓迎します。GitHubのプルリクエストから提案してください。医療従事者の皆様の実践的な知見を共有していただけると、サービス全体の品質向上につながります。
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contact">
                  <AccordionTrigger>お問い合わせ方法</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm leading-relaxed space-y-3">
                      <p>お問い合わせは以下の方法で受け付けています：</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><a href="/contact" className="text-primary underline">お問い合わせフォーム</a></li>
                        <li>GitHubのIssues</li>
                        <li>プライバシーやセキュリティに関する重要な問題の場合は、できるだけ早く対応いたします</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* 重要な注意事項 */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                重要な注意事項
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <div className="space-y-3">
                <p className="font-semibold">
                  本サービスは医療アドバイスを提供するものではありません。
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    本サービスで生成されたコンテンツや情報は、参考情報としてのみ利用してください。
                  </li>
                  <li>
                    実際の診療、診断、治療方針の決定においては、必ず医師や専門家の判断を優先し、各医療機関のガイドラインに従ってください。
                  </li>
                  <li>
                    AI（ChatGPT等）の出力結果は、必ずしも正確であるとは限りません。ユーザーは出力内容の事実確認（ファクトチェック）を行う責任があります。
                  </li>
                  <li>
                    <strong className="text-destructive">患者の個人情報をAIサービスに入力することは絶対に避けてください。</strong>
                  </li>
                </ul>
              </div>
              <Separator />
              <p className="text-muted-foreground">
                詳細は<a href="/legal" className="text-primary underline">利用規約・免責事項</a>をご確認ください。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
