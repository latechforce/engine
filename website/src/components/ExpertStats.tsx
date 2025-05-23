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

const StatCard = styled.div<{ bg: string }>`
  background: ${({ bg }) => bg};
  border-radius: 12px;
  padding: 1.3rem 1.5rem 1.1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StatNumber = styled.div`
  font-size: 2.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.2em;
`

const StatLabel = styled.div`
  font-size: 1.08rem;
  color: #333;
`

export const ExpertStats: React.FC = () => (
  <StatsContainer>
    <StatCard bg="#faebeb">
      <StatNumber>50+</StatNumber>
      <StatLabel>Clients servis avec succès</StatLabel>
    </StatCard>
    <StatCard bg="#eaf3f7">
      <StatNumber>200+</StatNumber>
      <StatLabel>Outils internes innovants développés</StatLabel>
    </StatCard>
    <StatCard bg="#eef6ef">
      <StatNumber>10 000+</StatNumber>
      <StatLabel>Heures de travail mensuel économisées</StatLabel>
    </StatCard>
  </StatsContainer>
)
