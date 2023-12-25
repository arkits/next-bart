export function Card({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-full mx-auto rounded-lg bg-gray-800 border-gray-700 shadow-md overflow-hidden p-4">
      {children}
    </div>
  );
}
