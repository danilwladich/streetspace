export default function NotFound({ text }: { text: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <h3 className="text-center text-xl">{text}</h3>
    </div>
  );
}
