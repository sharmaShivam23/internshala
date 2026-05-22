import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const response = await fetch('https://internshala.com/hiring/search', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from Internshala' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform the data into a clean array
    const internshipIds = data.internship_ids || [];
    const internshipsMeta = data.internships_meta || {};

    const internships = internshipIds
      .map((id) => internshipsMeta[id])
      .filter(Boolean)
      .map((item) => ({
        id: item.id,
        title: item.title,
        company_name: item.company_name,
        company_url: item.company_url,
        company_logo: item.company_logo,
        profile_name: item.profile_name,
        location_names: item.location_names || [],
        locations: item.locations || [],
        duration: item.duration,
        stipend: item.stipend,
        start_date: item.start_date,
        posted_by_label: item.posted_by_label,
        posted_by_label_type: item.posted_by_label_type,
        application_deadline: item.application_deadline,
        work_from_home: item.work_from_home,
        is_ppo: item.is_ppo,
        type: item.type,
        url: item.url,
        employer_name: item.employer_name,
        is_premium: item.is_premium,
        part_time: item.part_time,
        labels: item.labels,
        expiring_in: item.expiring_in,
      }));

    return NextResponse.json({ internships });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
