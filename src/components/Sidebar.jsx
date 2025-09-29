import { Link } from "react-router";
import { useTranslation } from "react-i18next";

function Sidebar({ genres, activeGenre, counts }) {
  const { t } = useTranslation();
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Library</div>
      <div>{t("bonjour")}</div>
      <nav className="sidebar-nav">
        <Link
          to="/"
          className={
            activeGenre === null ? "sidebar-link-active" : "sidebar-link"
          }
        >
          All Books
        </Link>
        <Link
          to="/"
          className={
            activeGenre === null ? "sidebar-link-active" : "sidebar-link"
          }
        >
          chart demo (vide)
        </Link>

        <div className="sidebar-section">
          <div className="sidebar-heading">Genres</div>
          {genres.map((genre) => (
            <Link
              key={genre.name}
              to={`/genre/${encodeURIComponent(genre.name)}`}
              className={
                activeGenre === genre.name
                  ? "sidebar-link-active"
                  : "sidebar-link"
              }
            >
              {genre.name}
              {counts && (
                <span className="ml-2 text-xs text-gray-900">
                  ({genre.count})
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-6 px-6">
        <div className="text-xs text-gray-900">
          Powered by
          <br />
          <a
            href="https://cloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 hover:underline"
          >
            Cloudflare
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
