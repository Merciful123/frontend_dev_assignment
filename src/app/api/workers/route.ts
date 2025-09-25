import { NextResponse } from 'next/server';
import workersData from '../../../../workers.json';

export async function GET() {

  try {
  
    // Simulate API delay for demonstration
  
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      data: workersData,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch workers data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}