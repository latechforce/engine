import React from 'react'
import styled from '@emotion/styled'

const LogoGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;

  img {
    max-width: 100%;
    height: auto;
    max-height: 80px;
    object-fit: contain;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      filter: grayscale(0%);
      opacity: 1;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    img {
      filter: grayscale(100%) brightness(1.2);
      opacity: 0.6;

      &:hover {
        filter: grayscale(0%) brightness(1.2);
        opacity: 0.9;
      }
    }
  }
`

interface Logo {
  src: string
  alt: string
}

interface LogoGridProps {
  logos: Logo[]
}

export const LogoGrid: React.FC<LogoGridProps> = ({ logos }) => {
  return (
    <LogoGridContainer>
      {logos.map((logo, index) => (
        <LogoItem key={index}>
          <img
            src={logo.src}
            alt={logo.alt}
          />
        </LogoItem>
      ))}
    </LogoGridContainer>
  )
}
