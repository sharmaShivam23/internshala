import { useState, useEffect, useRef } from 'react';

export function useInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/internships', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch internships (${res.status})`);
        }

        const data = await res.json();
        setInternships(data.internships || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  return { internships, loading, error };
}
