export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-sm">© 2026 MovieExplorer</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
            GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
