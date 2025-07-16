// Breadcrumb utility functions
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbs(pathname: string, siteName: string = "Infinity Metrics"): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with home
  breadcrumbs.push({
    name: siteName,
    url: "/"
  });

  // Split pathname into segments
  const segments = pathname.split('/').filter(segment => segment.length > 0);

  // Generate breadcrumbs based on path segments
  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Convert segment to readable name
    const name = segmentToName(segment);

    breadcrumbs.push({
      name,
      url: currentPath
    });
  }

  return breadcrumbs;
}

function segmentToName(segment: string): string {
  // Handle special cases
  const specialNames: Record<string, string> = {
    'docs': 'Documentation',
    'frameworks': 'Frameworks',
    'getting-started': 'Getting Started',
    'api-reference': 'API Reference',
    'custom-events': 'Custom Events',
    'subdomain-tracking': 'Subdomain Tracking',
    'revenue-tracking': 'Revenue Tracking',
    'sdk-reference': 'SDK Reference',
    'nextjs': 'Next.js',
    'wordpress': 'WordPress',
    'webflow': 'Webflow',
    'ghost': 'Ghost',
    'react': 'React',
    'vue': 'Vue',
    'privacy-policy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'gdpr': 'GDPR Compliance',
    'why-infinity-metrics': 'Why Infinity Metrics'
  };

  if (specialNames[segment]) {
    return specialNames[segment];
  }

  // Default: capitalize first letter and replace hyphens with spaces
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
} 
