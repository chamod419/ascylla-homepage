import { useId, useLayoutEffect, useMemo, useRef } from 'react'
import developSvg from '../assets/workflow/develop.svg?raw'
import testSvg from '../assets/workflow/test.svg?raw'
import deploySvg from '../assets/workflow/deploy.svg?raw'
import monitorSvg from '../assets/workflow/monitor.svg?raw'
import './WorkflowVisual.css'

export type WorkflowStage =
  | 'develop'
  | 'test'
  | 'deploy'
  | 'monitor'

const STAGES: WorkflowStage[] = [
  'develop',
  'test',
  'deploy',
  'monitor',
]

const ARTWORK: Record<WorkflowStage, string> = {
  develop: developSvg,
  test: testSvg,
  deploy: deploySvg,
  monitor: monitorSvg,
}

function applyWorkflowTheme(svg: string): string {
  const colors: Record<string, string> = {
    '#fff': 'var(--art-surface)',
    '#ffffff': 'var(--art-surface)',
    '#1c2024': 'var(--art-ink)',
    '#f9f9fb': 'var(--art-subtle)',
    '#f0f0f3': 'var(--art-panel)',
    '#e8e8ec': 'var(--art-fill)',
    '#d9d9e0': 'var(--art-shadow)',
    '#b9bbc6': 'var(--art-edge)',
    '#8b8d98': 'var(--art-muted)',

    '#0d74ce': 'var(--workflow-art-primary)',
    '#0588f0': 'var(--workflow-art-bright)',
    '#8ec8f6': 'var(--workflow-art-soft)',
    '#c2e5ff': 'var(--workflow-art-pale)',
  }

  return svg.replace(
    /\b(fill|stroke|stop-color)=["'](#[0-9a-fA-F]{3,8})["']/g,
    (original: string, attribute: string, value: string) => {
      const color = value.toLowerCase()

      // Preserve white line icons on coloured surfaces.
      if (
        attribute === 'stroke' &&
        (color === '#fff' || color === '#ffffff')
      ) {
        return original
      }

      const replacement = colors[color]

      return replacement
        ? `${attribute}="${replacement}"`
        : original
    },
  )
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function scopeSvgIds(svg: string, prefix: string): string {
  const ids = new Map<string, string>()

  const withScopedIds = svg.replace(
    /\bid=(["'])([^"']+)\1/g,
    (_original: string, quote: string, id: string) => {
      const scopedId = `${prefix}-${id}`
      ids.set(id, scopedId)

      return `id=${quote}${scopedId}${quote}`
    },
  )

  let result = withScopedIds
    .replace(
      /url\(\s*(["']?)#([^"')\s]+)\1\s*\)/g,
      (original: string, _quote: string, id: string) => {
        const scopedId = ids.get(id)

        return scopedId ? `url(#${scopedId})` : original
      },
    )
    .replace(
      /\b(xlink:href|href)=(["'])#([^"']+)\2/g,
      (
        original: string,
        attribute: string,
        quote: string,
        id: string,
      ) => {
        const scopedId = ids.get(id)

        return scopedId
          ? `${attribute}=${quote}#${scopedId}${quote}`
          : original
      },
    )

  // Preserve SMIL references such as begin="animationId.end".
  result = result.replace(
    /\b(begin|end)=(["'])([^"']*)\2/g,
    (
      _original: string,
      attribute: string,
      quote: string,
      timing: string,
    ) => {
      let scopedTiming = timing

      for (const [originalId, scopedId] of ids) {
        const reference = new RegExp(
          `(^|;)(\\s*)${escapeRegExp(originalId)}\\.`,
          'g',
        )

        scopedTiming = scopedTiming.replace(
          reference,
          (
            _match: string,
            separator: string,
            whitespace: string,
          ) => `${separator}${whitespace}${scopedId}.`,
        )
      }

      return `${attribute}=${quote}${scopedTiming}${quote}`
    },
  )

  return result
}

type WorkflowVisualProps = {
  active: WorkflowStage
  running: boolean
}

export default function WorkflowVisual({
  active,
  running,
}: WorkflowVisualProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  const containers = useRef<
    Partial<Record<WorkflowStage, HTMLDivElement>>
  >({})

  const scenes = useMemo(
    () =>
      STAGES.map((stage) => ({
        stage,
        markup: scopeSvgIds(
          applyWorkflowTheme(ARTWORK[stage]),
          `workflow-${instanceId}-${stage}`,
        ),
      })),
    [instanceId],
  )

  useLayoutEffect(() => {
    const illustrations = STAGES.map((stage) =>
      containers.current[stage]?.querySelector<SVGSVGElement>(
        'svg',
      ),
    )

    for (const svg of illustrations) {
      if (!svg) continue

      svg.pauseAnimations()
      svg.setCurrentTime(0)
    }

    return () => {
      for (const svg of illustrations) {
        svg?.pauseAnimations()
      }
    }
  }, [scenes])

  useLayoutEffect(() => {
    for (const stage of STAGES) {
      const svg =
        containers.current[stage]?.querySelector<SVGSVGElement>(
          'svg',
        )

      if (!svg) continue

      if (running && stage === active) {
        svg.unpauseAnimations()
      } else {
        svg.pauseAnimations()
      }
    }
  }, [active, running, scenes])

  return (
    <div
      className="ascylla-workflow-visual workflow-visual workflow-svg"
      data-running={running}
      aria-hidden="true"
    >
      {scenes.map(({ stage, markup }) => (
        <div
          key={stage}
          ref={(node) => {
            if (node) {
              containers.current[stage] = node
            } else {
              delete containers.current[stage]
            }
          }}
          className={`workflow-svg__scene${
            active === stage ? ' is-active' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      ))}
    </div>
  )
}