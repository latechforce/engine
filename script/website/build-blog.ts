import fs from 'fs'
import path from 'path'

const changelogPath = path.join(process.cwd(), 'CHANGELOG.md')
const blogDir = path.join(process.cwd(), 'website/blog')

// Ensure the blog directory exists
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
}

const changelog = fs.readFileSync(changelogPath, 'utf-8')

const releaseBlocks = changelog.split(/^##?\s+/gm).slice(1)

// Group releases by date
const releasesByDate = new Map<
  string,
  Array<{ version: string; content: string; isFix: boolean }>
>()

releaseBlocks.forEach((block) => {
  const [headerLine, ...rest] = block.trim().split('\n')
  const content = rest.join('\n').trim()

  const match = headerLine?.match(/\[(.*?)\]\(.*?\)\s+\((.*?)\)/)
  if (!match) return

  const version = match[1]
  const date = match[2]

  if (!version || !date) return

  // Determine if it's a fix version by checking if the patch version is 0
  const isFix = version.split('.')[2] !== '0'

  if (!releasesByDate.has(date)) {
    releasesByDate.set(date, [])
  }
  const releases = releasesByDate.get(date)
  if (releases) {
    releases.push({ version, content, isFix })
  }
})

// Create blog posts for each date
releasesByDate.forEach((releases, date) => {
  if (!releases || releases.length === 0) return

  // Sort releases by version to maintain order
  releases.sort((a, b) => {
    const aParts = a.version.split('.').map(Number)
    const bParts = b.version.split('.').map(Number)
    for (let i = 0; i < 3; i++) {
      if (aParts[i] !== bParts[i]) return bParts[i]! - aParts[i]!
    }
    return 0
  })

  // Use the first release's type for the tag
  const firstRelease = releases[0]
  if (!firstRelease) return

  const tag = firstRelease.isFix ? 'fix' : 'release'
  const slug = tag + '-' + firstRelease.version.replace(/\./g, '-')
  const title = `${firstRelease.isFix ? 'Fix' : 'Release'} ${firstRelease.version}`

  // Combine all content
  const combinedContent = releases
    .map((r) => {
      const header = `## ${r.version}`
      return `${header}\n\n${r.content}`
    })
    .join('\n\n')

  const blogFilename = `${date}-${slug}.md`
  const blogFilePath = path.join(blogDir, blogFilename)

  const markdown = `---
title: "${title}"
description: "Changelog for version ${firstRelease.version}"
slug: "${slug}"
date: ${date}
tags: [${tag}]
---

<p class="before-truncate">${combinedContent.replace(/#/gm, '').replace(/\n/gm, ' ')}</p>

<!-- truncate -->

${combinedContent}
`

  fs.writeFileSync(blogFilePath, markdown)
})
