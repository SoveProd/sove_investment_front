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
      throw new Error(`${errorMessage}: ${response.status}`);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : errorMessage);
  } finally {
    setSaving(false);
  }
}
