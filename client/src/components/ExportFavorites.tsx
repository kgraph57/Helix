import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { fullPrompts } from "@/lib/prompts-full";
import { toast } from "sonner";

interface ExportFavoritesProps {
  favoriteIds: string[];
}

export function ExportFavorites({ favoriteIds }: ExportFavoritesProps) {
  if (favoriteIds.length === 0) {
    return null;
  }

  const exportAsMarkdown = () => {
    const favoritePrompts = fullPrompts.filter(p => favoriteIds.includes(p.id));
    
    let markdown = `# My Medical Prompt Collection\n\n`;
    markdown += `エクスポート日時: ${new Date().toLocaleString('ja-JP')}\n\n`;
    markdown += `---\n\n`;
    
    favoritePrompts.forEach((prompt, index) => {
      markdown += `## ${index + 1}. ${prompt.title}\n\n`;
      markdown += `**カテゴリ:** ${prompt.category}\n\n`;
      markdown += `**説明:** ${prompt.description}\n\n`;
      
      if (prompt.riskLevel) {
        markdown += `**リスクレベル:** ${prompt.riskLevel}\n\n`;
      }
      
      markdown += `### プロンプトテンプレート\n\n`;
      markdown += `\`\`\`\n${prompt.template}\n\`\`\`\n\n`;
      
      if (prompt.inputs && prompt.inputs.length > 0) {
        markdown += `### 入力項目\n\n`;
        prompt.inputs.forEach(input => {
          markdown += `- **${input.label}**: ${input.placeholder}\n`;
        });
        markdown += `\n`;
      }
      
      markdown += `---\n\n`;
    });
    
    // ダウンロード
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-prompts-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("エクスポート完了", {
      description: `${favoritePrompts.length}個のプロンプトをMarkdown形式でダウンロードしました`
    });
  };

  const exportAsText = () => {
    const favoritePrompts = fullPrompts.filter(p => favoriteIds.includes(p.id));
    
    let text = `My Medical Prompt Collection\n`;
    text += `エクスポート日時: ${new Date().toLocaleString('ja-JP')}\n\n`;
    text += `${'='.repeat(60)}\n\n`;
    
    favoritePrompts.forEach((prompt, index) => {
      text += `${index + 1}. ${prompt.title}\n`;
      text += `カテゴリ: ${prompt.category}\n`;
      text += `説明: ${prompt.description}\n\n`;
      
      if (prompt.riskLevel) {
        text += `リスクレベル: ${prompt.riskLevel}\n\n`;
      }
      
      text += `プロンプトテンプレート:\n`;
      text += `${'-'.repeat(60)}\n`;
      text += `${prompt.template}\n`;
      text += `${'-'.repeat(60)}\n\n`;
      
      if (prompt.inputs && prompt.inputs.length > 0) {
        text += `入力項目:\n`;
        prompt.inputs.forEach(input => {
          text += `  - ${input.label}: ${input.placeholder}\n`;
        });
        text += `\n`;
      }
      
      text += `${'='.repeat(60)}\n\n`;
    });
    
    // ダウンロード
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-prompts-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("エクスポート完了", {
      description: `${favoritePrompts.length}個のプロンプトをテキスト形式でダウンロードしました`
    });
  };

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-2">
          <Download className="w-4 h-4" />
          お気に入りプロンプトをエクスポート
        </CardTitle>
        <CardDescription className="text-xs text-blue-700 dark:text-blue-400">
          {favoriteIds.length}個のお気に入りプロンプトを保存できます
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportAsMarkdown}
            className="flex-1 border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            <FileText className="w-4 h-4 mr-2" />
            Markdown形式
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportAsText}
            className="flex-1 border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            <FileText className="w-4 h-4 mr-2" />
            テキスト形式
          </Button>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          💡 エクスポートしたファイルは、個人用のプロンプト集として保存・共有できます
        </p>
      </CardContent>
    </Card>
  );
}
