type UploadMediaParams = {
  apiBase: string;
  token: string;
  file: File;
  ownerType: string;
  ownerId: number;
};

export type UploadedMedia = {
  id: number;
  file_url: string;
  file_name?: string | null;
};

export async function uploadMedia({
  apiBase,
  token,
  file,
  ownerType,
  ownerId,
}: UploadMediaParams): Promise<UploadedMedia> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("owner_type", ownerType);
  formData.append("owner_id", String(ownerId));

  const response = await fetch(`${apiBase}/media/upload`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload media: ${response.status}`);
  }

  return (await response.json()) as UploadedMedia;
}
