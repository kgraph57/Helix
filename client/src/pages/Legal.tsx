import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Legal() {
  return (
    <Layout>
      <div className="space-y-8 pb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">法的表記</h1>
          <p className="text-muted-foreground">
            利用規約、プライバシーポリシー、および免責事項
          </p>
        </div>

        <div className="grid gap-8">
          {/* 免責事項 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                ⚠️ 免責事項 (Disclaimer)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p className="font-semibold">
                本サービス「Medical Prompt Hub」は、医療従事者の業務効率化を支援するためのAIプロンプト集を提供するものであり、医療アドバイスを提供するものではありません。
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  本サービスで生成されたコンテンツや情報は、参考情報としてのみ利用してください。
                </li>
                <li>
                  実際の診療、診断、治療方針の決定においては、必ず医師や専門家の判断を優先し、各医療機関のガイドラインに従ってください。
                </li>
                <li>
                  本サービスの利用により生じたいかなる損害（医療過誤、情報の誤りによる不利益など）についても、運営者は一切の責任を負いません。
                </li>
                <li>
                  AI（ChatGPT等）の出力結果は、必ずしも正確であるとは限りません。ユーザーは出力内容の事実確認（ファクトチェック）を行う責任があります。
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 利用規約 */}
          <Card>
            <CardHeader>
              <CardTitle>利用規約 (Terms of Service)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <section>
                <h3 className="font-semibold mb-2">1. サービスの利用について</h3>
                <p>
                  本サービスは、医療従事者および医療関係者を主な対象としていますが、利用資格を限定するものではありません。ユーザーは、自己の責任において本サービスを利用するものとします。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">2. 禁止事項</h3>
                <p>以下の行為を禁止します：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>本サービスの運営を妨害する行為</li>
                  <li>他のユーザーや第三者に不利益を与える行為</li>
                  <li>個人情報（患者情報など）を匿名化せずにAIに入力する行為</li>
                </ul>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">3. サービスの変更・停止</h3>
                <p>
                  運営者は、ユーザーへの事前の通知なく、本サービスの内容を変更、または提供を停止することができるものとします。
                </p>
              </section>
            </CardContent>
          </Card>

          {/* プライバシーポリシー */}
          <Card>
            <CardHeader>
              <CardTitle>プライバシーポリシー (Privacy Policy)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <section>
                <h3 className="font-semibold mb-2">1. 個人情報の収集</h3>
                <p>
                  本サービスでは、Google Analytics等のアクセス解析ツールを使用し、トラフィックデータを収集するためにCookieを使用する場合があります。このデータは匿名で収集されており、個人を特定するものではありません。
                </p>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">2. データの利用目的</h3>
                <p>収集した情報は、以下の目的で利用します：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>サービスの改善および新機能の開発</li>
                  <li>利用状況の分析</li>
                  <li>不正利用の防止</li>
                </ul>
              </section>
              <Separator />
              <section>
                <h3 className="font-semibold mb-2">3. 患者情報の取り扱いについて</h3>
                <p className="text-destructive font-medium">
                  重要：本サービス内で提供されるプロンプトを使用する際、ChatGPT等の外部AIサービスに患者の個人情報（氏名、ID、生年月日など）を絶対に入力しないでください。
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
