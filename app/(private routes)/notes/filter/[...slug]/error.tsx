"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
