// Titik Pusat Toko: Jatinangor (Area Kampus Unpad / ITB Jatinangor)
export const STORE_LOCATION = {
  name: 'Jatinangor, Sumedang',
  lat: -6.9318,
  lng: 107.7745,
};

export interface PopularArea {
  id: string;
  name: string;
  description: string;
  defaultDistanceKm: number;
}

export const POPULAR_JATINANGOR_AREAS: PopularArea[] = [
  {
    id: 'unpad-itb',
    name: 'Unpad / ITB / Hegarmanah',
    description: 'Area Kampus & Kost Sekitar',
    defaultDistanceKm: 1.5,
  },
  {
    id: 'cikeruh-sayang',
    name: 'Cikeruh / Sayang / Caringin',
    description: 'Radius Dekat Jatinangor',
    defaultDistanceKm: 2.5,
  },
  {
    id: 'cipacing-rancaekek',
    name: 'Cipacing / Rancaekek',
    description: 'Jalan Raya Bandung-Garut',
    defaultDistanceKm: 4.5,
  },
  {
    id: 'tanjungsari',
    name: 'Tanjungsari / Jatinangor Atas',
    description: 'Arah Sumedang',
    defaultDistanceKm: 6.5,
  },
  {
    id: 'cileunyi-cibiru',
    name: 'Cileunyi / Cibiru / Ujungberung',
    description: 'Arah Bandung Timur',
    defaultDistanceKm: 7.5,
  },
];

/**
 * Menghitung jarak bumi (Haversine formula) dalam Kilometer dengan penyesuaian rute jalan raya (~1.25x)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number = STORE_LOCATION.lat,
  lon2: number = STORE_LOCATION.lng
): number {
  const R = 6371; // Radius bumi dalam KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;

  // Faktor estimasi rute jalan (motor/mobil rata-rata 1.25x jarak lurus)
  const roadFactor = 1.25;
  const estimatedKm = straightDistance * roadFactor;

  // Minimal 0.5 km, bulatkan 1 desimal
  return Math.max(0.5, Math.round(estimatedKm * 10) / 10);
}

/**
 * Menghitung biaya ongkir berdasarkan metode dan jarak (KM)
 */
export function calculateShippingFee(
  method: 'pickup' | 'delivery' | 'instant',
  distanceKm: number
): number {
  if (method === 'pickup') {
    return 0;
  }

  const km = Math.max(0.5, distanceKm || 1);

  if (method === 'delivery') {
    // Kurir Toko / COD:
    // 0 - 2 km: Rp 5.000
    // 2.1 - 5 km: Rp 8.000
    // 5.1 - 8 km: Rp 12.000
    // > 8 km: Rp 12.000 + Rp 2.000 / km berikutnya
    if (km <= 2) {
      return 5000;
    } else if (km <= 5) {
      return 8000;
    } else if (km <= 8) {
      return 12000;
    } else {
      const extraKm = Math.ceil(km - 8);
      return 12000 + extraKm * 2000;
    }
  }

  if (method === 'instant') {
    // Ojol Instant (Gojek / Grab / Maxim):
    // 0 - 3 km pertama: Rp 10.000
    // Tiap km selanjutnya: + Rp 2.500 / km
    if (km <= 3) {
      return 10000;
    } else {
      const extraKm = Math.ceil(km - 3);
      return 10000 + extraKm * 2500;
    }
  }

  return 0;
}
