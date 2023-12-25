export function LoadingSpinner() {
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    ></div>
  );
}
