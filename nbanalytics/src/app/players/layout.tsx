export default function PlayersLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <nav>
          <a href="/">Home</a> | <a href="/players">Players</a>
        </nav>
        <main>{children}</main>
      </div>
    );
  }
