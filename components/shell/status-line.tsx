import type { ThemeMode } from "@/components/shell/types";

export function StatusLine({ theme, currentPath }: { theme: ThemeMode; currentPath: string }) {
  const fileName = currentPath === "/" ? "index.tsx" : `${currentPath.slice(1)}.tsx`;
  return (
    <div className="status-line">
      <span className="status-segment status-mode">NORMAL</span>
      <span className="status-segment status-branch">⌁ main</span>
      <span className="status-segment status-warning">△ 2</span>
      <span className="status-segment status-file">◉ {fileName}</span>
      <span className="status-spacer" />
      <span className="status-segment status-theme">{theme === "moon" ? "moon" : "day"}</span>
      <span className="status-segment">utf-8</span>
      <span className="status-segment">tsx</span>
      <span className="status-segment status-position">Ln 1, Col 1</span>
    </div>
  );
}
