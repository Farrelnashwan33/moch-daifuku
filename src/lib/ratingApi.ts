/**
 * Helper untuk mengirim & mengambil ulasan/penilaian ke database lokal MAMP (MySQL) via Next.js API
 */

export interface RatingResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function submitProductRatingToDB(
  productId: string,
  rating: number,
  reviewerName?: string,
  comment?: string
): Promise<RatingResponse> {
  try {
    // Simpan juga ke localStorage sebagai cache lokal
    if (typeof window !== 'undefined') {
      const localKey = `jajan_yuk_rating_${productId}`;
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      existing.push({ rating, reviewerName, comment, date: new Date().toISOString() });
      localStorage.setItem(localKey, JSON.stringify(existing));
    }

    const res = await fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        rating,
        reviewerName,
        comment,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, message: errData.message || 'Gagal menyimpan penilaian' };
    }

    const data = await res.json();
    return { success: true, message: data.message };
  } catch (error: any) {
    console.warn('API error (saved locally):', error);
    // Tetap dianggap sukses di UI agar user experience tidak terputus
    return { success: true };
  }
}

export async function fetchProductRatingSummaryFromDB(
  productId: string,
  defaultRating: number,
  defaultCount: number
): Promise<{ average: number; count: number }> {
  try {
    const res = await fetch(`/api/ratings?productId=${encodeURIComponent(productId)}`);
    if (!res.ok) {
      return { average: defaultRating, count: defaultCount };
    }

    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      const totalStars = json.data.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0);
      const count = defaultCount + json.data.length;
      const combinedTotal = defaultRating * defaultCount + totalStars;
      const average = Math.round((combinedTotal / count) * 10) / 10;
      return { average, count };
    }

    return { average: defaultRating, count: defaultCount };
  } catch {
    return { average: defaultRating, count: defaultCount };
  }
}
