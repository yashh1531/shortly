interface ErrorMessageProps {
  id?: string;
  message: string;
}

export function ErrorMessage({ id, message }: ErrorMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      className="animate-rise flex items-center gap-2 px-2 text-sm text-[var(--color-ink)]"
    >
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]" />
      {message}
    </p>
  );
}
