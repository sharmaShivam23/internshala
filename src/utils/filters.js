export function filterInternships(internships, filters) {
  if (!internships || !internships.length) return [];

  return internships.filter((internship) => {
    // Search query filter (title + company)
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesTitle = internship.title?.toLowerCase().includes(query);
      const matchesCompany = internship.company_name?.toLowerCase().includes(query);
      const matchesProfile = internship.profile_name?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCompany && !matchesProfile) return false;
    }

    // Profile filter
    if (filters.profile && filters.profile.length > 0) {
      if (!filters.profile.includes(internship.profile_name)) return false;
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      const internshipLocations = internship.location_names || [];
      const hasMatchingLocation = internshipLocations.some((loc) =>
        filters.location.includes(loc)
      );
      // Also check work from home
      if (filters.location.includes('Work from Home') && internship.work_from_home) {
        // passes
      } else if (!hasMatchingLocation) {
        return false;
      }
    }

    // Duration filter
    if (filters.duration && filters.duration.length > 0) {
      const durationMatch = filters.duration.some((d) => {
        if (d === '5+ Months') {
          const num = parseInt(internship.duration);
          return !isNaN(num) && num >= 5;
        }
        return internship.duration?.toLowerCase().includes(d.toLowerCase());
      });
      if (!durationMatch) return false;
    }

    // Stipend filter
    if (filters.stipend && filters.stipend !== 'all') {
      const stipendValue = internship.stipend?.salaryValue1 || 0;
      switch (filters.stipend) {
        case '0-5000':
          if (stipendValue > 5000) return false;
          break;
        case '5000-10000':
          if (stipendValue < 5000 || stipendValue > 10000) return false;
          break;
        case '10000-20000':
          if (stipendValue < 10000 || stipendValue > 20000) return false;
          break;
        case '20000-50000':
          if (stipendValue < 20000 || stipendValue > 50000) return false;
          break;
        case '50000+':
          if (stipendValue < 50000) return false;
          break;
      }
    }

    // Work from home filter
    if (filters.workFromHome === true) {
      if (!internship.work_from_home) return false;
    }

    return true;
  });
}

export function extractFilterOptions(internships) {
  if (!internships || !internships.length) {
    return { profiles: [], locations: [], durations: [] };
  }

  const profilesSet = new Set();
  const locationsSet = new Set();
  const durationsSet = new Set();

  internships.forEach((internship) => {
    if (internship.profile_name) profilesSet.add(internship.profile_name);
    if (internship.location_names) {
      internship.location_names.forEach((loc) => locationsSet.add(loc));
    }
    if (internship.work_from_home) locationsSet.add('Work from Home');
    if (internship.duration) durationsSet.add(internship.duration);
  });

  return {
    profiles: [...profilesSet].sort(),
    locations: [...locationsSet].sort(),
    durations: [...durationsSet].sort(),
  };
}

// Predict required skills based on profile and title keywords
export function getRequiredSkills(internship) {
  const profile = (internship.profile_name || '').toLowerCase();
  const title = (internship.title || '').toLowerCase();
  const combined = `${profile} ${title}`;
  
  const skillsSet = new Set();

  // HEURISTIC MAPPING: Map common profile profiles/titles to standardized skill tags
  if (combined.includes('web dev') || combined.includes('website') || combined.includes('full stack')) {
    ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'REST APIs'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('frontend') || combined.includes('front end') || combined.includes('react')) {
    ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'UI/UX Design', 'Tailwind CSS'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('backend') || combined.includes('back end') || combined.includes('node')) {
    ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'REST APIs', 'Git', 'PostgreSQL'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('python') || combined.includes('django') || combined.includes('flask')) {
    ['Python', 'Django', 'Flask', 'SQL', 'Git', 'Data Structures'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('data science') || combined.includes('machine learning') || combined.includes('analytics') || combined.includes('ai') || combined.includes('deep learning')) {
    ['Python', 'Machine Learning', 'SQL', 'Data Analytics', 'Pandas', 'NumPy', 'Statistics'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('mobile') || combined.includes('android') || combined.includes('ios') || combined.includes('flutter') || combined.includes('react native')) {
    ['Flutter', 'React Native', 'Dart', 'Java', 'Kotlin', 'Swift', 'Mobile App Dev'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('ui/ux') || combined.includes('design') || combined.includes('graphic') || combined.includes('figma') || combined.includes('illustrator')) {
    ['Figma', 'UI/UX Design', 'Adobe Creative Suite', 'Wireframing', 'Prototyping', 'User Research'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('content') || combined.includes('writing') || combined.includes('blog') || combined.includes('copywrit')) {
    ['Content Writing', 'Copywriting', 'SEO', 'Creative Writing', 'Blogging', 'English Proficiency'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('digital market') || combined.includes('seo') || combined.includes('social media') || combined.includes('marketing')) {
    ['SEO', 'Digital Marketing', 'Social Media Marketing', 'Google Analytics', 'Content Writing', 'Canva'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('business dev') || combined.includes('sales') || combined.includes('client relationship')) {
    ['Sales', 'Business Development', 'Communication Skills', 'Negotiation', 'MS-Excel', 'English Proficiency'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('hr') || combined.includes('human resource') || combined.includes('recruitment')) {
    ['Recruiting', 'Communication Skills', 'HR Operations', 'MS-Excel', 'Talent Acquisition'].forEach(s => skillsSet.add(s));
  } else if (combined.includes('software') || combined.includes('developer') || combined.includes('java') || combined.includes('c++')) {
    ['Java', 'C++', 'Python', 'Data Structures', 'Algorithms', 'Git', 'Software Engineering'].forEach(s => skillsSet.add(s));
  } else {
    // Default fallback skills if profile is generic
    ['Communication Skills', 'Problem Solving', 'MS-Excel', 'Teamwork'].forEach(s => skillsSet.add(s));
  }

  // Also check if some key programming languages or tools are explicitly mentioned in the title
  const technologies = [
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'MongoDB', 'SQL', 'MySQL', 'PostgreSQL', 
    'Python', 'Java', 'C++', 'C#', 'PHP', 'Laravel', 'Flutter', 'Dart', 'Kotlin', 'Swift', 
    'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Figma', 'Adobe XD', 'Photoshop', 'SEO', 
    'Excel', 'Wordpress', 'AWS', 'Docker', 'Kubernetes', 'Git'
  ];
  
  technologies.forEach(tech => {
    if (title.includes(tech.toLowerCase())) {
      skillsSet.add(tech);
    }
  });

  return Array.from(skillsSet);
}

// Calculate match score details
export function calculateMatchScore(internship, userSkills = []) {
  const required = getRequiredSkills(internship);
  
  if (!required.length) {
    return { score: 100, matchingSkills: [], missingSkills: [] };
  }

  const normalizedUserSkills = userSkills.map(s => s.toLowerCase().trim());
  
  const matchingSkills = required.filter(reqSkill => 
    normalizedUserSkills.includes(reqSkill.toLowerCase().trim())
  );
  
  const missingSkills = required.filter(reqSkill => 
    !normalizedUserSkills.includes(reqSkill.toLowerCase().trim())
  );

  const score = Math.round((matchingSkills.length / required.length) * 100);

  return {
    score,
    matchingSkills,
    missingSkills,
    requiredSkills: required
  };
}

