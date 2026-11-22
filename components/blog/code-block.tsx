type CodeBlockProps = {
  code: string;
  label?: string;
};

export function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <div className="post-code">
      {label ? <div className="post-code-label">{label}</div> : null}
      <pre className="post-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
