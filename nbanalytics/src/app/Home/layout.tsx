export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <nav>
          <a href="/">Home</a> | <a href="/Home">Home</a>
        </nav>
        <main>{children}</main>
      </div>
    );
  }