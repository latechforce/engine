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

releaseBlocks.forEach((block) => {
  const [headerLine, ...rest] = block.trim().split('\n')
  const content = rest.join('\n').trim()

  const match = headerLine?.match(/\[(.*?)\]\(.*?\)\s+\((.*?)\)/)
  if (!match) return

  const version = match[1]
  const date = match[2]

  // Determine if it's a fix version by checking if the patch version is 0
  const isFix = version ? version.split('.')[2] !== '0' : false
  const tag = isFix ? 'fix' : 'release'

  const slug = tag + '-' + version?.replace(/\./g, '-')
  const title = `${isFix ? 'Fix' : 'Release'} ${version}`

  const blogFilename = `${date}-${slug}.md`
  const blogFilePath = path.join(blogDir, blogFilename)

  const markdown = `---
title: "${title}"
description: "Changelog for version ${version}"
slug: "${slug}"
date: ${date}
tags: [${tag}]
---

${content.split('\n').slice(0, 10).join('\n')}

<!-- truncate -->

${content.split('\n').slice(10).join('\n')}
`

  fs.writeFileSync(blogFilePath, markdown)
})
