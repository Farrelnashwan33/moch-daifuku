import { NextResponse } from 'next/server';
import pool, { ensureTableExists } from '@/lib/mysql';

export async function GET(request: Request) {
  try {
    await ensureTableExists();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (productId) {
      const [rows]: any = await pool.query(
        'SELECT rating FROM product_ratings WHERE product_id = ?',
        [productId]
      );
      return NextResponse.json({ success: true, data: rows });
    }

    const [rows]: any = await pool.query(
      'SELECT * FROM product_ratings ORDER BY created_at DESC LIMIT 50'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('MAMP MySQL GET error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Database connection error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureTableExists();

    const body = await request.json();
    const { productId, rating, reviewerName, comment } = body;

    if (!productId || !rating) {
      return NextResponse.json(
        { success: false, message: 'productId and rating are required' },
        { status: 400 }
      );
    }

    const name = reviewerName?.trim() || 'Pelanggan Jajan Yuk';
    const note = comment?.trim() || null;

    const [result]: any = await pool.query(
      'INSERT INTO product_ratings (product_id, rating, reviewer_name, comment) VALUES (?, ?, ?, ?)',
      [productId, rating, name, note]
    );

    return NextResponse.json({
      success: true,
      message: 'Penilaian berhasil disimpan ke database MAMP!',
      insertId: result.insertId,
    });
  } catch (error: any) {
    console.error('MAMP MySQL POST error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Gagal menyimpan ke database' },
      { status: 500 }
    );
  }
}
