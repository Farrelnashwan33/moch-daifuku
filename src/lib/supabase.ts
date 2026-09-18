import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase Client instance (safe even if env vars are pending)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface RatingData {
  id?: string;
  product_id: string;
  rating: number;
  reviewer_name?: string;
  comment?: string;
  created_at?: string;
}

/**
 * Menyimpan penilaian bintang ke tabel `product_ratings` di Supabase
 */
export async function submitProductRating(
  productId: string,
  rating: number,
  reviewerName?: string,
  comment?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Simpan juga ke localStorage sebagai cache lokal
    if (typeof window !== 'undefined') {
      const localKey = `jajan_yuk_rating_${productId}`;
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      existing.push({ rating, reviewerName, comment, date: new Date().toISOString() });
      localStorage.setItem(localKey, JSON.stringify(existing));
    }

    if (!supabase) {
      console.warn('Supabase belum terhubung (NEXT_PUBLIC_SUPABASE_URL belum diset). Penilaian disimpan secara lokal.');
      return { success: true };
    }

    const { error } = await supabase.from('product_ratings').insert([
      {
        product_id: productId,
        rating,
        reviewer_name: reviewerName?.trim() || 'Pelanggan Jajan Yuk',
        comment: comment?.trim() || null,
      },
    ]);

    if (error) {
      console.error('Supabase Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to submit rating:', err);
    return { success: false, error: err?.message || 'Gagal menyimpan penilaian' };
  }
}

/**
 * Mengambil ringkasan penilaian rata-rata dan total ulasan dari Supabase
 */
export async function fetchProductRatingSummary(
  productId: string,
  defaultRating: number,
  defaultCount: number
): Promise<{ average: number; count: number }> {
  if (!supabase) {
    return { average: defaultRating, count: defaultCount };
  }

  try {
    const { data, error } = await supabase
      .from('product_ratings')
      .select('rating')
      .eq('product_id', productId);

    if (error || !data || data.length === 0) {
      return { average: defaultRating, count: defaultCount };
    }

    const totalStars = data.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    const count = defaultCount + data.length;
    const combinedTotal = defaultRating * defaultCount + totalStars;
    const average = Math.round((combinedTotal / count) * 10) / 10;

    return { average, count };
  } catch {
    return { average: defaultRating, count: defaultCount };
  }
}
