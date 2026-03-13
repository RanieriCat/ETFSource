interface KpiCardProps {
  label: string;
  value: string;
}

export const KpiCard = ({ label, value }: KpiCardProps) => (
  <article className="kpi-card">
    <p>{label}</p>
    <strong>{value}</strong>
  </article>
);
