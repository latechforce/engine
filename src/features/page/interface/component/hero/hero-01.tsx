import { Badge } from '../../../../../shared/interface/ui/badge.ui'
import { Button } from '../../../../../shared/interface/ui/button.ui'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { TypographyH1, TypographyLead } from '../../../../../shared/interface/ui/typography.ui'

type Hero01Props = {
  title: string
  description: string
  badge?: string
  buttonText: string
  buttonLink: string
}

const Hero01 = ({ title, badge, description, buttonText, buttonLink }: Hero01Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <Badge variant="outline">{badge}</Badge>
        <TypographyH1 className="mt-4">{title}</TypographyH1>
        <TypographyLead className="mt-4">{description}</TypographyLead>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to={buttonLink}>
            <Button
              size="lg"
              className="rounded-full text-base"
            >
              {buttonText} <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero01
