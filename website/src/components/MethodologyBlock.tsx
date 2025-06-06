import React from 'react'
import styled from '@emotion/styled'

const Block = styled.section`
  background: var(--ifm-color-emphasis-0);
  border-radius: 14px;
  padding: 2rem 2.2rem 1.5rem 2.2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
`

const Emoji = styled.span`
  font-size: 2.2rem;
  margin-top: 0.1em;
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  flex: 1;
`

interface MethodologyBlockProps {
  emoji: string
  children: React.ReactNode
}

export const MethodologyBlock: React.FC<MethodologyBlockProps> = ({ emoji, children }) => (
  <Block>
    <Emoji>{emoji}</Emoji>
    <Content>{children}</Content>
  </Block>
)
