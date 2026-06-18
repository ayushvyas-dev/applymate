interface MyEmailVerifierResponse {
  Address: string;
  Status: 'Valid' | 'Invalid' | 'Unknown' | 'Risky';
  Disposable_Domain: 'true' | 'false';
  Role_Based: 'true' | 'false';
  Free_Domain: 'true' | 'false';
  catch_all: 'true' | 'false';
  Greylisted: 'true' | 'false';
  Diagnosis: string;
}

export interface EmailValidationResult {
  valid: boolean;
  reason?: string;
}

export async function validateEmail(
  email: string,
): Promise<EmailValidationResult> {
  // Basic format check first — saves an API credit on obvious bad input
  const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!formatRegex.test(email)) {
    return { valid: false, reason: 'Invalid email format.' };
  }

  const apiKey = process.env.MYEMAILVERIFIER_API_KEY;
  if (!apiKey) {
    throw new Error(
      'MYEMAILVERIFIER_API_KEY is not set in environment variables.',
    );
  }

  let data: MyEmailVerifierResponse;

  try {
    const url = `https://client.myemailverifier.com/verifier/validate_single/${encodeURIComponent(email)}/${apiKey}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });

    if (!res.ok) throw new Error(`API responded with status ${res.status}`);

    data = await res.json();
  } catch (err) {
    // API is down — fail open so users aren't blocked by a third-party outage
    // Change to: return { valid: false, reason: '...' } if you prefer fail closed
    console.error('MyEmailVerifier API error:', err);
    return { valid: true };
  }

  if (data.Disposable_Domain === 'true') {
    return {
      valid: false,
      reason: 'Temporary or disposable email addresses are not allowed.',
    };
  }

  if (data.Status === 'Invalid') {
    return {
      valid: false,
      reason: `This email address appears to be invalid: ${data.Diagnosis}.`,
    };
  }

  if (data.Role_Based === 'true') {
    return {
      valid: false,
      reason:
        'Role-based addresses (admin@, info@, etc.) are not accepted. Please use a personal email.',
    };
  }

  if (data.catch_all === 'true') {
    return {
      valid: false,
      reason:
        'We could not confirm this email address exists. Please use a different email.',
    };
  }

  return { valid: true };
}
