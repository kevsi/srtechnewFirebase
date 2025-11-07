export const events = [
  {
    id: '1',
    title: 'Conférence Sécurité Réseau',
    date: '2025-03-21',
    location: 'Paris, FR',
    desc: "Une journée dédiée aux bonnes pratiques et aux dernières avancées en sécurité des réseaux.",
  },
  {
    id: '2',
    title: "Atelier Ubiquiti & MikroTik",
    date: '2025-05-08',
    location: 'Lyon, FR',
    desc: "Atelier pratique sur le déploiement et l'optimisation d'infrastructures sans fil et routage.",
  },
  {
    id: '3',
    title: 'Salon IT & Stockage',
    date: '2025-09-12',
    location: 'Marseille, FR',
    desc: "Rencontrez des experts Dell, NetApp et EMC pour découvrir les dernières solutions de stockage.",
  },
];

export function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}
