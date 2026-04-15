import type { CmsStaticPage } from "@/lib/cms/types";

type Params = {
  apiBase: string;
  token: string;
};

export async function loadServicePackagesDraft({
  apiBase,
  token,
}: Params): Promise<CmsStaticPage> {
  const response = await fetch(
    `${apiBase}/admin/static-pages?page_type=service_packages`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load service_packages draft: ${response.status}`);
  }

  const pages: CmsStaticPage[] = await response.json();

  if (!pages.length) {
    throw new Error("service_packages draft not found");
  }

  return pages[0];
}

