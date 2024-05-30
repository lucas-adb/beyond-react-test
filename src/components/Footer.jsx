export function Footer() {
  const year = new Date().getFullYear;

  return (
    <footer className="w-full">
      <div className="m-auto flex w-full max-w-screen-xl items-center justify-between p-8">
        <p>© {year} Lucas Alves. All rights reserved.</p>
      </div>
    </footer>
  );
}
