export function Card({ children }: React.PropsWithChildren) {
  return (
    <div className="max-w-md mx-auto md:max-w-6xl rounded-lg bg-gray-800 border-gray-700 shadow-md overflow-hidden p-4">
      {children}
    </div>
  );
}
