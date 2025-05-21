interface CommitAuthor {
  name?: string
  email?: string
}

interface Commit {
  type?: string
  scope?: string
  subject?: string
  hash?: string
  shortHash?: string
  author?: CommitAuthor
  committer?: CommitAuthor
}

export default function transform(commit: Commit): Commit | undefined {
  console.log('Received commit:', JSON.stringify(commit, null, 2))

  // Only process fix and feat commits
  if (!commit.type || !['fix', 'feat'].includes(commit.type)) return

  const authorName =
    (commit.author && commit.author.name) ||
    (commit.committer && commit.committer.name) ||
    'unknown'

  console.log('Author name:', authorName)

  // Optional: linkify GitHub usernames if you want
  const authorDisplay = authorName.startsWith('@') ? authorName : `@${authorName}`

  commit.shortHash = commit.hash?.slice(0, 7)
  commit.subject = `${commit.subject} (by ${authorDisplay})`

  console.log('Transformed commit:', JSON.stringify(commit, null, 2))
  return commit
}
