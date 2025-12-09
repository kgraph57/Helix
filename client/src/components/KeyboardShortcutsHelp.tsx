import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleShow = () => setOpen(true);
    const handleClose = () => setOpen(false);

    window.addEventListener('show-shortcuts-help', handleShow);
    window.addEventListener('close-modal', handleClose);

    return () => {
      window.removeEventListener('show-shortcuts-help', handleShow);
      window.removeEventListener('close-modal', handleClose);
    };
  }, []);

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const shortcuts = [
    { keys: `${modKey} + K`, description: '検索にフォーカス' },
    { keys: `${modKey} + H`, description: 'ホームに戻る' },
    { keys: `${modKey} + B`, description: 'お気に入りページへ' },
    { keys: `${modKey} + G`, description: 'ガイドページへ' },
    { keys: `${modKey} + /`, description: 'このヘルプを表示' },
    { keys: 'ESC', description: 'モーダルを閉じる' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            キーボードショートカット
          </DialogTitle>
          <DialogDescription>
            効率的にナビゲートするためのショートカット一覧
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-background border border-border rounded">
                {shortcut.keys}
              </kbd>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          💡 Tip: これらのショートカットはどのページからでも使用できます
        </p>
      </DialogContent>
    </Dialog>
  );
}
