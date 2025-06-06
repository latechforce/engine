import React from 'react'
import styled from '@emotion/styled'

const TestimonialGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`

const TestimonialCard = styled.div`
  background: var(--card-bg, white);
  padding: 2rem;
  border-radius: 12px;
`

const Quote = styled.blockquote`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color, #333);
  margin: 0 0 1.5rem 0;
  font-style: italic;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 2rem;
    color: var(--secondary-text-color, #666);
  }
`

const Author = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const AuthorName = styled.strong`
  font-size: 1rem;
  color: var(--text-color, #222);
`

const AuthorTitle = styled.span`
  font-size: 0.9rem;
  color: var(--secondary-text-color, #666);
`

interface Testimonial {
  quote: string
  author: string
  title: string
}

interface TestimonialGridProps {
  testimonials: Testimonial[]
}

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({ testimonials }) => {
  return (
    <TestimonialGridContainer>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index}>
          <Quote>{testimonial.quote}</Quote>
          <Author>
            <AuthorName>{testimonial.author}</AuthorName>
            <AuthorTitle>{testimonial.title}</AuthorTitle>
          </Author>
        </TestimonialCard>
      ))}
    </TestimonialGridContainer>
  )
}
