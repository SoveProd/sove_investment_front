import type { CmsStaticPage } from "@/lib/cms/types";

type Params = {
  apiBase: string;
  token: string;
  pageId?: number;
};

export async function loadHomepageDraft({
  apiBase,
  token,
  pageId = 1,
}: Params): Promise<CmsStaticPage> {
  const response = await fetch(
    `${apiBase}/admin/static-pages?page_type=homepage`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load homepage: ${response.status}`);
  }

  const pages: CmsStaticPage[] = await response.json();

  if (!pages.length) {
    throw new Error("Homepage draft not found");
  }

  return pages.find((page) => page.id === pageId) || pages[0];
}
