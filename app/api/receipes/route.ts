
import { NextRequest, NextResponse } from 'next/server';

// In production, use a proper database
let recipes: any[] = [];

export async function GET() {
  return NextResponse.json({ recipes });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
 
  const newRecipe = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  recipes.unshift(newRecipe);

  return NextResponse.json({ success: true, recipe: newRecipe });
} 
