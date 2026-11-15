/**
 * Project figures. Everything here is drawn with CSS or inline SVG: the
 * portfolio has no screenshots of these projects, and inventing them would be
 * dishonest. Each figure is a diagram of what the project actually does.
 *
 * The whole block is decorative and hidden from assistive technology; the card
 * text carries the meaning.
 */

function DirectoryArt() {
  const cells = Array.from({ length: 24 }, (_, i) => i)
  return (
    <div className="art art--directory">
      <div className="art__chrome">
        <span className="art__dot" />
        <span className="art__dot" />
        <span className="art__dot" />
        <span className="art__chrome-label">providers.json</span>
      </div>

      <div className="art__search">
        <span className="art__search-key">/</span>
        <span className="art__search-line" />
      </div>

      <ul className="art__cells">
        {cells.map((i) => (
          <li key={i} className={i % 9 === 4 ? 'is-marked' : undefined} />
        ))}
      </ul>
    </div>
  )
}

function ChatArt() {
  return (
    <div className="art art--chat">
      <div className="art__msg art__msg--in">
        <span />
        <span />
        <span className="is-short" />
      </div>
      <div className="art__msg art__msg--out">
        <span />
        <span className="is-short" />
      </div>
      <div className="art__msg art__msg--in">
        <span />
        <span />
        <span className="is-short" />
      </div>
      <div className="art__composer">
        <span className="art__composer-line" />
        <span className="art__caret" />
      </div>
    </div>
  )
}

function WorkflowArt() {
  return (
    <svg className="art art--workflow" viewBox="0 0 320 200" role="presentation">
      <g className="art__wire">
        <path d="M44 22 V178" />
        <path d="M44 62 H132 V40 H196" />
        <path d="M44 138 H132 V160 H196" />
        <path d="M44 100 H246" />
      </g>

      <g className="art__node">
        <rect x="36" y="14" width="16" height="16" rx="2" />
        <rect x="36" y="92" width="16" height="16" rx="2" />
        <rect x="36" y="170" width="16" height="16" rx="2" />
      </g>

      <g className="art__node is-active">
        <rect x="188" y="32" width="16" height="16" rx="2" />
      </g>
      <g className="art__node">
        <rect x="188" y="152" width="16" height="16" rx="2" />
      </g>
      <g className="art__node is-active">
        <rect x="238" y="92" width="16" height="16" rx="2" />
      </g>

      <g className="art__label">
        <text x="62" y="26">dispatch</text>
        <text x="62" y="104">poll run</text>
        <text x="62" y="182">workflow</text>
        <text x="212" y="44">setup</text>
        <text x="212" y="164">secret</text>
        <text x="212" y="88">status</text>
      </g>
    </svg>
  )
}

function TerminalArt() {
  return (
    <div className="art art--terminal">
      <div className="art__chrome">
        <span className="art__dot" />
        <span className="art__dot" />
        <span className="art__dot" />
        <span className="art__chrome-label">SysAdmin_Toolkit.ps1</span>
      </div>
      <div className="art__term">
        <p>
          <span className="art__prompt">PS&gt;</span> .\Run-SysAdmin.bat
        </p>
        <p className="is-dim">→ collecting system info</p>
        <p className="is-dim">→ disk health ......... ok</p>
        <p className="is-dim">→ network diagnostics .. ok</p>
        <p>
          <span className="art__prompt">PS&gt;</span> <span className="art__caret" />
        </p>
      </div>
    </div>
  )
}

const figures = {
  directory: DirectoryArt,
  chat: ChatArt,
  workflow: WorkflowArt,
  terminal: TerminalArt,
}

export default function ProjectArt({ variant }) {
  const Figure = figures[variant] ?? DirectoryArt
  return (
    <div className="art-wrap" aria-hidden="true">
      <Figure />
    </div>
  )
}