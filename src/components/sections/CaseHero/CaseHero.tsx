type CaseHeroMetric = {
  label: string;
  value: string;
};

export type CaseHeroData = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  leftMetrics: CaseHeroMetric[];
  rightMetrics: CaseHeroMetric[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type Props = {
  data: CaseHeroData;
};

const CaseHero = ({ data }: Props) => {
  return (
    <section>
      <h1>{data.title}</h1>
    </section>
  );
};

export default CaseHero;