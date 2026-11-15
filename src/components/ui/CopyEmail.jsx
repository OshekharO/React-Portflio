import { useCallback, useEffect, useRef, useState } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'

async function writeToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  // Fallback for non-secure contexts and older browsers.
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.top = '-1000px'
  document.body.appendChild(field)
  field.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(field)
  if (!ok) throw new Error('copy command rejected')
}

/**
 * Email address + copy-to-clipboard. The address itself is a real mailto link;
 * the button is the convenience affordance next to it.
 */
export default function CopyEmail({ email, className = '' }) {
  const [state, setState] = useState('idle')
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = useCallback(async () => {
    try {
      await writeToClipboard(email)
      setState('copied')
    } catch {
      setState('error')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2400)
  }, [email])

  const label = state === 'copied' ? 'Copied' : state === 'error' ? 'Press ⌘C' : 'Copy'

  return (
    <div className={`copy ${className}`.trim()}>
      <a className="copy__address" href={`mailto:${email}`}>
        {email}
      </a>
      <button
        type="button"
        className={`copy__button${state === 'copied' ? ' is-copied' : ''}`}
        onClick={onCopy}
      >
        {state === 'copied' ? (
          <LuCheck className="copy__icon" aria-hidden="true" />
        ) : (
          <LuCopy className="copy__icon" aria-hidden="true" />
        )}
        <span>{label}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied'
          ? `${email} copied to clipboard`
          : state === 'error'
            ? 'Copy failed. Select the address and copy it manually.'
            : ''}
      </span>
    </div>
  )
}