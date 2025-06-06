import React from 'react'
import styled from '@emotion/styled'

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 260px;
  flex: 1 1 260px;
  max-width: 340px;
`

const StatCard = styled.div<{ variant: 'pink' | 'blue' | 'green' }>`
  background: ${({ variant }) => `var(--stat-card-bg-${variant})`};
  border-radius: 12px;
  padding: 1.3rem 1.5rem 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: background-color 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: var(--stat-card-bg-dark);
    border: 1px solid var(--ifm-color-emphasis-200);
  }
`

const StatNumber = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--ifm-color-emphasis-900);
  margin-bottom: 0.2em;
`

const StatLabel = styled.div`
  font-size: 1.08rem;
  color: var(--ifm-color-emphasis-700);
`

// Add CSS variables for card backgrounds
const style = `
  :root {
    --stat-card-bg-pink: #faebeb;
    --stat-card-bg-blue: #eaf3f7;
    --stat-card-bg-green: #eef6ef;
    --stat-card-bg-dark: #232323;
  }
  [data-theme='dark'] {
    --stat-card-bg-pink: var(--stat-card-bg-dark);
    --stat-card-bg-blue: var(--stat-card-bg-dark);
    --stat-card-bg-green: var(--stat-card-bg-dark);
  }
`

export const ExpertStats: React.FC = () => (
  <>
    <style>{style}</style>
    <StatsContainer>
      <StatCard variant="pink">
        <StatNumber>50+</StatNumber>
        <StatLabel>Clients servis avec succès</StatLabel>
      </StatCard>
      <StatCard variant="blue">
        <StatNumber>200+</StatNumber>
        <StatLabel>Outils internes innovants développés</StatLabel>
      </StatCard>
      <StatCard variant="green">
        <StatNumber>10 000+</StatNumber>
        <StatLabel>Heures de travail mensuel économisées</StatLabel>
      </StatCard>
    </StatsContainer>
  </>
)
