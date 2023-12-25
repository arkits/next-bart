export function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: any;
}) {
  return (
    <button
      type="button"
      className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark: focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
