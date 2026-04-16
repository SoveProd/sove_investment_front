type PatchBlockParams = {
  apiBase: string;
  blockId: number | null;
  token: string | null;
  patch: Record<string, unknown>;
  setSaving: (value: boolean) => void;
  setError: (value: string | null) => void;
  errorMessage?: string;
};

export async function patchBlock({
  apiBase,
  blockId,
  token,
  patch,
  setSaving,
  setError,
  errorMessage = "Failed to patch block",
}: PatchBlockParams) {
  if (!blockId || !token) return;

  try {
    setSaving(true);
    setError(null);

    const response = await fetch(`${apiBase}/blocks/${blockId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patch),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(
        `${errorMessage}: ${response.status}${details ? ` — ${details}` : ""}`,
      );
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : errorMessage);
  } finally {
    setSaving(false);
  }
}

type PatchBlockWithFallbackParams = {
  apiBase: string;
  blockId: number | null;
  token: string | null;
  patches: Record<string, unknown>[];
  setSaving: (value: boolean) => void;
  setError: (value: string | null) => void;
  errorMessage?: string;
};

export async function patchBlockWithFallback({
  apiBase,
  blockId,
  token,
  patches,
  setSaving,
  setError,
  errorMessage = "Failed to patch block",
}: PatchBlockWithFallbackParams) {
  if (!blockId || !token) return false;

  let lastError: Error | null = null;

  try {
    setSaving(true);
    setError(null);

    for (const patch of patches) {
      const response = await fetch(`${apiBase}/blocks/${blockId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patch),
      });

      if (response.ok) {
        return true;
      }

      const details = await response.text().catch(() => "");
      lastError = new Error(
        `${errorMessage}: ${response.status}${details ? ` — ${details}` : ""}`,
      );
    }

    throw lastError ?? new Error(errorMessage);
  } catch (err) {
    setError(err instanceof Error ? err.message : errorMessage);
    return false;
  } finally {
    setSaving(false);
  }
}
