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
  if (!commit.type || (!commit.scope && !commit.subject)) return

  const authorName =
    (commit.author && commit.author.name) ||
    (commit.committer && commit.committer.name) ||
    'unknown'

  // Optional: linkify GitHub usernames if you want
  const authorDisplay = authorName.startsWith('@') ? authorName : `@${authorName}`

  commit.shortHash = commit.hash?.slice(0, 7)
  commit.subject = `${commit.subject} (by ${authorDisplay})`

  return commit
}
